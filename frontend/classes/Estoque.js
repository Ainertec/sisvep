// /---------------------------------------------tela principal de Estoque-----------------------------------------------

// vetor responsavel por guardar em tempo de execução os produtos da busca
let VETORPRODUTOCLASSESTOQUE = []

// funcao responsavel pela autenticacao no setor estoque
function autenticacaoEstoqueFacede() {
  VETORPRODUTOCLASSESTOQUE = []
  const situacao = autenticacaoLogin()

  if (
    JSON.parse(situacao).tipo == 'Administrador' ||
    JSON.parse(situacao).tipo == 'Comum'
  ) {
    document.getElementById('janela2').innerHTML = telaEstoque()
  } else {
    mensagemDeErro('Usuário não autorizado!')
  }
}

// funcao responsavel pela tela principal de estoque
function telaEstoque() {
  let codigoHTML = ''

  codigoHTML += '<h3 class="text-center">Estoque</h3>'

  codigoHTML +=
    '<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
  codigoHTML += '<h5 class="text-center">Buscar</h5>'
  codigoHTML += '<div class="input-group mb-3">'
  codigoHTML +=
    '<input id="buscaProduto" type="text" class="form-control mousetrap" placeholder="Nome">'
  codigoHTML +=
    '<input id="buscaProdutoQuantidade" type="Number" class="form-control mousetrap" placeholder="Quantidade">'
  codigoHTML += '</div>'
  codigoHTML +=
    '<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#buscaProduto\'])){buscarProdutoEstoque(\'nome\'); animacaoSlideUp([\'#tabelaDeProdutosEstoque\'])}else{mensagemDeErro(\'Preencha o campo nome!\'); mostrarCamposIncorreto([\'buscaProduto\'])}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#buscaProdutoQuantidade\'])){buscarProdutoEstoque(\'quantidade\'); animacaoSlideUp([\'#tabelaDeProdutosEstoque\'])}else{mensagemDeErro(\'Preencha o campo quantidade!\'); mostrarCamposIncorreto([\'buscaProdutoQuantidade\'])}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Quantidade</button>'
  codigoHTML +=
    '<button onclick="buscarProdutoEstoque(\'todos\'); animacaoSlideUp([\'#tabelaDeProdutosEstoque\'])" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'

  codigoHTML += '<div id="tabelaDeProdutosEstoque"></div>'

  return codigoHTML
}

// funcao responsavel por carregar os dados dos produtos para estoque
function carregarProdutosEstoque(json, posicao) {
  let codigoHTML = ''

  codigoHTML += '<tr>'
  codigoHTML += `<td><strong>${json.barcode}</strong></td>`
  codigoHTML += `<td class="table-info"><strong>${corrigirTamanhoString(36, json.name)}</strong></td>`
  if (json.stock < 10) {
    codigoHTML += `<td class="table-danger"><strong>${json.stock}</strong></td>`
  } else {
    codigoHTML += `<td class="table-success"><strong>${json.stock}</strong></td>`
  }
  codigoHTML += `<td><input id="quantidadeItem${posicao}" type="Number" class="form-control" placeholder="Adicionar quantidade"></td>`
  codigoHTML += `<td><button onclick="confirmarAcao('Atualizar a quantidade deste produto em estoque!','atualizarEstoqueDeProduto(${posicao})')" type="button" class="btn btn-success"><span class="fas fa-sync-alt"></span> Atualizar</button></td>`
  codigoHTML += '</tr>'

  return codigoHTML
}

// funcao responsavel por buscar e listar os produtos da busca
async function buscarProdutoEstoque(tipo) {
  VETORPRODUTOCLASSESTOQUE = []
  document.getElementById('tabelaDeProdutosEstoque').innerHTML = ''
  let cont = 0

  let codigoHTML = ''

  codigoHTML +=
    '<h5 class="text-center" style="margin-top:30px;">Lista de Produtos</h5>'
  codigoHTML += '<table class="table table-bordered bg-light">'
  codigoHTML += '<thead class="thead-dark">'
  codigoHTML += '<tr>'
  codigoHTML += '<th scope="col">Código</th>'
  codigoHTML += '<th scope="col">Nome</th>'
  codigoHTML += '<th scope="col">Quantidade</th>'
  codigoHTML += '<th scope="col">Adicionar</th>'
  codigoHTML += '<th scope="col">#</th>'
  codigoHTML += '</tr>'
  codigoHTML += '</thead>'
  codigoHTML += '<tbody>'

  if (tipo == 'nome') {
    var json = await requisicaoGET(
      `products?name=${document.getElementById('buscaProduto').value}`,
      { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
    )
    while (json.data[cont]) {
      VETORPRODUTOCLASSESTOQUE.push(json.data[cont])
      codigoHTML += carregarProdutosEstoque(json.data[cont], cont)
      cont++
    }
  } else if (tipo == 'quantidade') {
    var json = await requisicaoGET('providers', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
    var cont2 = 0
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

        if (
          item.products[cont].stock <=
          parseInt($('#buscaProdutoQuantidade').val())
        ) {
          VETORPRODUTOCLASSESTOQUE.push(JSON.parse(json2))
          codigoHTML += carregarProdutosEstoque(JSON.parse(json2), cont2)
          cont2++
        }
        cont++
      }
      cont = 0
    })
  } else if (tipo == 'todos') {
    var json = await requisicaoGET('providers', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
    var cont2 = 0
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

        VETORPRODUTOCLASSESTOQUE.push(JSON.parse(json2))
        codigoHTML += carregarProdutosEstoque(JSON.parse(json2), cont2)
        cont2++
        cont++
      }
      cont = 0
    })
  }

  setTimeout(function () {
    codigoHTML += '</tbody>'
    codigoHTML += '</table>'
    document.getElementById('tabelaDeProdutosEstoque').innerHTML = codigoHTML
    animacaoSlideDown(['#tabelaDeProdutosEstoque'])
  }, 300)
}

// funcao rsponsavel por atualizar a quantidade de um determinado produto
async function atualizarEstoqueDeProduto(id) {
  if (
    validaValoresCampo([`#quantidadeItem${id}`]) &&
    validaDadosCampo([`#quantidadeItem${id}`])
  ) {
    try {
      let json = `{"barcode": ${VETORPRODUTOCLASSESTOQUE[id].barcode},`
      json += `"cost": ${VETORPRODUTOCLASSESTOQUE[id].cost},`
      json += `"description": "${VETORPRODUTOCLASSESTOQUE[id].description}",`
      json += `"name": "${VETORPRODUTOCLASSESTOQUE[id].name}",`
      json += `"price": ${VETORPRODUTOCLASSESTOQUE[id].price},`
      json += `"stock": ${
        VETORPRODUTOCLASSESTOQUE[id].stock +
        parseInt(document.getElementById(`quantidadeItem${id}`).value)
        },`
      json += `"validity": "${VETORPRODUTOCLASSESTOQUE[id].validity}"}`

      await requisicaoPUT(
        `products?id=${VETORPRODUTOCLASSESTOQUE[id]._id}&providerId=${VETORPRODUTOCLASSESTOQUE[id].provider._id}`,
        JSON.parse(json),
        { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
      )
      mensagemDeAviso('Estoque atualizado com sucesso!')
      setTimeout(function () {
        autenticacaoEstoqueFacede()
      }, 1000)
    } catch (error) {
      mensagemDeErro(`Não foi possível atualizar! Erro: ${error}`)
    }
  } else {
    mensagemDeErro('Quantidade para adicionar inválida!')
    mostrarCamposIncorreto([`quantidadeItem${id}`])
  }
}
