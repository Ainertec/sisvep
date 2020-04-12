// ------------------------------------------- EXTRA -------------------------------------------------------

//tela de login
function telaAutenticacao(){
    
    var codigoHTML;

    codigoHTML='<h3 class="text-center">Acesso</h3>'
    codigoHTML+='<form class="text-center" style="margin-top:30px;">'
        codigoHTML+='<h1><span class="fas fa-user-circle"></span></h1>'
        codigoHTML+='<div class="form-row col-4 rounded mx-auto d-block">'
            codigoHTML+='<input id="login" type="text" class="form-control mb-2" placeholder="Login">'
            codigoHTML+='<input id="senha" type="password" class="form-control mb-2" placeholder="Senha">'
            codigoHTML+='<button onclick="autenticacaoLogin();" type="button" class="btn btn-light border border-dark col-md-3">'
                codigoHTML+='<span class="fas fa-key"></span> Acessar'
            codigoHTML+='</button>'
        codigoHTML+='</div>'
    codigoHTML+='</form>'

    document.getElementById('janela2').innerHTML = codigoHTML;

}


//funcao para fazer logout
function logout(){
    localStorage.removeItem("login");
    mensagemDeAviso("Logout com sucesso!");
}


//funcao para autenticacao e liberacao de sessao
async function autenticacaoLogin(){

    /*logout();
    var cont=0, json=await requisicaoGET("login/");

    if(json.data[cont]==null){
        localStorage.setItem("login",true);
        window.location.href="home.html";
    }

    while(json.data[cont]){
        if(document.getElementById('login').value==json.data[cont].login){
			if(document.getElementById('senha').value==json.data[cont].password){
                localStorage.setItem("login",JSON.stringify({"_id":json.data[cont]._id,"login":json.data[cont].login,"password":json.data[cont].password}));
                mensagemDeAviso("Usuário autenticado!");
                window.location.href="home.html";
			}
		}
        cont++;
    }

    if(localStorage.getItem('login')==null){
        telaAutenticacao();
        mensagemDeErro("Usuário não autenticado!");
    }*/

}