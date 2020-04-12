// ------------------------------------------- INSERT ------------------------------------------------------


//funcao para gerar tela de cadatro de admin
function telaCadastrarAdmin(){
    telaCadastrarOuAtualizarAdmin("Cadastro",null,">",">","cadastrarAdmin();");
}

//chamada de funcao de requisicao create enviando dados em formato JSON para gravura
async function cadastrarAdmin(){
    await requisicaoPOST("login/",{"login":$('#login').val(),"password":$('#password').val()});
    mensagemDeAviso("Cadastrado com sucesso!");
    telaCadastrarAdmin();
}


// ------------------------------------------- UPDATE ------------------------------------------------------


//funcao para gerar tela de atualizacao de admin
function telaAtualizarAdmin(){
    var json = JSON.parse(localStorage.getItem("login"));

    telaCadastrarOuAtualizarAdmin("Atualizar",json._id,'value="'+json.login+'" >','value="'+json.password+'" >',"atualizarAdmin();");
}


//-------------------------------------------- DELETE ------------------------------------------------------


//funcao para gerar tela de deletar admin
function teladeletarAdmin(){
    var codigoHTML;

    codigoHTML='<h3 class="text-center">Excluir</h3>'
    codigoHTML+='<button onclick="deletarAdmin();" type="button" class="btn btn-outline-danger btn-lg btn-block my-3" style="margin-top:30px;"><span class="fas fa-save"></span> Excluir</button>'
    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao para chamar metodo delete para deletar Admin
async function deletarAdmin(){
    var json = JSON.parse(localStorage.getItem("login"));

    await requisicaoDELETE("login/",String(json._id));
    localStorage.removeItem("login");
    mensagemDeAviso("Excluido com sucesso!");
    window.location.href="home.html";
}


// ------------------------------------------- EXTRA -------------------------------------------------------

//tela de login
function telaAutenticacao(){
    
    var codigoHTML;

    codigoHTML='<h3 class="text-center">Acesso</h3>'
    codigoHTML+='<form class="text-center" style="margin-top:30px;">'
        codigoHTML+='<h1><span class="fas fa-user-circle"></span></h1>'
        codigoHTML+='<div class="form-row col-8 rounded mx-auto d-block">'
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

    logout();
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
    }

}


//funcao de escopo de tela para cadastro ou atualizacao de admins
function telaCadastrarOuAtualizarAdmin(cabecalho,id,opcao1,opcao2,opcao3){

    var codigoHTML;

    codigoHTML='<h3 class="text-center">'+cabecalho+'</h3>'
    codigoHTML+='<form style="margin-top:30px;">'
        if(id){
            codigoHTML+='<div class="row">'
                codigoHTML+='<div class="col">'
                codigoHTML+='<fieldset disabled>'
                    codigoHTML+='<input type="text" id="id" class="form-control my-3" placeholder="ID" value="'+id+'">'
                codigoHTML+='</fieldset>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
        }
        codigoHTML+='<div class="row">'
            codigoHTML+='<div class="col">'
                codigoHTML+='<label>Login: </label><input id="login" type="text" class="form-control" placeholder="Login" '+opcao1
            codigoHTML+='</div>'
            codigoHTML+='<div class="col">'
                codigoHTML+='<label>Senha: </label><input id="password" type="password" class="form-control" placeholder="Senha" '+opcao2
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    codigoHTML+='</form>'
    codigoHTML+='<button onclick="'+opcao3+'" type="button" class="btn btn-outline-primary btn-lg btn-block my-3"><span class="fas fa-save"></span> Salvar</button>'
    document.getElementById('janela2').innerHTML = codigoHTML;

}