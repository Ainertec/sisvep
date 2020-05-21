
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
        atalhoTeclaFornecedor();
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
            codigoHTML+='<input id="buscaFornecedor" type="text" class="form-control mousetrap" placeholder="Nome" aria-label="Recipients username" aria-describedby="botaoBuscar">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button onclick="buscarFornecedor(\'nome\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
            codigoHTML+='<button onclick="buscarFornecedor(\'todos\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
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

    var codigoHTML='';

    codigoHTML+='<a onclick="carregarDadosFornecedorSelecionado('+posicao+');" href="#" class="list-group-item list-group-item-action">'
        codigoHTML+='<div class="d-flex w-100 justify-content-between">'
            codigoHTML+='<h5 class="mb-1">Nome: '+json.name+'</h5>'
            codigoHTML+='<small>CPF/CNPJ: '+json.identification+'</small>'
        codigoHTML+='</div>'
        codigoHTML+='<small>Descrição: '+json.description+'</small>'
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
            codigoHTML+='<input type="Text" class="form-control mousetrap" id="nomeFornecedor" placeholder="Nome">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="cpfCnpjFornecedor">CPF/CNPJ:</label>'
            codigoHTML+='<input type="text" class="form-control mousetrap" id="cpfCnpjFornecedor" placeholder="CPF ou CNPJ">'
        codigoHTML+='</div>'
    codigoHTML+='</div>'
    codigoHTML+='<div class="form-row">'
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="telefoneFornecedor">Telefone:</label>'
            codigoHTML+='<input type="Text" class="form-control mousetrap" id="telefoneFornecedor" placeholder="Telefone">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="emailFornecedor">E-mail:</label>'
            codigoHTML+='<input type="email" class="form-control mousetrap" id="emailFornecedor" placeholder="Email" value="Inexistente">'
        codigoHTML+='</div>'
    codigoHTML+='</div>'
    codigoHTML+='<div class="form-row">'       
        codigoHTML+='<div class="form-group col-md-6">'
            codigoHTML+='<label for="descricaoFornecedor">Descrição:</label>'
            codigoHTML+='<textArea type="Text" class="form-control" id="descricaoFornecedor" placeholder="Descrição">Nenhuma.'
            codigoHTML+='</textArea>'
        codigoHTML+='</div>'

        if(tipo=='Atualizar'){
            codigoHTML+='<div class="form-group col-md-6">'
                codigoHTML+='<label for="idFornecedor">ID:</label>'
                codigoHTML+='<input type="text" class="form-control mousetrap" id="idFornecedor" placeholder="ID" disabled>'
            codigoHTML+='</div>'
        }
        
    codigoHTML+='</div>'
    

    return codigoHTML;
}










//funcao responsavel por buscar os fornecedoes da consulta
async function buscarFornecedor(tipo){

    VETORFORNECEDORCLASSEFORNECEDOR=[];
    document.getElementById('listaDeFornecedores').innerHTML='';
    var cont=0;

    if(tipo=='nome'){
        var json = await requisicaoGET('providers_by_name?name='+document.getElementById('buscaFornecedor').value, {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});
    }else if(tipo=='todos'){
        var json = await requisicaoGET('providers', {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});
    }
    
    while(json.data[cont]){
        VETORFORNECEDORCLASSEFORNECEDOR.push(json.data[cont]);
        $('#listaDeFornecedores').append(carregarListaFornecedor(json.data[cont], cont));
        cont++;
    }

}










//funcao responsavel por carregar na tela os dados de um fornecedor selecionado
function carregarDadosFornecedorSelecionado(posicao){

    document.getElementById('idFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao]._id;
    document.getElementById('nomeFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].name;
    document.getElementById('cpfCnpjFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].identification;
    document.getElementById('telefoneFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].phone;
    document.getElementById('emailFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].email;
    document.getElementById('descricaoFornecedor').value = VETORFORNECEDORCLASSEFORNECEDOR[posicao].description;

}









//funcao responsavel por atualizar o fornecedor
async function atualizarFornecedor(posicao){

    if(validaDadosCampo(['#idFornecedor','#nomeFornecedor','#cpfCnpjFornecedor','#telefoneFornecedor','#emailFornecedor','#descricaoFornecedor'])){
       
        try {
            VETORFORNECEDORCLASSEFORNECEDOR[posicao].name = ($('#nomeFornecedor').val()).toString();
            VETORFORNECEDORCLASSEFORNECEDOR[posicao].description = ($('#descricaoFornecedor').val()).toString();
            VETORFORNECEDORCLASSEFORNECEDOR[posicao].identification = ($('#cpfCnpjFornecedor').val()).toString();
            VETORFORNECEDORCLASSEFORNECEDOR[posicao].phone = ($('#telefoneFornecedor').val()).toString();
            VETORFORNECEDORCLASSEFORNECEDOR[posicao].email = ($('#emailFornecedor').val()).toString();

            await requisicaoPUT('providers?id='+$('#idFornecedor').val(), VETORFORNECEDORCLASSEFORNECEDOR[posicao], {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}})
            mensagemDeAviso('Atualizado com sucesso!');

        } catch (error) {
            mensagemDeErro('Não foi possível atualizar! Erro: '+error);
        }
        
    }else{
        mensagemDeErro('Preencha todos os campos!');
    }
}









//funcao responsavel por excluir o fornecedor
async function excluirFornecedor(){

    if(validaDadosCampo(['#idFornecedor'])){
        await requisicaoDELETE('providers/'+$('#idFornecedor').val(), '', {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});
    }else{
        mensagemDeErro('Não foi possivel, falta campo ID!');
    }

}