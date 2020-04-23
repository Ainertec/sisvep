
///-------------------------------------------------tela principal funcionario ------------------------------------------------------









//vetor responsavel por guardar os funcionarios selecionados
var VETORDEFUNCIONARIOCLASSEFUNCIONARIO = [];










//funcao responsavel pela autenticacao no setor de funcionario
function autenticacaoFuncionarioFacede(){

    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador'){
        document.getElementById('janela2').innerHTML = telaFuncionario('Admin');
    }else if(JSON.parse(situacao).tipo == 'Comum'){
        document.getElementById('janela2').innerHTML = telaFuncionario('Comum');
        buscarFuncionario('Comum');
    }else{
        mensagemDeErro("Usuário não autorizado!");
    }
    
} 











//funcao responsavel por gerar a tela de funcionario
function telaFuncionario(tipo){
    
    var codigoHTML='';


    if(tipo=='Admin'){
        codigoHTML+='<h3 class="text-center">Funcionário(Administrador)</h3>'

        codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
            codigoHTML+='<h5 class="text-center">Buscar Funcionário</h5>'
            codigoHTML+='<div class="input-group mb-3">'
                codigoHTML+='<input id="buscaProduto" type="text" class="form-control" placeholder="Nome">'
            codigoHTML+='</div>'
            codigoHTML+='<div class="btn-group btn-lg btn-block" role="group">'
                codigoHTML+='<button onclick="buscarFuncionario(\'Administrador\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
                codigoHTML+='<button onclick="buscarFuncionario(\'Administrador\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    }

    if(tipo=='Admin'){
        codigoHTML+='<h5 class="text-center">Lista Funcionários</h5>'
        codigoHTML+='<div class="col-12 layer1" style="position: relative; height: 300px; z-index: 1; overflow: scroll;">'
            codigoHTML+='<div id="listaFuncionarios">'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    }

    codigoHTML+='<h5 class="text-center">Dados Funcionário</h5>'

    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<form>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="id">ID:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="id" placeholder="ID" disabled>'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="nome">Nome:</label>'
                    codigoHTML+='<input type="Text" class="form-control" id="nome" placeholder="Nome">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="login">Login:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="login" placeholder="Login">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="senha">Senha:</label>'
                    codigoHTML+='<input type="password" class="form-control" id="senha" placeholder="Senha">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="tipoFun">Tipo de funcionário:</label>'
                    if(tipo=='Comum'){
                        codigoHTML+='<select class="custom-select mr-sm-6" id="tipoFun" disabled>'
                    }else if(tipo=='Admin'){
                        codigoHTML+='<select class="custom-select mr-sm-6" id="tipoFun">'
                    }
                        codigoHTML+='<option value="Comum">Comum</option>'
                        codigoHTML+='<option value="Administrador">Administrador</option>'
                    codigoHTML+='</select>'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="email">Email:</label>'
                    codigoHTML+='<input type="email" class="form-control" id="email" placeholder="Email@email.com.br">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<button onclick="atualizarFuncionario();" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Atualizar</button>'
                if(tipo=='Admin'){
                    codigoHTML+='<button onclick="cadastrarFuncionario();" type="button" class="btn btn-primary" style="margin: 5px;"><span class="fas fa-save"></span> Cadastrar</button>'
                    codigoHTML+='<button onclick="excluirFuncionario();" type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
                }
            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'

    return codigoHTML;

}











//funcao responsavel por carregar lista com os funcionarios pesquisados
function carregarListaFuncionario(json,posicao){

    var codigoHTML='';

    codigoHTML+='<a onclick="carregarDadosFuncionario('+posicao+');" href="#" class="list-group-item list-group-item-action">'
        codigoHTML+='<div class="d-flex w-100 justify-content-between">'
            codigoHTML+='<h5 class="mb-1">Nome: '+json.nome+'</h5>'
            codigoHTML+='<small>Tipo: '+json.tipofun+'</small>'
        codigoHTML+='</div>'
    codigoHTML+='</a>'


    return codigoHTML;

}










//funcao responsavel por carregar os dados do funcionario selecionado
function carregarDadosFuncionario(posicao){

    document.getElementById('id').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].id;
    document.getElementById('nome').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].nome;
    document.getElementById('login').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].login;
    document.getElementById('senha').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].senha;
    document.getElementById('tipoFun').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].tipofun;
    document.getElementById('email').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].email;

}










//funcao responsavel por buscar os funcionarios
function buscarFuncionario(tipo){

    VETORDEFUNCIONARIOCLASSEFUNCIONARIO=[];

    if(tipo=='Administrador'){

        var json = '[{"id":"1a2","nome":"Funcionario 1","login":"fun 1","senha":"123","tipofun":"Administrador","email":"fun1@gmail.com"},{"id":"2b3","nome":"Funcionario 2","login":"fun 2","senha":"123","tipofun":"Comum","email":"fun2@gmail.com"}]', cont=0;

        json = JSON.parse(json);

        document.getElementById('listaFuncionarios').innerHTML='';

        while(json[0]){
            VETORDEFUNCIONARIOCLASSEFUNCIONARIO.push(json[cont]);
            $('#listaFuncionarios').append(carregarListaFuncionario(json[cont],cont));
            cont++;
        }

    }else if(tipo=='Comum'){
        
        var json = '{"id":"3c4","nome":"Funcionario 3","login":"fun 3","senha":"123","tipofun":"Comum","email":"fun3@gmail.com"}'

        json = JSON.parse(json);

        VETORDEFUNCIONARIOCLASSEFUNCIONARIO.push(json);
        carregarDadosFuncionario(0);

    }
}










//funcao responsavel por cadastrar funcionario
function cadastrarFuncionario(){

    if(validaDadosCampo(['#nome','#login','#senha','#tipofun','#email'])){
        
        var json='{"nome":"'+$('#nome').val()+'",'
                json+='"login":"'+$('#login').val()+'",'
                json+='"senha":"'+$('#senha').val()+'",'
                json+='"tipofun":"'+$('#tipoFun').val()+'",'
                json+='"email":"'+$('#email').val()+'"}'
        
        document.getElementById('janela2').innerHTML = json;

    }else{
        mensagemDeErro('Preencha todos os campos!');
    }

}










//funcao responsavel por atualizar funcionario
function atualizarFuncionario(){
    
    if(validaDadosCampo(['#id','#nome','#login','#senha','#tipofun','#email'])){
        
        var json='{"id":"'+$('#id').val()+'",'
                json+='"nome":"'+$('#nome').val()+'",'
                json+='"login":"'+$('#login').val()+'",'
                json+='"senha":"'+$('#senha').val()+'",'
                json+='"tipofun":"'+$('#tipoFun').val()+'",'
                json+='"email":"'+$('#email').val()+'"}'
        
        document.getElementById('janela2').innerHTML = json;

    }else{
        mensagemDeErro('Preencha todos os campos!');
    }

}










//funcao responsavel por excluir o funcionario
function excluirFuncionario(){
    
    if(validaDadosCampo(['#id'])){
        
        var json = '{"id":"'+$('#id').val()+'"}'
        document.getElementById('janela2').innerHTML = json;

    }else{
        mensagemDeErro('Não foi possivel, falta de ID!');
    }

}