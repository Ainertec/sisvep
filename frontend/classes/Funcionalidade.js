//funcao para gerar mensagem de erro
function mensagemDeErro(mensagem){
    document.getElementById('mensagemDeErro').innerHTML = '<span class="badge badge-danger h5">'+mensagem+'</span>';
    limparTelaDeMensagem();
}










//funcao para gerar mensagem de aviso
function mensagemDeAviso(mensagem){
    document.getElementById('mensagemDeErro').innerHTML = '<span class="badge badge-success h5">'+mensagem+'</span>';
    limparTelaDeMensagem();
}










//funcao para limpar tela de mensagens
function limparTelaDeMensagem(){
    setTimeout(function(){document.getElementById('mensagemDeErro').innerHTML=""},4000);
}










//funcao resopnsavel por validar os dados preenchidos nos campos
function validaDadosCampo(campo){
    var validacao = true;
    campo.forEach(function (item) {
        if($(item).val() == '' || $(item).val() == null)
            validacao = false;    
    });

    return validacao;
}









//funcao responsavel por validar valores invalidos nos campos(valores negativos e zerados)
function validaValoresCampo(campo){
    var validacao = true;
    campo.forEach(function (item) {
        if(parseFloat($(item).val()) < 0.0 || parseFloat($(item).val()) == 0.0)
            validacao = false;    
    });

    return validacao;
}









//funcao responsavel por buscar a sessao do usuario
function buscarSessionUser(){
    return JSON.parse(sessionStorage.getItem('login'));
}









//funcao responsavel por imprimir na impressora
function imprimirImpressora(idReferencia){
    $(idReferencia).printThis({
        debug: false,               // show the iframe for debugging
        importCSS: true,            // import parent page css
        importStyle: false,         // import style tags
        printContainer: true,       // print outer container/$.selector
        loadCSS: "./../bootstrap/css/escopo-css-impressao.css",                // path to additional css file - use an array [] for multiple
        pageTitle: "",              // add title to print page
        removeInline: false,        // remove inline styles from print elements
        removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
        printDelay: 222,            // variable print delay
        header: false,               // prefix to html
        footer: null,               // postfix to html
        base: false,                // preserve the BASE tag or accept a string for the URL
        formValues: true,           // preserve input/form values
        canvas: false,              // copy canvas content
        doctypeString: false,       // enter a different doctype for older markup
        removeScripts: false,       // remove script tags from print content
        copyTagClasses: false,      // copy classes from the html & body tag
        beforePrintEvent: null,     // function for printEvent in iframe
        beforePrint: null,          // function called before iframe is filled
        afterPrint: null            // function called before iframe is removed
    });
}









//funcao responsavel por limpar o modal de impressao
function limparModal(){
    document.getElementById('modal').innerHTML='';
}