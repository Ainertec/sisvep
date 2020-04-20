

///-----------------------------------------------------tela principal de produto----------------------------------------------------------










var JSONPRODUTOCLASSEPRODUTO=[];










//funcao responsavel pela autenticacao de usuario no setor produto
function autenticacaoProduto(tipo){

    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        if(tipo=='Cadastrar'){
            document.getElementById('janela2').innerHTML = telaProduto(tipo);
        }else if(tipo=='Atualizar'){
            document.getElementById('janela2').innerHTML = telaBuscarProduto();
        }
    }else{
        mensagemDeErro("Usuário não autorizado!");
    }

}










//funcao reponsavel por gerar a tela de produto
function telaProduto(tipo){
     var codigoHTML='';

    if(tipo=='Atualizar'){
        codigoHTML+='<h3 class="text-center">Atualizar Produto</h3>'
    }else if(tipo=='Cadastrar'){
        codigoHTML+='<h3 class="text-center">Cadastrar Produto</h3>'
    }
    
    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<form>'
            codigoHTML+='<div class="form-row">'
                
                if(tipo=='Atualizar'){
                    codigoHTML+='<div class="form-group col-md-6">'
                        codigoHTML+='<label for="id">ID:</label>'
                        codigoHTML+='<input type="text" class="form-control" id="id" placeholder="ID" disabled>'
                    codigoHTML+='</div>'
                }

                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="barcode">Código de barras:</label>'
                    codigoHTML+='<input type="Number" class="form-control" id="barcode" placeholder="Código de barras">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="nome">Nome:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="nome" placeholder="Nome do produto">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="valorUni">Valor unidade:</label>'
                    codigoHTML+='<input type="Number" class="form-control" id="valorUni" placeholder="Valor da unidade">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="valorCus">Valor Custo:</label>'
                    codigoHTML+='<input type="Number" class="form-control" id="valorCus" placeholder="Valor de custo">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="dataValidade">Data validade:</label>' 
                    codigoHTML+='<input type="date" class="form-control" id="dataValidade">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="dataChegada">Data de chegada:</label>'
                    codigoHTML+='<input type="date" class="form-control" id="dataChegada">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="qtdEstoque">Quantidade estoque:</label>'
                    codigoHTML+='<input type="Number" class="form-control" id="qtdEstoque" placeholder="Quantidade em estoque">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="listaFornecedor">Lista de fornecedores:</label>'
                    codigoHTML+='<select class="custom-select mr-sm-6" id="listaFornecedor">'
                        codigoHTML+='<option value="1">Fornecedor 1</option>'
                        codigoHTML+='<option value="2">Fornecedor 2</option>'
                        codigoHTML+='<option value="3">Fornecedor 3</option>'
                    codigoHTML+='</select>'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="descricao">Descrição:</label>'
                    codigoHTML+='<textArea type="text" class="form-control" id="descricao" placeholder="Descrição do produto">'
                    codigoHTML+='</textArea>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'

            codigoHTML+='<div id="dadosDoFornecedor">'
            codigoHTML+='</div>'
            
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<button onclick="document.getElementById(\'dadosDoFornecedor\').innerHTML = carregarTelaDadosFornecedor(\'Cadastrar\'); " type="button" class="btn btn-warning" style="margin: 5px;"><span class="fas fa-people-carry"></span> Cadastrar Fornecedor</button>'    
                
                if(tipo=='Atualizar'){
                    codigoHTML+='<button onclick="atualizarProduto();" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Salvar</button>'
                    codigoHTML+='<button onclick="excluirProduto();" type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
                }else if(tipo=='Cadastrar'){
                    codigoHTML+='<button onclick="cadastrarProduto();" type="button" class="btn btn-primary" style="margin: 5px;"><span class="fas fa-save"></span> Salvar</button>'
                }

            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'


     return codigoHTML;

}










//funcao reponsavel por gerar a tela de busca com atualizacao e delete
function telaBuscarProduto(){

    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Produto</h3>'
    

    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<h5 class="text-center">Buscar Produto</h5>'
        codigoHTML+='<div class="input-group mb-3">'
            codigoHTML+='<input id="buscaProduto" type="text" class="form-control" placeholder="Nome ou código de barras">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="input-group mb-3">'
            codigoHTML+='<input id="buscaProdutoDate" type="date" class="form-control">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button onclick="buscarProduto();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Código de barras</button>'
            codigoHTML+='<button onclick="buscarProduto();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
            codigoHTML+='<button onclick="buscarProduto();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button onclick="buscarProduto();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Data de validade</button>'
            codigoHTML+='<button onclick="buscarProduto();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Data de inclusão</button>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'


    codigoHTML+='<h5 class="text-center">Lista de Produtos</h5>'
    codigoHTML+='<div class="col-12 layer1" style="position: relative; height: 300px; z-index: 1; overflow: scroll;">'
        codigoHTML+='<div id="listaDeProdutos" class="list-group">'
        codigoHTML+='</div>'
    codigoHTML+='</div>'


    codigoHTML+='<h5 class="text-center">Dados Produto</h5>'
    codigoHTML+='<div id="dadosDoProduto">'
    
    codigoHTML+='</div>'

    return codigoHTML;

}










//funcao responsavel pela lista de produtos
function carregarListaProdutos(json, posicao){

    var codigoHTML='';

    codigoHTML+='<a href="#" onclick="carregarCamposComDadosProduto('+posicao+');" class="list-group-item list-group-item-action">'
        codigoHTML+='<div class="d-flex w-100 justify-content-between">'
            codigoHTML+='<h5 class="mb-1">Nome: '+json.nome+'</h5>'
            codigoHTML+='<small>Código de barras: '+json.codigo+'</small>'
        codigoHTML+='</div>'
        codigoHTML+='<small>Descrição: '+json.descricao+'</small>'
    codigoHTML+='</a>'

    return codigoHTML;
}










//funcao responsavel por carregar os dados do produto selecionado na lista
function carregarCamposComDadosProduto(posicao){

    document.getElementById('dadosDoProduto').innerHTML = telaProduto('Atualizar');

    setTimeout(function(){
        document.getElementById('id').value = JSONPRODUTOCLASSEPRODUTO[posicao].id;
        document.getElementById('barcode').value = JSONPRODUTOCLASSEPRODUTO[posicao].codigo;
        document.getElementById('nome').value = JSONPRODUTOCLASSEPRODUTO[posicao].nome;
        //document.getElementById('valorUni').value =
        //document.getElementById('valorCus').value =
        //document.getElementById('dataValidade').value =
        //document.getElementById('dataChegada').value =
        //document.getElementById('qtdEstoque').value =
        //document.getElementById('listaFornecedor').value = 
        document.getElementById('descricao').value = JSONPRODUTOCLASSEPRODUTO[posicao].descricao;
    },1000);

}










//function responsavel por cadastrar produto
function cadastrarProduto(){

    if(document.getElementById('nomeFornecedor') != null && validaDadosCampo(['#nomeFornecedor'])){

        if(validaDadosCampo(['#barcode','#nome','#valorUni','#valorCus','#dataValidade','#dataChegada','#qtdEstoque','#nomeFornecedor','#cpfCnpjFornecedor','#telefoneFornecedor','#emailFornecedor'])){

            var json = '{"codigo":"'+$('#barcode').val()+'",'
                    json +='"nome":"'+$('#nome').val()+'",'
                    json +='"valorUnit":'+$('#valorUni').val()+','
                    json +='"valorCust":'+$('#valorCus').val()+','
                    json +='"dataValidade":"'+$('#dataValidade').val()+'",'
                    json +='"dataChegada":"'+$('#dataChegada').val()+'",'
                    json +='"quantidadeEstoque":'+$('#qtdEstoque').val()+','
                    json +='"descricao":"'+$('#descricao').val()+'",'
                    json +='"nomeFornecedor":"'+$('#nomeFornecedor').val()+'",'
                    json +='"cpfCnpjFornecedor":"'+$('#cpf-cnpjFornecedor').val()+'",'
                    json +='"telefoneFornecedor":"'+$('#telefoneFornecedor').val()+'",'
                    json +='"descricaoFornecedor":"'+$('#descricaoFornecedor').val()+'",'
                    json +='"emailFornecedor":"'+$('#emailFornecedor').val()+'"}'

            document.getElementById('janela2').innerHTML = json;

            json = JSON.parse(json);

            mensagemDeAviso('Cadastrado com sucesso!');
        
        }else{
            mensagemDeErro('Preencha todos os campos!');
        }

    }else{

        if(validaDadosCampo(['#barcode','#nome','#valorUni','#valorCus','#dataValidade','#dataChegada','#qtdEstoque','#listaFornecedor'])){

            var json = '{"codigo":"'+$('#barcode').val()+'",'
                    json +='"nome":"'+$('#nome').val()+'",'
                    json +='"valorUnit":'+$('#valorUni').val()+','
                    json +='"valorCust":'+$('#valorCus').val()+','
                    json +='"dataValidade":"'+$('#dataValidade').val()+'",'
                    json +='"dataChegada":"'+$('#dataChegada').val()+'",'
                    json +='"quantidadeEstoque":'+$('#qtdEstoque').val()+','
                    json +='"descricao":"'+$('#descricao').val()+'",'
                    json +='"fornecedor":"'+$('#listaFornecedor').val()+'"}'

            document.getElementById('janela2').innerHTML = json;
            
            json = JSON.parse(json);

            mensagemDeAviso('Cadastrado com sucesso!');
        
        }else{
            mensagemDeErro('Preencha todos os campos!');
        }

    }


    setTimeout(function(){autenticacaoProduto('Cadastrar')},1000);
}










//funcao responsavel por buscar os produtos e enviar para a lista
function buscarProduto(){

    var cont=0;

    var json = '[{"id":"1a2", "nome":"produto 1", "codigo":123, "descricao":"fsjkdjfks"},{"id":"2b3","nome":"produto 2", "codigo":234, "descricao":"fsjkdjfks"},{"id":"3c4","nome":"produto 3", "codigo":345, "descricao":"fsjkdjfks"}]'

    json = JSON.parse(json);


    JSONPRODUTOCLASSEPRODUTO=[];


    while(json[cont]){
        
        JSONPRODUTOCLASSEPRODUTO.push(json[cont]);
        $('#listaDeProdutos').append(carregarListaProdutos(json[cont], cont));

        cont++;
    }
    
}










//funcao responsavel por atualizar produto
function atualizarProduto(){
    
    if(document.getElementById('nomeFornecedor') != null && validaDadosCampo(['#nomeFornecedor'])){

        if(validaDadosCampo(['#id','#barcode','#nome','#valorUni','#valorCus','#dataValidade','#dataChegada','#qtdEstoque','#nomeFornecedor','#cpfCnpjFornecedor','#telefoneFornecedor','#emailFornecedor'])){

            var json = '{"codigo":"'+$('#barcode').val()+'",'
                    json +='"nome":"'+$('#nome').val()+'",'
                    json +='"valorUnit":'+$('#valorUni').val()+','
                    json +='"valorCust":'+$('#valorCus').val()+','
                    json +='"dataValidade":"'+$('#dataValidade').val()+'",'
                    json +='"dataChegada":"'+$('#dataChegada').val()+'",'
                    json +='"quantidadeEstoque":'+$('#qtdEstoque').val()+','
                    if(validaDadosCampo(['#descricao'])){
                        json +='"descricao":"'+$('#descricao').val()+'",'
                    }else{
                        json +='"descricao":"" ,'
                    }
                    json +='"nomeFornecedor":"'+$('#nomeFornecedor').val()+'",'
                    json +='"cpfCnpjFornecedor":"'+$('#cpf-cnpjFornecedor').val()+'",'
                    json +='"telefoneFornecedor":"'+$('#telefoneFornecedor').val()+'",'
                    if(validaDadosCampo(['#descricaoFornecedor'])){
                        json +='"descricaoFornecedor":"'+$('#descricaoFornecedor').val()+'",'
                    }else{
                        json +='"descricaoFornecedor":" ",'
                    }
                    json +='"emailFornecedor":"'+$('#emailFornecedor').val()+'"}'

            document.getElementById('janela2').innerHTML = 'Atualizacao id: '+$('#id').val()+' - json: '+json;

            json = JSON.parse(json);

            mensagemDeAviso('Atualizado com sucesso!');
        
        }else{
            mensagemDeErro('Preencha todos os campos!');
        }

    }else{

        if(validaDadosCampo(['#id','#barcode','#nome','#valorUni','#valorCus','#dataValidade','#dataChegada','#qtdEstoque','#listaFornecedor'])){

            var json = '{"codigo":"'+$('#barcode').val()+'",'
                    json +='"nome":"'+$('#nome').val()+'",'
                    json +='"valorUnit":'+$('#valorUni').val()+','
                    json +='"valorCust":'+$('#valorCus').val()+','
                    json +='"dataValidade":"'+$('#dataValidade').val()+'",'
                    json +='"dataChegada":"'+$('#dataChegada').val()+'",'
                    json +='"quantidadeEstoque":'+$('#qtdEstoque').val()+','
                    if(validaDadosCampo(['#descricao'])){
                        json +='"descricao":"'+$('#descricao').val()+'",'
                    }else{
                        json +='"descricao":"" ,'
                    }
                    json +='"fornecedor":"'+$('#listaFornecedor').val()+'"}'

            
            document.getElementById('janela2').innerHTML = 'Atualizacao id: '+$('#id').val()+' - json: '+json;
            
            json = JSON.parse(json);

            mensagemDeAviso('Atualizado com sucesso!');
        
        }else{
            mensagemDeErro('Preencha todos os campos!');
        }

    }


    setTimeout(function(){autenticacaoProduto('Atualizar')},1000);
}










//funcao responsavel por apagar um produto
function excluirProduto(){

    if(validaDadosCampo(['#id'])){
        var json = '{"id":"'+$('#id').val()+'"}';

        document.getElementById('janela2').innerHTML = 'Produto excluido id: '+json;
    }else{
        mensagemDeErro('Não é possivel, falta de ID!');
    }

}