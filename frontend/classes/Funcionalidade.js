//funcao de inicializacao basica funcionalidade
$(document).ready(function () {
  limparTelaDeMensagem();
})

// funcao para gerar mensagem de erro
function mensagemDeErro(mensagem) {
  document.getElementById(
    'mensagemDeErro'
  ).innerHTML = `<span class="badge badge-danger h5">${mensagem}</span>`
  $('#mensagemDeErro').animate({ width: 'show' })
  limparTelaDeMensagem()
}

// funcao para gerar mensagem de aviso
function mensagemDeAviso(mensagem) {
  document.getElementById(
    'mensagemDeErro'
  ).innerHTML = `<span class="badge badge-success h5">${mensagem}</span>`
  $('#mensagemDeErro').animate({ width: 'show' })
  limparTelaDeMensagem()
}

// funcao para limpar tela de mensagens
function limparTelaDeMensagem() {
  setTimeout(function () {
    $('#mensagemDeErro').animate({ width: 'hide' })
  }, 3000)
}

// funcao resopnsavel por validar os dados preenchidos nos campos
function validaDadosCampo(campo) {
  let validacao = true
  campo.forEach(function (item) {
    if ($(item).val() == '' || $(item).val() == null) validacao = false
  })

  return validacao
}

// funcao responsavel por validar valores invalidos nos campos(valores negativos e zerados)
function validaValoresCampo(campo) {
  let validacao = true
  campo.forEach(function (item) {
    if (parseFloat($(item).val()) < 0.0 || parseFloat($(item).val()) == 0.0)
      validacao = false
  })

  return validacao
}

// funcao responsavel por buscar a sessao do usuario
function buscarSessionUser() {
  return JSON.parse(sessionStorage.getItem('login'))
}

// funcao responsavel por imprimir na impressora
function imprimirImpressora(idReferencia) {
  $(idReferencia).printThis({
    debug: false, // show the iframe for debugging
    importCSS: true, // import parent page css
    importStyle: false, // import style tags
    printContainer: true, // print outer container/$.selector
    loadCSS: './../bootstrap/css/escopo-css-impressao.css', // path to additional css file - use an array [] for multiple
    pageTitle: '', // add title to print page
    removeInline: false, // remove inline styles from print elements
    removeInlineSelector: '*', // custom selectors to filter inline styles. removeInline must be true
    printDelay: 222, // variable print delay
    header: false, // prefix to html
    footer: null, // postfix to html
    base: false, // preserve the BASE tag or accept a string for the URL
    formValues: true, // preserve input/form values
    canvas: false, // copy canvas content
    doctypeString: false, // enter a different doctype for older markup
    removeScripts: false, // remove script tags from print content
    copyTagClasses: false, // copy classes from the html & body tag
    beforePrintEvent: null, // function for printEvent in iframe
    beforePrint: null, // function called before iframe is filled
    afterPrint: null, // function called before iframe is removed
  })
}

// funcao responsavel por limpar o modal de impressao
function limparModal() {
  document.getElementById('modal').innerHTML = ''
}

// funcao de animacao da janela2
function animacaoJanela2() {
  $('#janela2').fadeOut(100)
  $('#janela2').fadeIn(100)
}

// funcao responsavel por alertar ao cliente se ele realmente deseja efetuar umas determinada acao
function confirmarAcao(mensagem, funcao) {
  let codigoHTML = ''
  codigoHTML +=
    '<div class="modal fade" id="modalaviso" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">'
  codigoHTML += '<div class="modal-dialog" role="document">'
  codigoHTML += '<div class="modal-content">'
  codigoHTML += '<div class="modal-header">'
  codigoHTML += '<h5 class="modal-title">Atenção</h5>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="modal-body">'
  codigoHTML += `<p class="text-danger"><strong>${mensagem} Deseja continuar?</strong></p>`
  codigoHTML += '</div>'
  codigoHTML += '<div class="modal-footer">'
  codigoHTML +=
    '<button onclick="document.getElementById(\'modal\').innerHTML=\'\';" type="button" class="btn btn-secondary" data-dismiss="modal"><span class="fas fa-times iconsTam"></span> Não</button>'
  codigoHTML += `<button onclick="${funcao}; document.getElementById('modal').innerHTML='';" type="button" class="btn btn-primary" data-dismiss="modal"><span class="fas fa-check iconsTam"></span> Sim</button>`
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  document.getElementById('modal').innerHTML = codigoHTML
  $('#modalaviso').modal('show')
}

// funcao responsavel por manipular o tamanho da string de exibição(caso seja muito grande)
function corrigirTamanhoString(tamMax, texto) {
  if (texto.toString().length > tamMax) {
    texto = texto.substr(0, tamMax)
    texto += '...'
  }
  return texto
}

//funcao responsavel por exbir cor diferente no campor incorreto
function mostrarCamposIncorreto(campo) {
  campo.forEach(function (item) {
    document.getElementById(item).classList.add('border');
    document.getElementById(item).classList.add('border-danger');
    setTimeout(function () {
      document.getElementById(item).classList.remove('border');
      document.getElementById(item).classList.remove('border-danger')
    }, 2000)
  });
}

//funcao de animacao slideUp
function animacaoSlideUp(idReferencia) {
  idReferencia.forEach(function (item) {
    $(item).slideUp(300)
  });
}

//funcao de animacao slideDown
function animacaoSlideDown(idReferencia) {
  idReferencia.forEach(function (item) {
    $(item).slideDown(300)
  })
}