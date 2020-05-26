// /-----------------------------------------------------tela principal de produto----------------------------------------------------------

// vetor responsavel por guardar os dados dos produtos em tempo de execução
let JSONPRODUTOCLASSEPRODUTO = []

// funcao responsavel pela autenticacao de usuario no setor produto
function autenticacaoProduto(tipo) {
  const situacao = autenticacaoLogin()

  if (
    JSON.parse(situacao).tipo == 'Administrador' ||
    JSON.parse(situacao).tipo == 'Comum'
  ) {
    if (tipo == 'Cadastrar') {
      document.getElementById('janela2').innerHTML = telaProduto(tipo)
      carregarListaDeFornecedoresEmProduto()
    } else if (tipo == 'Atualizar') {
      document.getElementById('janela2').innerHTML = telaBuscarProduto()
    }
  } else {
    mensagemDeErro('Usuário não autorizado!')
  }
}

// funcao reponsavel por gerar a tela de produto
function telaProduto(tipo) {
  let codigoHTML = ''

  codigoHTML += '<h5 class="text-center">Dados Produto</h5>'

  if (tipo == 'Atualizar') {
    codigoHTML += '<h3 class="text-center">Atualizar Produto</h3>'
  } else if (tipo == 'Cadastrar') {
    codigoHTML += '<h3 class="text-center">Cadastrar Produto</h3>'
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
  codigoHTML += '<label for="barcode">Código de barras:</label>'
  codigoHTML +=
    '<input type="Number" class="form-control mousetrap" id="barcode" placeholder="Código de barras">'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="nome">Nome:</label>'
  codigoHTML +=
    '<input type="text" class="form-control mousetrap" id="nome" placeholder="Nome do produto">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="valorUni">Valor unidade:</label>'
  codigoHTML +=
    '<input type="Number" class="form-control mousetrap" id="valorUni" placeholder="Valor da unidade">'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="valorCus">Valor Custo:</label>'
  codigoHTML +=
    '<input type="Number" class="form-control mousetrap" id="valorCus" placeholder="Valor de custo">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="dataValidade">Data validade:</label>'
  codigoHTML +=
    '<input type="date" class="form-control mousetrap" id="dataValidade">'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="qtdEstoque">Quantidade estoque:</label>'
  codigoHTML +=
    '<input type="Number" class="form-control mousetrap" id="qtdEstoque" placeholder="Quantidade em estoque">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="listaFornecedor">Lista de fornecedores:</label>'
  codigoHTML += '<select class="custom-select mr-sm-6" id="listaFornecedor">'
  codigoHTML += '</select>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="form-row">'
  codigoHTML += '<div class="form-group col-md-6">'
  codigoHTML += '<label for="descricao">Descrição:</label>'
  codigoHTML +=
    '<textArea type="text" class="form-control" id="descricao" placeholder="Descrição do produto">Nenhuma.'
  codigoHTML += '</textArea>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'

  codigoHTML += '<div id="dadosDoFornecedor">'
  codigoHTML += '</div>'

  codigoHTML += '<div class="form-row">'

  if (tipo == 'Atualizar') {
    codigoHTML +=
      '<button onclick="confirmarAcao(\'Atualizar dados produto!\',\'atualizarProduto();\')" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Salvar</button>'
    codigoHTML +=
      '<button onclick="confirmarAcao(\'Excluir dados produto permanentemente!\',\'excluirProduto();\')" type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
  } else if (tipo == 'Cadastrar') {
    codigoHTML +=
      '<button onclick="document.getElementById(\'dadosDoFornecedor\').innerHTML = carregarTelaDadosFornecedor(\'Cadastrar\',null);" type="button" class="btn btn-warning" style="margin: 5px;"><span class="fas fa-people-carry"></span> Cadastrar Fornecedor</button>'
    codigoHTML +=
      '<button onclick="cadastrarProduto();" type="button" class="btn btn-primary" style="margin: 5px;"><span class="fas fa-save"></span> Salvar</button>'
  }

  codigoHTML += '</div>'
  codigoHTML += '</form>'
  codigoHTML += '</div>'

  return codigoHTML
}

// funcao reponsavel por gerar a tela de busca com atualizacao e delete
function telaBuscarProduto() {
  let codigoHTML = ''

  codigoHTML += '<h3 class="text-center">Produto</h3>'

  codigoHTML +=
    '<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
  codigoHTML += '<h5 class="text-center">Buscar Produto</h5>'
  codigoHTML += '<div class="input-group mb-3">'
  codigoHTML +=
    '<input id="buscaProduto" type="text" class="form-control mousetrap" placeholder="Nome ou código de barras">'
  codigoHTML += '</div>'
  codigoHTML += '<div class="input-group mb-3">'
  codigoHTML +=
    '<input id="buscaProdutoDate" type="month" class="form-control mousetrap">'
  codigoHTML += '</div>'
  codigoHTML +=
    '<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#buscaProduto\'])){buscarProduto(\'codigo\'); animacaoSlideUp([\'#listaDeProdutos\'])}else{mensagemDeErro(\'Preencha o campo nome/código de barras!\'); mostrarCamposIncorreto([\'buscaProduto\'])}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Código de barras</button>'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#buscaProduto\'])){buscarProduto(\'nome\'); animacaoSlideUp([\'#listaDeProdutos\'])}else{mensagemDeErro(\'Preencha o campo nome/código de barras!\'); mostrarCamposIncorreto([\'buscaProduto\'])}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
  codigoHTML +=
    '<button onclick="buscarProduto(\'todos\'); animacaoSlideUp([\'#listaDeProdutos\'])" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
  codigoHTML += '</div>'
  codigoHTML +=
    '<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#buscaProdutoDate\'])){buscarProduto(\'dataValidade\'); animacaoSlideUp([\'#listaDeProdutos\'])}else{mensagemDeErro(\'Preencha o campo data!\'); mostrarCamposIncorreto([\'buscaProdutoDate\'])}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Data de validade</button>'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#buscaProdutoDate\'])){buscarProduto(\'dataChegada\'); animacaoSlideUp([\'#listaDeProdutos\'])}else{mensagemDeErro(\'Preencha o campo data!\'); mostrarCamposIncorreto([\'buscaProdutoDate\'])}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Data de inclusão</button>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'

  codigoHTML +=
    '<div class="col-12 layer1" style="position: relative; height: 300px; z-index: 1; overflow: scroll; margin-top:20px;">'
  codigoHTML += '<div id="listaDeProdutos" class="list-group">'
  codigoHTML += '</div>'
  codigoHTML += '</div>'

  codigoHTML += '<div id="dadosDoProduto" style="margin-top:20px;">'

  codigoHTML += '</div>'

  return codigoHTML
}

// funcao responsavel pela lista de produtos
function carregarListaProdutos(json, posicao) {
  let codigoHTML = ''

  codigoHTML += `<a href="#" onclick="carregarCamposComDadosProduto(${posicao});" class="list-group-item list-group-item-action">`
  codigoHTML += '<div class="d-flex w-100 justify-content-between">'
  codigoHTML += `<h5 class="mb-1">Nome: ${corrigirTamanhoString(
    36,
    json.name
  )}</h5>`
  codigoHTML += `<small>Código de barras: ${json.barcode}</small>`
  codigoHTML += '</div>'
  codigoHTML += `<small>Descrição: ${corrigirTamanhoString(
    50,
    json.description
  )}</small>`
  codigoHTML += '</a>'

  return codigoHTML
}

// funcao responsavel por carregar os dados do produto selecionado na lista
function carregarCamposComDadosProduto(posicao) {
  document.getElementById('dadosDoProduto').innerHTML = telaProduto('Atualizar')
  carregarListaDeFornecedoresEmProduto()

  setTimeout(function () {
    document.getElementById('id').value = JSONPRODUTOCLASSEPRODUTO[posicao]._id
    document.getElementById('barcode').value =
      JSONPRODUTOCLASSEPRODUTO[posicao].barcode
    document.getElementById('nome').value =
      JSONPRODUTOCLASSEPRODUTO[posicao].name
    document.getElementById('valorUni').value =
      JSONPRODUTOCLASSEPRODUTO[posicao].price
    document.getElementById('valorCus').value =
      JSONPRODUTOCLASSEPRODUTO[posicao].cost
    const data = JSONPRODUTOCLASSEPRODUTO[posicao].validity.split('T')
    document.getElementById('dataValidade').value = data[0]
    document.getElementById('qtdEstoque').value =
      JSONPRODUTOCLASSEPRODUTO[posicao].stock
    document.getElementById('listaFornecedor').value =
      JSONPRODUTOCLASSEPRODUTO[posicao].provider._id
    document.getElementById('descricao').value =
      JSONPRODUTOCLASSEPRODUTO[posicao].description
    mensagemDeAviso('Pronto para atualizar ou excluir!')
  }, 300)
}

// funcao responsavel por carregar a lista de fornecedores na categoria produto
async function carregarListaDeFornecedoresEmProduto() {
  let codigoHTML = ''
  let cont = 0
  const json = await requisicaoGET('providers', {
    headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
  })

  while (json.data[cont]) {
    codigoHTML += `<option value="${json.data[cont]._id}">${json.data[cont].name} - ${json.data[cont].identification}</option>`
    cont++
  }

  document.getElementById('listaFornecedor').innerHTML = codigoHTML
}

// function responsavel por cadastrar produto
async function cadastrarProduto() {
  if (
    document.getElementById('nomeFornecedor') != null &&
    validaDadosCampo(['#nomeFornecedor'])
  ) {
    if (
      validaDadosCampo([
        '#barcode',
        '#nome',
        '#valorUni',
        '#valorCus',
        '#dataValidade',
        '#qtdEstoque',
        '#nomeFornecedor',
        '#cpfCnpjFornecedor',
        '#telefoneFornecedor',
        '#emailFornecedor',
      ])
    ) {
      try {
        let jsonProduto = `{"barcode":"${$('#barcode').val()}",`
        jsonProduto += `"name":"${$('#nome').val()}",`
        jsonProduto += `"price":${$('#valorUni').val()},`
        jsonProduto += `"cost":${$('#valorCus').val()},`
        var data = document.getElementById('dataValidade').value.split('-')
        jsonProduto += `"validity":"${new Date(
          data[0],
          data[1] - 1,
          data[2]
        ).toISOString()}",`
        jsonProduto += `"stock":${$('#qtdEstoque').val()},`
        jsonProduto += `"description":"${$('#descricao').val()}"}`

        const result = await requisicaoPOST(
          'products',
          JSON.parse(jsonProduto),
          {
            headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
          }
        )

        setTimeout(async function () {
          let jsonFornecedor = `{"name":"${$('#nomeFornecedor').val()}",`
          jsonFornecedor += `"identification":"${$(
            '#cpfCnpjFornecedor'
          ).val()}",`
          jsonFornecedor += `"phone":"${$('#telefoneFornecedor').val()}",`
          jsonFornecedor += `"description":"${$(
            '#descricaoFornecedor'
          ).val()}",`
          jsonFornecedor += `"products":["${result.data._id}"],`
          jsonFornecedor += `"email":"${$('#emailFornecedor').val()}"}`

          await requisicaoPOST('providers', JSON.parse(jsonFornecedor), {
            headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
          })

          mensagemDeAviso('Cadastrado com sucesso!')
          autenticacaoProduto('Cadastrar')
        }, 1000)
      } catch (error) {
        mensagemDeErro(`Não foi possível cadastrar o produto! Erro: ${error}`)
      }
    } else {
      mensagemDeErro('Preencha todos os campos!')
      mostrarCamposIncorreto([
        'barcode',
        'nome',
        'valorUni',
        'valorCus',
        'dataValidade',
        'qtdEstoque',
        'nomeFornecedor',
        'cpfCnpjFornecedor',
        'telefoneFornecedor',
        'emailFornecedor',
      ])
    }
  } else if (
    validaDadosCampo([
      '#barcode',
      '#nome',
      '#valorUni',
      '#valorCus',
      '#dataValidade',
      '#qtdEstoque',
    ])
  ) {
    try {
      let json = `{"barcode":"${$('#barcode').val()}",`
      json += `"name":"${$('#nome').val()}",`
      json += `"price":${$('#valorUni').val()},`
      json += `"cost":${$('#valorCus').val()},`
      var data = document.getElementById('dataValidade').value.split('-')
      json += `"validity":"${new Date(
        data[0],
        data[1] - 1,
        data[2]
      ).toISOString()}",`
      json += `"stock":${$('#qtdEstoque').val()},`
      json += `"description":"${$('#descricao').val()}",`
      json += `"providerId":"${$('#listaFornecedor').val()}"}`

      await requisicaoPOST('products', JSON.parse(json), {
        headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
      })

      mensagemDeAviso('Cadastrado com sucesso!')
      autenticacaoProduto('Cadastrar')
    } catch (error) {
      mensagemDeErro(`Não foi possível cadastrar o produto! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Preencha todos os campos!')
    mostrarCamposIncorreto([
      'barcode',
      'nome',
      'valorUni',
      'valorCus',
      'dataValidade',
      'qtdEstoque',
    ])
    if (document.getElementById('nomeFornecedor') != null) {
      mostrarCamposIncorreto([
        'nomeFornecedor',
        'cpfCnpjFornecedor',
        'telefoneFornecedor',
        'emailFornecedor',
      ])
    }
  }

}

// funcao responsavel por buscar os produtos e enviar para a lista
async function buscarProduto(tipo) {
  let cont = 0
  document.getElementById('listaDeProdutos').innerHTML =
    '<h5 class="text-center">Lista de Produtos</h5>'

  if (tipo == 'codigo') {
    var json = await requisicaoGET(
      `products_barcode?barcode=${$('#buscaProduto').val()}`,
      { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
    )
    JSONPRODUTOCLASSEPRODUTO = []
    JSONPRODUTOCLASSEPRODUTO.push(json.data)
    $('#listaDeProdutos').append(carregarListaProdutos(json.data, 0))
  } else if (tipo == 'nome') {
    var json = await requisicaoGET(
      `products?name=${$('#buscaProduto').val()}`,
      { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
    )
    JSONPRODUTOCLASSEPRODUTO = []
    while (json.data[cont]) {
      JSONPRODUTOCLASSEPRODUTO.push(json.data[cont])
      $('#listaDeProdutos').append(carregarListaProdutos(json.data[cont], cont))
      cont++
    }
  } else if (tipo == 'todos') {
    var json = await requisicaoGET('providers', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
    let cont2 = 0
    JSONPRODUTOCLASSEPRODUTO = []

    json.data.forEach(function (item) {
      while (item.products[cont]) {
        let json2 = `{"_id": "${item.products[cont]._id}",`
        json2 += `"name": "${item.products[cont].name}",`
        json2 += `"description": "${item.products[cont].description}",`
        json2 += `"barcode": ${item.products[cont].barcode},`
        json2 += `"price": ${item.products[cont].price},`
        json2 += `"cost": ${item.products[cont].cost},`
        json2 += `"validity": "${item.products[cont].validity}",`
        json2 += `"stock": ${item.products[cont].stock},`
        json2 += `"createdAt": "${item.products[cont].createdAt}",`
        json2 += `"updatedAt": "${item.products[cont].updatedAt}",`
        json2 += `"provider":{"_id":"${item._id}"}}`

        JSONPRODUTOCLASSEPRODUTO.push(JSON.parse(json2))
        $('#listaDeProdutos').append(
          carregarListaProdutos(JSON.parse(json2), cont2)
        )
        cont2++
        cont++
      }
      cont = 0
    })
  } else if (tipo == 'dataValidade') {
    var json = await requisicaoGET(
      `products_validity?date=${$('#buscaProdutoDate').val()}`,
      { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
    )
    JSONPRODUTOCLASSEPRODUTO = []
    while (json.data[cont]) {
      JSONPRODUTOCLASSEPRODUTO.push(json.data[cont])
      $('#listaDeProdutos').append(carregarListaProdutos(json.data[cont], cont))
      cont++
    }
  } else if (tipo == 'dataChegada') {
    var json = await requisicaoGET(
      `products_created_date?date=${$('#buscaProdutoDate').val()}`,
      { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
    )
    JSONPRODUTOCLASSEPRODUTO = []
    while (json.data[cont]) {
      JSONPRODUTOCLASSEPRODUTO.push(json.data[cont])
      $('#listaDeProdutos').append(carregarListaProdutos(json.data[cont], cont))
      cont++
    }
  }

  animacaoSlideDown(['#listaDeProdutos'])
}

// funcao responsavel por atualizar produto
async function atualizarProduto() {
  if (
    validaDadosCampo([
      '#id',
      '#barcode',
      '#nome',
      '#valorUni',
      '#valorCus',
      '#dataValidade',
      '#qtdEstoque',
    ])
  ) {
    try {
      let jsonProduto = `{"barcode":"${$('#barcode').val()}",`
      jsonProduto += `"name":"${$('#nome').val()}",`
      jsonProduto += `"price":${$('#valorUni').val()},`
      jsonProduto += `"cost":${$('#valorCus').val()},`
      const data = document.getElementById('dataValidade').value.split('-')
      jsonProduto += `"validity":"${new Date(
        data[0],
        data[1] - 1,
        data[2]
      ).toISOString()}",`
      jsonProduto += `"stock":${$('#qtdEstoque').val()},`
      jsonProduto += `"description":"${$('#descricao').val()}"}`

      await requisicaoPUT(
        `products?id=${$('#id').val()}&providerId=${$(
          '#listaFornecedor'
        ).val()}`,
        JSON.parse(jsonProduto),
        { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
      )
      mensagemDeAviso('Atualizado com sucesso!')
      autenticacaoProduto('Atualizar')
    } catch (error) {
      mensagemDeErro(`Não foi possível atualizar o produto! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Preencha todos os campos!')
    mostrarCamposIncorreto([
      'barcode',
      'nome',
      'valorUni',
      'valorCus',
      'dataValidade',
      'qtdEstoque',
    ])
  }
}

// funcao responsavel por apagar um produto
async function excluirProduto() {
  if (validaDadosCampo(['#id'])) {
    try {
      await requisicaoDELETE(`products/${$('#id').val()}`, '', {
        headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
      })
      mensagemDeAviso('Excluido com sucesso!')
      autenticacaoProduto('Atualizar')
    } catch (error) {
      mensagemDeErro(`Não foi possível excluir! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Não é possivel, falta de ID!')
    mostrarCamposIncorreto(['id'])
  }
}
