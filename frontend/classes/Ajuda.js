// funcao responsavel por exibir todas as ajudas necessarias
function ajudaInformacoes() {
  let codigoHTML = ''

  codigoHTML += '<p>========================</p>'
  codigoHTML += '<h2>Teclas de atalho geral</h2>'
  codigoHTML += '<p>------------------------</p>'
  codigoHTML += '<p><strong>ctrl+1</strong> -> Abre a tela de venda.</p>'
  codigoHTML += '<p><strong>ctrl+2</strong> -> Abre a tela de produto.</p>'
  codigoHTML += '<p><strong>ctrl+3</strong> -> Abre a tela de fornecedor.</p>'
  codigoHTML += '<p><strong>ctrl+4</strong> -> Abre a tela de funcionário.</p>'
  codigoHTML += '<p><strong>ctrl+5</strong> -> Abre a tela de estoque.</p>'
  codigoHTML += '<p><strong>ctrl+6</strong> -> Abre a tela de relatório.</p>'
  codigoHTML += '<p><strong>ctrl+7</strong> -> Abre a tela de impressão.</p>'
  codigoHTML += '<p><strong>ctrl+8</strong> -> Abre a tela de loja.</p>'
  codigoHTML += '<p><strong>ctrl+9</strong> -> Efetua logout.</p>'
  codigoHTML += '<p><strong>esc</strong> -> Abre a tela de Início.</p>'
  codigoHTML += '<p>========================</p>'
  codigoHTML += '<h2>Teclas de atalho venda</h2>'
  codigoHTML += '<p>------------------------</p>'
  codigoHTML += '<p><strong>2 x del</strong> -> Remove o item.</p>'
  codigoHTML += '<p><strong>2 x enter</strong> -> Adiciona o item.</p>'
  codigoHTML +=
    '<p><strong>d+enter</strong> -> Seleciona o pagamento em dinheiro.</p>'
  codigoHTML +=
    '<p><strong>c+enter</strong> -> Seleciona o pagamento em cartão.</p>'
  codigoHTML +=
    '<p><strong>q</strong> -> Seleciona o campo de quantidade do item aonde será adicionado a quantidade do item a ser vendido.</p>'
  codigoHTML +=
    '<p><strong>r</strong> -> Seleciona o campo excluir item aonde será adicionado o código do produto a ser excluido.</p>'
  codigoHTML +=
    '<p><strong>a</strong> -> Seleciona o campo adicionar item aonde será adicionado o código do produto a ser adicionado.</p>'
  codigoHTML +=
    '<p><strong>2 x b</strong> -> Libera o menu lateral (lembrando que se ativado durante a venda todos os dados da mesma serão perdidos!).</p>'
  codigoHTML +=
    '<p><strong>l</strong> -> Abre a opção de selecionar o produto pelo nome na hora da venda.</p>'
  codigoHTML += '<p>========================</p>'
  //codigoHTML += '<h2>Informções de funcionamento</h2>'
  //codigoHTML += '<p>------------------------</p>'
  //codigoHTML += '<img src="..." class="img-fluid"></img>'

  document.getElementById('janela2').innerHTML = codigoHTML
}
