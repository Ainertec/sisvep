
///---------------------------------------------------------Tela principal de fornecedor-------------------------------------------------------










//funcao responsavel pela autenticacao de usuario no setor fornecedor
function autenticacaoFornecedorFacede(){

    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        document.getElementById('janela2').innerHTML = telaFornecedor();
        document.getElementById('listaDeFornecedores').innerHTML = carregarListaFornecedor();
        document.getElementById('dadosDoFornecedor').innerHTML = carregarDadosFornecedor('Atualizar');
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
            codigoHTML+='<button type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por CPF/CNPJ</button>'
            codigoHTML+='<button type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
            codigoHTML+='<button type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
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
                codigoHTML+='<button type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Salvar</button>'
                codigoHTML+='<button type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'

    return codigoHTML;

}










//funcao responsavel pela lista de fornecedores
function carregarListaFornecedor(){

    var codigoHTML='';

    for(var cont=0; cont<10; cont++){
        codigoHTML+='<a href="#" class="list-group-item list-group-item-action">'
            codigoHTML+='<div class="d-flex w-100 justify-content-between">'
                codigoHTML+='<h5 class="mb-1">Nome: </h5>'
                codigoHTML+='<small>CPF/CNPJ: </small>'
            codigoHTML+='</div>'
            codigoHTML+='<small>Descrição: </small>'
        codigoHTML+='</a>'
    }

    return codigoHTML;
}










//funcao responsavel por carregar os dados do fornecedor
function carregarDadosFornecedor(tipo){
    
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
            codigoHTML+='<input type="text" class="form-control" id="cpf-cnpjFornecedor" placeholder="CPF ou CNPJ">'
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
                codigoHTML+='<input type="Number" class="form-control" id="idFornecedor" placeholder="ID" disabled>'
            codigoHTML+='</div>'
        }
        
    codigoHTML+='</div>'
    

    return codigoHTML;
}