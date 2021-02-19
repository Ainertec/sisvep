// /-------------------------------------------------tela principal funcionario ------------------------------------------------------

// vetor responsavel por guardar os funcionarios selecionados
let VETORDEFUNCIONARIOCLASSEFUNCIONARIO = []

// funcao responsavel pela autenticacao no setor de funcionario
function autenticacaoFuncionarioFacede() {
  const situacao = autenticacaoLogin()

  if (JSON.parse(situacao).tipo == 'Administrador') {
    document.getElementById('janela2').innerHTML = telaFuncionario()
    document.getElementById(
      'dadosFuncionario'
    ).innerHTML = carregarTelaDadosFuncionario('Admin', 'Cadastrar')
  } else if (JSON.parse(situacao).tipo == 'Comum') {
    document.getElementById('janela2').innerHTML = carregarTelaDadosFuncionario(
      'Comum',
      'Atualizar'
    )
    buscarFuncionario('Comum')
  } else {
    mensagemDeErro('Usuário não autorizado!')
  }
}

// funcao responsavel por gerar a tela inicial do funcionario
function telaFuncionario() {
  let codigoHTML = ''

  codigoHTML += '<h3 class="text-center">Funcionário(Administrador)</h3>'

  codigoHTML +=
    '<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
  codigoHTML += '<h5 class="text-center">Buscar Funcionário</h5>'
  codigoHTML += '<div class="input-group mb-3">'
  codigoHTML +=
    '<input id="buscaFuncionarioByName" type="text" class="form-control mousetrap" placeholder="Nome">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="btn-group btn-lg btn-block" role="group">'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#buscaFuncionarioByName\'])){buscarFuncionario(\'Administrador\',\'nome\'); animacaoSlideUp([\'#listaFuncionarios\'])}else{mensagemDeErro(\'Preencha o campo nome!\'); mostrarCamposIncorreto([\'buscaFuncionarioByName\'])}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
  codigoHTML +=
    '<button onclick="buscarFuncionario(\'Administrador\',\'todos\'); animacaoSlideUp([\'#listaFuncionarios\'])" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'

  codigoHTML +=
    '<div id="localDaLista" hidden class="col-8 rounded mx-auto layer1" style="position: relative; height: 300px; z-index: 1; overflow: scroll; margin-top:20px;">'
  codigoHTML += '<div id="listaFuncionarios">'
  codigoHTML += '</div>'
  codigoHTML += '</div>'

  codigoHTML += '<div id="dadosFuncionario"></div>'

  return codigoHTML
}

// funcao reponsavel por gerar a tela com os dados do funcionario
function carregarTelaDadosFuncionario(tipo, tipo2) {
  let codigoHTML = ''

  codigoHTML += '<h5 class="text-center">Dados Funcionário</h5>'

  codigoHTML +=
    '<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
  codigoHTML += '<form>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="id">ID:</label>'
  codigoHTML +=
    '<input type="text" class="form-control mousetrap" id="id" placeholder="ID" disabled>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="login">Login:</label>'
  codigoHTML +=
    '<input type="text" class="form-control mousetrap" id="login" placeholder="Login">'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="senha">Senha:</label>'
  codigoHTML +=
    '<input type="password" class="form-control mousetrap" id="senha" placeholder="Senha">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="question">Pergunta recuperação de senha:</label>'
  codigoHTML += '<select class="custom-select mr-sm-6" id="question">'
  codigoHTML +=
    '<option value="Qual o modelo do seu primeiro carro?">Qual o modelo do seu primeiro carro?</option>'
  codigoHTML +=
    '<option value="Qual o nome do seu melhor amigo de infância?">Qual o nome do seu melhor amigo de infância?</option>'
  codigoHTML +=
    '<option value="Qual o nome do seu primeiro animal de estimação?">Qual o nome do seu primeiro animal de estimação?</option>'
  codigoHTML +=
    '<option value="Qual o nome da sua mãe?">Qual o nome da sua mãe?</option>'
  codigoHTML +=
    '<option value="Qual sua cor preferida?">Qual sua cor preferida?</option>'
  codigoHTML += '</select>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="senha">Resposta pergunta:</label>'
  codigoHTML +=
    '<input type="text" class="form-control mousetrap" id="response" placeholder="Resposta">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="tipoFun">Tipo de funcionário:</label>'
  if (tipo == 'Comum') {
    codigoHTML += '<select class="custom-select mr-sm-6" id="tipoFun" disabled>'
  } else if (tipo == 'Admin') {
    codigoHTML += '<select class="custom-select mr-sm-6" id="tipoFun">'
  }
  codigoHTML += '<option value=false>Comum</option>'
  codigoHTML += '<option value=true>Administrador</option>'
  codigoHTML += '</select>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  if (tipo2 == 'Cadastrar') {
    codigoHTML +=
      '<button onclick="ativaDesativaBotao([\'botaocadastrarfuncionario\'],500); cadastrarFuncionario();" id="botaocadastrarfuncionario" type="button" class="btn btn-primary" style="margin: 5px;"><span class="fas fa-save"></span> Cadastrar</button>'
  } else {
    codigoHTML +=
      '<button onclick="confirmarAcao(\'Atualizar os dados do funcionário!\',\'atualizarFuncionario();\')" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Atualizar</button>'
    if (tipo == 'Admin') {
      codigoHTML +=
        '<button onclick="confirmarAcao(\'Excluir os dados do funcionário permanentemente!\',\'excluirFuncionario();\')" type="button" class="btn btn-outline-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
    }
  }
  codigoHTML += '</div>'
  codigoHTML += '</form>'
  codigoHTML += '</div>'

  return codigoHTML
}

// funcao responsavel por carregar lista com os funcionarios pesquisados
function carregarListaFuncionario(json, posicao) {
  let codigoHTML = ''

  codigoHTML += `<a onclick="carregarDadosFuncionario(${posicao},'Administrador');" href="#" class="list-group-item list-group-item-action list-group-item-dark">`
  codigoHTML += '<div class="d-flex w-100 justify-content-between">'
  codigoHTML += `<h5 class="mb-1">Nome: ${corrigirTamanhoString(
    28,
    json.name
  )}</h5>`
  if (json.admin) {
    codigoHTML += '<small>Tipo: Administrador</small>'
  } else {
    codigoHTML += '<small>Tipo: Comum</small>'
  }

  codigoHTML += '</div>'
  codigoHTML += '</a>'

  return codigoHTML
}

// funcao responsavel por carregar os dados do funcionario selecionado
function carregarDadosFuncionario(posicao, tipo) {
  if (tipo == 'Administrador') {
    document.getElementById(
      'dadosFuncionario'
    ).innerHTML = carregarTelaDadosFuncionario('Admin', 'Atualizar')
  }

  setTimeout(function () {
    document.getElementById('id').value =
      VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao]._id
    document.getElementById('login').value =
      VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].name
    document.getElementById('question').value =
      VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].question
    document.getElementById('tipoFun').value =
      VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].admin
    if (tipo == 'Administrador') {
      mensagemDeAviso('Pronto para atualizar ou excluir!')
    } else {
      mensagemDeAviso('Pronto para atualizar!')
    }
  }, 300)
}

// funcao responsavel por buscar os funcionarios
async function buscarFuncionario(tipo, busca) {
  VETORDEFUNCIONARIOCLASSEFUNCIONARIO = []

  if (tipo == 'Administrador') {
    let cont = 0

    if (busca == 'nome') {
      var json = await requisicaoGET(
        `users_by_name?name=${
        document.getElementById('buscaFuncionarioByName').value
        }`,
        { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
      )
    } else if (busca == 'todos') {
      var json = await requisicaoGET('users', {
        headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
      })
    }

    document.getElementById('localDaLista').hidden = false
    document.getElementById('listaFuncionarios').innerHTML =
      '<h5 class="text-center">Lista Funcionários</h5>'

    while (json.data[cont]) {
      VETORDEFUNCIONARIOCLASSEFUNCIONARIO.push(json.data[cont])
      $('#listaFuncionarios').append(
        carregarListaFuncionario(json.data[cont], cont)
      )
      cont++
    }
    animacaoSlideDown(['#listaFuncionarios'])
  } else if (tipo == 'Comum') {
    const user = JSON.parse(sessionStorage.getItem('login'))
    var json = `{"_id":"${user._id}","name":"${user.nome}","question":"${user.question}","admin":false}`

    json = JSON.parse(json)

    VETORDEFUNCIONARIOCLASSEFUNCIONARIO.push(json)
    carregarDadosFuncionario(0, tipo)
  }
}

// funcao responsavel por cadastrar funcionario
async function cadastrarFuncionario() {
  if (validaDadosCampo(['#login', '#senha', '#response'])) {
    let json = `{"name":"${$('#login').val()}",`
    json += `"password":"${$('#senha').val()}",`
    json += `"question":"${$('#question').val()}",`
    json += `"response":"${$('#response').val()}",`
    json += `"admin":${$('#tipoFun').val()}}`

    try {
      await requisicaoPOST('users', JSON.parse(json), {
        headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
      })
      mensagemDeAviso('Cadastrado com sucesso!')
      autenticacaoFuncionarioFacede()
    } catch (error) {
      mensagemDeErro(`Não foi possível efetuar o cadastro! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Preencha todos os campos!')
    mostrarCamposIncorreto(['login', 'senha', 'response'])
  }
}

// funcao responsavel por atualizar funcionario
async function atualizarFuncionario() {
  if (validaDadosCampo(['#id', '#response'])) {
    let json = '{'

    VETORDEFUNCIONARIOCLASSEFUNCIONARIO.forEach(function (item) {
      if (item._id == document.getElementById('id').value) {
        if (item.name != $('#login').val()) {
          json += `"name":"${$('#login').val()}",`
        }
      }
    })

    if (validaDadosCampo(['#senha'])) {
      json += `"password":"${$('#senha').val()}",`
    }
    json += `"question":"${$('#question').val()}",`
    json += `"response":"${$('#response').val()}",`
    json += `"admin":${$('#tipoFun').val()}}`

    try {
      await requisicaoPUT(
        `users?id=${document.getElementById('id').value}`,
        JSON.parse(json),
        { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
      )
      mensagemDeAviso('Atualizado com sucesso!')
      autenticacaoFuncionarioFacede()
    } catch (error) {
      mensagemDeErro(`Não foi possível atualizar! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Preencha todos os campos!')
    mostrarCamposIncorreto(['response', 'login', 'senha'])
  }
}

// funcao responsavel por excluir o funcionario
async function excluirFuncionario() {
  if (validaDadosCampo(['#id'])) {
    try {
      await requisicaoDELETE(`users/${$('#id').val()}`, '', {
        headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
      })
      mensagemDeAviso('Excluido com sucesso!')
      autenticacaoFuncionarioFacede()
    } catch (error) {
      mensagemDeErro(`Não foi possível excluir! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Não foi possível excluir, falta de ID!')
  }
}
