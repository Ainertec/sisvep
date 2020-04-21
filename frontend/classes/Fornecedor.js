
///---------------------------------------------------------Tela principal de fornecedor-------------------------------------------------------










//vetor responsavel por guardar temporarialmente os fornecedores buscados
var VETORFORNECEDORCLASSEFORNECEDOR=[];









//funcao responsavel pela autenticacao de usuario no setor fornecedor
function autenticacaoFornecedorFacede(){

    var situacao = autenticacaoLogin();
    VETORFORNECEDORCLASSEFORNECEDOR=[];
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        document.getElementById('janela2').innerHTML = telaFornecedor();
        document.getElementById('dadosDoFornecedor').innerHTML = carregarTelaDadosFornecedor('Atualizar');
    }else{
        mensagemDeErro("Usuário não autorizado!");
    }

}










//funcao reponsavel por gerar a tela de fornecedor
function telaFornecedor(){

    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Fornecedor</h3>'
    

    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<h5 class="text-center">Buscar Fornecedor</h5>'
        codigoHTML+='<div class="input-group mb-3">'
            codigoHTML+='<input id="buscaFornecedor" type="text" class="form-control" placeholder="Nome ou CPF/CNPJ" aria-label="Recipients username" aria-describedby="botaoBuscar">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button onclick="buscarFornecedor();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por CPF/CNPJ</button>'
            codigoHTML+='<button onclick="buscarFornecedor();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
            codigoHTML+='<button onclick="buscarFornecedor();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'


    
    codigoHTML+='<h5 class="text-center">Lista Fronecedores</h5>'
    codigoHTML+='<div class="col-12 layer1" style="position: relative; height: 300px; z-index: 1; overflow: scroll;">'
        codigoHTML+='<div id="listaDeFornecedores" class="list-group">'
        codigoHTML+='</div>'
    codigoHTML+='</div>'


    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<h5 class="text-center">Dados Fornecedor</h5>'
        codigoHTML+='<form>'
            codigoHTML+='<div id="dadosDoFornecedor">'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<button onclick="atualizarFornecedor();" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Salvar</button>'
                codigoHTML+='<button onclick="excluirFornecedor();" type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'

    return codigoHTML;

}










//funcao responsavel pela lista de fornecedores
function carregarListaFornecedor(json, posicao){

    var codigoHTML='', cont=0;

    codigoHTML+='<a onclick="carregarDadosFornecedorSelecionado('+posicao+');" href="#" class="list-group-item list-group-item-action">'
        codigoHTML+='<div class="d-flex w-100 justify-content-between">'
            codigoHTML+='<h5 class="mb-1">Nome: '+json.nome+'</h5>'
            codigoHTML+='<small>CPF/CNPJ: '+json.cpfCnpj+'</small>'
        codigoHTML+='</div>'
        codigoHTML+='<small>Descrição: '+json.descricao+'</small>'
    codigoHTML+='</a>'

    return codigoHTML;
}










//funcao responsavel por carregar os dados do fornecedor
function carregarTelaDadosFornecedor(tipo){
    
    var codigoHTML='';

    if(tipo=='Cadastrar'){
        codigoHTML+='<h5 class="text-center" style="margin-top:40px;">Cadastrar Fornecedor</h5>'
    }

    codigoHTML+='<div class="form-row" style="margin-top:30px;">'
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="nomeFornecedor">Nome:</label>'
            codigoHTML+='<input type="Text" class="form-control" id="nomeFornecedor" placeholder="Nome">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="cpf-cnpjFornecedor">CPF/CNPJ:</label>'
            codigoHTML+='<input type="text" class="form-control" id="cpfCnpjFornecedor" placeholder="CPF ou CNPJ">'
        codigoHTML+='</div>'
    codigoHTML+='</div>'
    codigoHTML+='<div class="form-row">'
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="telefoneFornecedor">Telefone:</label>'
            codigoHTML+='<input type="Text" class="form-control" id="telefoneFornecedor" placeholder="Telefone">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="emailFornecedor">E-mail:</label>'
            codigoHTML+='<input type="email" class="form-control" id="emailFornecedor" placeholder="Email">'
        codigoHTML+='</div>'
    codigoHTML+='</div>'
    codigoHTML+='<div class="form-row">'       
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="descricaoFornecedor">Descrição:</label>'
            codigoHTML+='<textArea type="Text" class="form-control" id="descricaoFornecedor" placeholder="Descrição">'
            codigoHTML+='</textArea>'
        codigoHTML+='</div>'

        if(tipo=='Atualizar'){
            codigoHTML+='<div class="form-group col-md-6">'
                codigoHTML+='<label for="idFornecedor">ID:</label>'
                codigoHTML+='<input type="text" class="form-control" id="idFornecedor" placeholder="ID" disabled>'
            codigoHTML+='</div>'
        }
        
    codigoHTML+='</div>'
    

    return codigoHTML;
}










//funcao responsavel por buscar os fornecedoes da consulta
function buscarFornecedor(){

    VETORFORNECEDORCLASSEFORNECEDOR=[];

    var cont=0;
    var json = '[{"id":"1a2","nome":"fornecedor 1","cpfCnpj":"123.154.364-23","telefone":"(33)52423-1342","email":"fornecedor1@gmail.com","descricao":"hfhasjdhfjsadhfsjahd sdhfjsahdf"}]'

    json = JSON.parse(json);

    document.getElementById('listaDeFornecedores').innerHTML='';
    
    while(json[cont]){
        VETORFORNECEDORCLASSEFORNECEDOR.push(json[cont]);
        $('#listaDeFornecedores').append(carregarListaFornecedor(json[cont], cont));
        cont++;
    }

}










//funcao responsavel por carregar na tela os dados de um fornecedor selecionado
function carregarDadosFornecedorSelecionado(posicao){

    document.getElementById('idFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].id;
    document.getElementById('nomeFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].nome;
    document.getElementById('cpfCnpjFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].cpfCnpj;
    document.getElementById('telefoneFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].telefone;
    document.getElementById('emailFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].email;
    document.getElementById('descricaoFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].descricao;

}









//funcao responsavel por atualizar o fornecedor
function atualizarFornecedor(){

    if(validaDadosCampo(['#idFornecedor','#nomeFornecedor','#cpfCnpjFornecedor','#telefoneFornecedor','#emailFornecedor','#descricaoFornecedor'])){
        var json ='{"id":"'+$('#idFornecedor').val()+'",'
            json+='"nome":"'+$('#nomeFornecedor').val()+'",'
            json+='"cpfCnpj":"'+$('#cpfCnpjFornecedor').val()+'",'
            json+='"telefone":"'+$('#telefoneFornecedor').val()+'",'
            json+='"email":"'+$('#emailFornecedor').val()+'",'
            json+='"descricao":"'+$('#descricaoFornecedor').val()+'"}'
    
        document.getElementById('janela2').innerHTML = json;
    }else{
        mensagemDeErro('Preencha todos os campos!');
    }
}









//funcao responsavel por excluir o fornecedor
function excluirFornecedor(){

    if(validaDadosCampo(['#idFornecedor'])){
        var json = '{"id":"'+$('#idFornecedor').val()+'"}'

        document.getElementById('janela2').innerHTML = json;
    }else{
        mensagemDeErro('Não foi possivel, falta campo ID!');
    }

}