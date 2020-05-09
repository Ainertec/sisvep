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
    setTimeout(function(){document.getElementById('mensagemDeErro').innerHTML=""},2000);
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