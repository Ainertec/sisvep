// /---------------------------------------------------tela loja--------------------------------------------------------------------------

// funcao responsavel pela autenticacao de usuario no setor loja
function autenticacaoLoja() {
  const situacao = autenticacaoLogin()

  if (JSON.parse(situacao).tipo == 'Administrador') {
    verificarCadastroLoja()
  } else {
    mensagemDeErro('Usuário não autorizado!')
  }
}

// funcao responsavel por criar a tela da loja
function telaLoja(tipo) {
  let codigoHTML = ''

  if (tipo == 'Atualizar') {
    codigoHTML += '<h3 class="text-center">Atualizar Loja</h3>'
  } else if (tipo == 'Cadastrar') {
    codigoHTML += '<h3 class="text-center">Cadastrar Loja</h3>'
  }

  codigoHTML +=
    '<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
  codigoHTML += '<form>'
  codigoHTML += '<div class="form-row">'

  if (tipo == 'Atualizar') {
    codigoHTML += '<div class="form-group col-md-6">'
    codigoHTML += '<label for="id">ID:</label>'
    codigoHTML +=
      '<input type="text" class="form-control mousetrap" id="id" placeholder="ID" disabled>'
    codigoHTML += '</div>'
  }

  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="nome">Nome:</label>'
  codigoHTML +=
    '<input type="Text" class="form-control mousetrap" id="nome" placeholder="Nome">'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="cpfCnpj">CPF/CNPJ:</label>'
  codigoHTML +=
    '<input type="text" class="form-control mousetrap" id="cpfCnpj" placeholder="CPF ou CNPJ">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="telefone">Telefone:</label>'
  codigoHTML +=
    '<input type="Text" class="form-control mousetrap" id="telefone" placeholder="Telefone">'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="email">E-mail:</label>'
  codigoHTML +=
    '<input type="email" class="form-control mousetrap" id="email" placeholder="Email" value="Inexistente">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="endereco">Endereço:</label>'
  codigoHTML +=
    '<textArea type="Text" class="form-control" id="endereco" placeholder="Endereço">'
  codigoHTML += '</textArea>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'

  if (tipo == 'Atualizar') {
    codigoHTML +=
      '<button onclick="confirmarAcao(\'Atualizar dados loja!\',\'atualizarLoja();\')" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Salvar</button>'
  } else if (tipo == 'Cadastrar') {
    codigoHTML +=
      '<button onclick="cadastrarLoja();" type="button" class="btn btn-primary" style="margin: 5px;"><span class="fas fa-save"></span> Salvar</button>'
  }
  codigoHTML += '</div>'
  codigoHTML += '</form>'
  codigoHTML += '</div>'

  return codigoHTML
}

// funcao responsavel por verificar se existe algum caddastro de loja
async function verificarCadastroLoja() {
  const json = await requisicaoGET('shops', {
    headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
  })

  if (json.data != null) {
    document.getElementById('janela2').innerHTML = telaLoja('Atualizar')
    setTimeout(function () {
      carregarDadosLoja(json)
    }, 300)
  } else {
    document.getElementById('janela2').innerHTML = telaLoja('Cadastrar')
  }
}

// funcao responsavel por carregar os dados da loja cadastrada
function carregarDadosLoja(json) {
  document.getElementById('id').value = json.data._id
  document.getElementById('nome').value = json.data.name
  document.getElementById('cpfCnpj').value = json.data.identification
  document.getElementById('telefone').value = json.data.phone
  document.getElementById('email').value = json.data.email
  document.getElementById('endereco').value = json.data.address
}

// funcao responsavel por atualizar os dados da loja
async function atualizarLoja() {
  if (
    validaDadosCampo([
      '#id',
      '#nome',
      '#cpfCnpj',
      '#telefone',
      '#email',
      '#endereco',
    ])
  ) {
    let json = `{"name":"${$('#nome').val()}",`
    json += `"identification":"${$('#cpfCnpj').val()}",`
    json += `"phone":"${$('#telefone').val()}",`
    json += `"email":"${$('#email').val()}",`
    json += `"address":"${$('#endereco').val()}"}`

    try {
      await requisicaoPUT(`shops?id=${$('#id').val()}`, JSON.parse(json), {
        headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
      })
      mensagemDeAviso('Atualizado com sucesso!')
    } catch (error) {
      mensagemDeErro(`Não foi possível atualizar! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Preencha todos os dados!')
    mostrarCamposIncorreto([
      'nome',
      'cpfCnpj',
      'telefone',
      'email',
      'endereco',
    ])
  }
}

// funcao responsavel por cadastrar os dados da loja
async function cadastrarLoja() {
  if (
    validaDadosCampo(['#nome', '#cpfCnpj', '#telefone', '#email', '#endereco'])
  ) {
    let json = `{"name":"${$('#nome').val()}",`
    json += `"identification":"${$('#cpfCnpj').val()}",`
    json += `"phone":"${$('#telefone').val()}",`
    json += `"email":"${$('#email').val()}",`
    json += `"address":"${$('#endereco').val()}"}`

    try {
      await requisicaoPOST('shops', JSON.parse(json), {
        headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
      })
      mensagemDeAviso('Cadastrado com sucesso!')
    } catch (error) {
      mensagemDeErro(`Não foi possível cadastrar! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Preencha todos os dados!')
    mostrarCamposIncorreto(['nome', 'cpfCnpj', 'telefone', 'email', 'endereco'])
  }
}
