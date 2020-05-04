
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
                codigoHTML+='<input id="buscaFuncionarioByName" type="text" class="form-control" placeholder="Nome">'
            codigoHTML+='</div>'
            codigoHTML+='<div class="btn-group btn-lg btn-block" role="group">'
                codigoHTML+='<button onclick="buscarFuncionario(\'Administrador\',\'nome\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
                codigoHTML+='<button onclick="buscarFuncionario(\'Administrador\',\'todos\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
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
                    codigoHTML+='<label for="login">Login:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="login" placeholder="Login">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="senha">Senha:</label>'
                    codigoHTML+='<input type="password" class="form-control" id="senha" placeholder="Senha">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="question">Pergunta recuperação de senha:</label>'
                        codigoHTML+='<select class="custom-select mr-sm-6" id="question">'
                        codigoHTML+='<option value="Qual o modelo do seu primeiro carro?">Qual o modelo do seu primeiro carro?</option>'
                        codigoHTML+='<option value="Qual o nome do seu melhor amigo de infância?">Qual o nome do seu melhor amigo de infância?</option>'
                        codigoHTML+='<option value="Qual o nome do seu primeiro animal de estimação?">Qual o nome do seu primeiro animal de estimação?</option>'
                        codigoHTML+='<option value="Qual o nome da sua mãe?">Qual o nome da sua mãe?</option>'
                        codigoHTML+='<option value="Qual sua cor preferida?">Qual sua cor preferida?</option>'
                    codigoHTML+='</select>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="senha">Resposta pergunta:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="response" placeholder="Resposta">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="tipoFun">Tipo de funcionário:</label>'
                    if(tipo=='Comum'){
                        codigoHTML+='<select class="custom-select mr-sm-6" id="tipoFun" disabled>'
                    }else if(tipo=='Admin'){
                        codigoHTML+='<select class="custom-select mr-sm-6" id="tipoFun">'
                    }
                        codigoHTML+='<option value=false>Comum</option>'
                        codigoHTML+='<option value=true>Administrador</option>'
                    codigoHTML+='</select>'
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
            codigoHTML+='<h5 class="mb-1">Nome: '+json.name+'</h5>'
            if(json.admin){
                codigoHTML+='<small>Tipo: Administrador</small>'
            }else{
                codigoHTML+='<small>Tipo: Comum</small>'
            }
            
        codigoHTML+='</div>'
    codigoHTML+='</a>'


    return codigoHTML;

}










//funcao responsavel por carregar os dados do funcionario selecionado
function carregarDadosFuncionario(posicao){

    document.getElementById('id').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao]._id;
    document.getElementById('login').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].name;
    document.getElementById('question').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].question;
    document.getElementById('tipoFun').value = VETORDEFUNCIONARIOCLASSEFUNCIONARIO[posicao].admin;

}










//funcao responsavel por buscar os funcionarios
async function buscarFuncionario(tipo,busca){

    VETORDEFUNCIONARIOCLASSEFUNCIONARIO=[];

    if(tipo=='Administrador'){

        var cont=0;
        
        if(busca == 'nome'){
            var user = JSON.parse(sessionStorage.getItem('login')),
            json = await requisicaoGET('users_by_name?name='+document.getElementById('buscaFuncionarioByName').value, {headers:{Authorization:`Bearer ${user.token}`}});
        }else if(busca == 'todos'){
            var user = JSON.parse(sessionStorage.getItem('login')),
            json = await requisicaoGET('users', {headers:{Authorization:`Bearer ${user.token}`}});
        }

        document.getElementById('listaFuncionarios').innerHTML='';

        while(json.data[cont]){
            VETORDEFUNCIONARIOCLASSEFUNCIONARIO.push(json.data[cont]);
            $('#listaFuncionarios').append(carregarListaFuncionario(json.data[cont],cont));
            cont++;
        }

    }else if(tipo=='Comum'){
        
        var user = JSON.parse(sessionStorage.getItem('login')),
        json = '{"_id":"'+user._id+'","name":"'+user.nome+'","question":"'+user.question+'","admin":false}'

        json = JSON.parse(json);

        VETORDEFUNCIONARIOCLASSEFUNCIONARIO.push(json);
        carregarDadosFuncionario(0);
    }
}










//funcao responsavel por cadastrar funcionario
async function cadastrarFuncionario(){

    if(validaDadosCampo(['#login','#senha','#response'])){
        
        var json='{"name":"'+$('#login').val()+'",'
                json+='"password":"'+$('#senha').val()+'",'
                json+='"question":"'+$('#question').val()+'",'
                json+='"response":"'+$('#response').val()+'",'
                json+='"admin":'+$('#tipoFun').val()+'}'
        
        try {
            var user = JSON.parse(sessionStorage.getItem('login'));
            await requisicaoPOST('users', JSON.parse(json), {headers:{Authorization:`Bearer ${user.token}`}});
            mensagemDeAviso("Cadastrado com sucesso!");
            autenticacaoFuncionarioFacede();
        } catch (error) {
            mensagemDeErro("Não foi possível efetuar o cadastro! Erro: "+error);
        }
        
    }else{
        mensagemDeErro('Preencha todos os campos!');
    }

}










//funcao responsavel por atualizar funcionario
async function atualizarFuncionario(){
    
    if(validaDadosCampo(['#id','#login','#senha','#response'])){
        
        var json='{"name":"'+$('#login').val()+'",'
                json+='"password":"'+$('#senha').val()+'",'
                json+='"question":"'+$('#question').val()+'",'
                json+='"response":"'+$('#response').val()+'",'
                json+='"admin":'+$('#tipoFun').val()+'}'
        
        try {
            var user = JSON.parse(sessionStorage.getItem('login'));
            await requisicaoPUT('users?id='+document.getElementById('id').value, JSON.parse(json), {headers:{Authorization:`Bearer ${user.token}`}});
            mensagemDeAviso('Atualizado com sucesso!');
            autenticacaoFuncionarioFacede();
        } catch (error) {
            mensagemDeErro('Não foi possível atualizar! Erro: '+error);
        }

    }else{
        mensagemDeErro('Preencha todos os campos!');
    }

}










//funcao responsavel por excluir o funcionario
async function excluirFuncionario(){
    
    if(validaDadosCampo(['#id'])){

        try {
            var user = JSON.parse(sessionStorage.getItem('login'));
            await requisicaoDELETE('users/'+$('#id').val(), '', {headers:{Authorization:`Bearer ${user.token}`}})
            mensagemDeAviso('Excluido com sucesso!');
            autenticacaoFuncionarioFacede();
        } catch (error) {
            mensagemDeErro('Não foi possível excluir! Erro: '+error);   
        }

    }else{
        mensagemDeErro('Não foi possível excluir, falta de ID!');
    }

}