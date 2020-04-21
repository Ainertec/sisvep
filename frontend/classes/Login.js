

// ------------------------------------------- tela principal login -------------------------------------------------------










//tela de login
function telaAutenticacao(){
    
    var codigoHTML;

    codigoHTML='<h3 class="text-center">Acesso</h3>'
    codigoHTML+='<form class="text-center" style="margin-top:30px;">'
        codigoHTML+='<h1><span class="fas fa-user-circle"></span></h1>'
        codigoHTML+='<div class="form-row col-4 rounded mx-auto d-block">'
            codigoHTML+='<input id="login" type="text" class="form-control mb-2" placeholder="Login">'
            codigoHTML+='<input id="senha" type="password" class="form-control mb-2" placeholder="Senha">'
            codigoHTML+='<button onclick="efetuarLogin();" type="button" class="btn btn-primary border border-danger col-md-3">'
                codigoHTML+='<span class="fas fa-key"></span> Acessar'
            codigoHTML+='</button>'
            codigoHTML+='<a href="#" onclick="document.getElementById(\'areaRecuperarSenha\').innerHTML = telaRecuperacaoSenha();" style="margin-left:20px;" class="col-md-3">Esqueceu a senha?</a>'
        codigoHTML+='</div>'
    codigoHTML+='</form>'
    codigoHTML+='<div id="areaRecuperarSenha">'
    codigoHTML+='<div>'

    document.getElementById('janela2').innerHTML = codigoHTML;

}










//funcao responsavel por gerar a tela de recuperacao de senha
function telaRecuperacaoSenha(){

    var codigoHTML='';

    codigoHTML='<h3 class="text-center" style="margin-top:30px;">Recuperar conta</h3>'
    codigoHTML+='<form class="text-center" style="margin-top:10px;">'
        codigoHTML+='<div class="form-row col-4 rounded mx-auto d-block">'
            codigoHTML+='<label for="pergunta">Responda a pergunta de segurança:</label>'
            codigoHTML+='<input id="pergunta" type="text" class="form-control mb-2" placeholder="Resposta">'
            codigoHTML+='<input id="senha" type="password" class="form-control mb-2" placeholder="Digite uma nova senha">'
            codigoHTML+='<button type="button" class="btn btn-primary border border-danger col-md-3">'
                codigoHTML+='<span class="fas fa-key"></span> Recuperar'
            codigoHTML+='</button>'
        codigoHTML+='</div>'
    codigoHTML+='</form>'

    return codigoHTML;

}










//funcao para fazer logout
function logout(){
    sessionStorage.removeItem("login");
    mensagemDeAviso("Logout com sucesso!");
}










//funcao responsavel por efetuar login
function efetuarLogin(){
    
    logout();

    if(1==1){
        sessionStorage.setItem("login",JSON.stringify({"_id":"1a23e","nome":"Ana Paula","tipo":"Administrador"}));
        window.location.href="home.html";
        mensagemDeAviso("Usuário autenticado!");
    }

}










//funcao para autenticacao e liberacao de sessao
function autenticacaoLogin(){

    if(sessionStorage.getItem('login')==null){
        mensagemDeErro("Usuário não autenticado!");
        return telaAutenticacao();
    }else{
        return sessionStorage.getItem('login');
    }

}










//status inicial de login
$(document).ready(function (){
    if(sessionStorage.getItem("login")){
        var nome = (JSON.parse(sessionStorage.getItem('login')).nome).toString();
        document.getElementById('statusLogin').innerHTML = '<a onclick="logout();" class="nav-link text-light" href="home.html"><span class="fas fa-user-slash iconsTam"></span> Sair ('+nome.substr(0,7)+'...)</a>';
    }else{
        document.getElementById('statusLogin').innerHTML = '<a onclick="telaAutenticacao();" class="nav-link text-light" href="#"><span class="fas fa-user-shield iconsTam"></span> Entrar</a>';
    }
});