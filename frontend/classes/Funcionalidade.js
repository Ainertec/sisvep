//verifica inicializações basicas
$(document).ready(function (){
    if(localStorage.getItem("login")){
        document.getElementById('statusLogin').innerHTML = '<a onclick="logout();" class="nav-link text-light" href="home.html"><span class="fas fa-user-slash iconsTam"></span> Sair</a>';
    }else{
        document.getElementById('statusLogin').innerHTML = '<a onclick="telaAutenticacao();" class="nav-link text-light" href="#"><span class="fas fa-user-shield iconsTam"></span> Entrar</a>';
    }
});

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