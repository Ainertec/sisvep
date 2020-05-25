// ------------------------------------------- tela principal login -------------------------------------------------------

// tela de login
function telaAutenticacao() {
  let codigoHTML

  codigoHTML = '<h3 class="text-center">Acesso</h3>'
  codigoHTML += '<form class="text-center" style="margin-top:30px;">'
  codigoHTML += '<h1><span class="fas fa-user-circle"></span></h1>'
  codigoHTML += '<div class="form-row col-4 rounded mx-auto d-block">'
  codigoHTML +=
    '<input id="login" type="text" class="form-control mb-2 mousetrap" placeholder="Login">'
  codigoHTML += '<div class="input-group mb-3">'
  codigoHTML +=
    '<input id="senha" type="password" class="form-control mousetrap" placeholder="Senha" aria-describedby="senhabutton">'
  codigoHTML += '<div class="input-group-append">'
  codigoHTML += '<button class="btn btn-outline-secondary btn-sm" type="button" id="senhabutton" onmouseover="document.getElementById(\'senha\').type=\'text\'" onmouseout="document.getElementById(\'senha\').type=\'password\'"><span class="fas fa-eye"></span></button>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#login\', \'#senha\'])){efetuarLogin();}else{mensagemDeErro(\'Preencha todos os campos!\'); mostrarCamposIncorreto([\'login\',\'senha\']);}" type="button" class="btn btn-primary border border-dark col-md-4">'
  codigoHTML += '<span class="fas fa-key"></span> Acessar'
  codigoHTML += '</button>'
  codigoHTML +=
    '<a href="#" onclick="if(validaDadosCampo([\'#login\'])){telaRecuperacaoSenha(); animacaoSlideUp([\'#areaRecuperarSenha\'])}else{mensagemDeErro(\'Digite o nome de usuario!\'); mostrarCamposIncorreto([\'login\']);}" style="margin-left:20px;" class="col-md-3">Esqueceu a senha?</a>'
  codigoHTML += '</div>'
  codigoHTML += '</form>'
  codigoHTML += '<div id="areaRecuperarSenha">'
  codigoHTML += '<div>'

  document.getElementById('janela2').innerHTML = codigoHTML

  atalhosTeclaLogin()
}

// funcao responsavel por gerar a tela de recuperacao de senha
async function telaRecuperacaoSenha() {
  let codigoHTML = ''
  try {
    const questao = await requisicaoGET(
      `forgot?name=${document.getElementById('login').value}`,
      null
    )

    codigoHTML =
      '<h3 class="text-center" style="margin-top:30px;">Recuperar conta</h3>'
    codigoHTML += '<div class="text-center" style="margin-top:10px;">'
    codigoHTML += '<div class="form-row col-4 rounded mx-auto d-block">'
    codigoHTML += `<label for="pergunta">Responda a pergunta de segurança: ${questao.data.question}</label>`
    codigoHTML +=
      '<input id="pergunta" type="text" class="form-control mb-2 mousetrap" placeholder="Resposta">'
    codigoHTML += '<div class="input-group mb-3">'
    codigoHTML +=
      '<input id="novaSenha" type="password" class="form-control mousetrap" placeholder="Digite uma nova senha" aria-describedby="recuperarsenhabutton">'
    codigoHTML += '<div class="input-group-append">'
    codigoHTML += '<button class="btn btn-outline-secondary btn-sm" type="button" id="recuperarsenhabutton" onmouseover="document.getElementById(\'novaSenha\').type=\'text\'" onmouseout="document.getElementById(\'novaSenha\').type=\'password\'"><span class="fas fa-eye"></span></button>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML +=
      '<button onclick="if(validaDadosCampo([\'#pergunta\',\'#novaSenha\'])){confirmarAcao(\'Recuperar senha desta conta!\',\'recuperarSenha();\'); animacaoSlideUp([\'#areaRecuperarSenha\'])}else{mensagemDeErro(\'Preencha os campos resposta e nova senha!\'); mostrarCamposIncorreto([\'pergunta\',\'novaSenha\']);}" type="button" class="btn btn-success border border-dark col-md-4">'
    codigoHTML += '<span class="fas fa-user-lock"></span> Recuperar'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    document.getElementById('areaRecuperarSenha').innerHTML = codigoHTML
    animacaoSlideDown(['#areaRecuperarSenha']);
  } catch (error) {
    mensagemDeErro('Usuário não existente!')
  }
}

// funcao responsavel por recuperar a senha
async function recuperarSenha() {
  if (validaDadosCampo(['#login', '#pergunta', '#novaSenha'])) {
    const result = await requisicaoPOST(
      'forgot',
      JSON.parse(
        `{"name":"${document.getElementById('login').value}","response":"${
        document.getElementById('pergunta').value
        }","password":"${document.getElementById('novaSenha').value}"}`
      ),
      null
    )
    if (result) {
      mensagemDeAviso('Atualizado com sucesso!')
    }
  } else {
    mensagemDeErro('Preencha todos os dados!')
  }
}

// funcao para fazer logout
function logout() {
  if (sessionStorage.getItem('login')) {
    sessionStorage.removeItem('login')
    mensagemDeAviso('Logout com sucesso!')
  }
}

// funcao responsavel por efetuar login
async function efetuarLogin() {
  logout()

  setTimeout(async function () {
    const json = await requisicaoPOST(
      'sessions',
      JSON.parse(
        `{"name":"${document.getElementById('login').value}","password":"${
        document.getElementById('senha').value
        }"}`
      ),
      null
    )

    if (!json) {
      mensagemDeErro('Login/senha incorretos ou usuario inexistente!')
      telaAutenticacao()
    } else if (json.data.user._id) {
      if (json.data.user.admin) {
        sessionStorage.setItem(
          'login',
          JSON.stringify({
            _id: json.data.user._id.toString(),
            nome: json.data.user.name.toString(),
            tipo: 'Administrador',
            token: json.data.token.toString(),
            question: json.data.user.question.toString(),
          })
        )
      } else {
        sessionStorage.setItem(
          'login',
          JSON.stringify({
            _id: json.data.user._id.toString(),
            nome: json.data.user.name.toString(),
            tipo: 'Comum',
            token: json.data.token.toString(),
            question: json.data.user.question.toString(),
          })
        )
      }
      mensagemDeAviso('Usuário autenticado!')
      setTimeout(function () {
        window.location.href = 'home.html'
      }, 1000)
    }
  }, 1000)
}

// funcao para autenticacao e liberacao de sessao
function autenticacaoLogin() {
  if (sessionStorage.getItem('login') == null) {
    mensagemDeErro('Usuário não autenticado!')
    return telaAutenticacao()
  }
  return sessionStorage.getItem('login')
}

// status inicial de login
$(document).ready(function () {
  if (sessionStorage.getItem('login')) {
    const nome = JSON.parse(sessionStorage.getItem('login')).nome.toString()
    document.getElementById(
      'statusLogin'
    ).innerHTML = `<a onclick="logout(); setTimeout(function(){window.location.href='home.html';},1000);" class="nav-link text-light" href="#"><span class="fas fa-user-slash iconsTam"></span> Sair (${corrigirTamanhoString(
      7,
      nome
    )})</a>`
  } else {
    document.getElementById('statusLogin').innerHTML =
      '<a onclick="telaAutenticacao();" class="nav-link text-light" href="#"><span class="fas fa-user-shield iconsTam"></span> Entrar</a>'
  }
})
