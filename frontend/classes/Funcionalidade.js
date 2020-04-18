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