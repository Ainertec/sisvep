

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
                    codigoHTML+='<label for="qtdEstoque">Quantidade estoque:</label>'
                    codigoHTML+='<input type="Number" class="form-control" id="qtdEstoque" placeholder="Quantidade em estoque">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="listaFornecedor">Lista de fornecedores:</label>'
                    codigoHTML+='<select class="custom-select mr-sm-6" id="listaFornecedor">'
                        codigoHTML+='<option value="1">Fornecedor 1</option>'
                        codigoHTML+='<option value="2">Fornecedor 2</option>'
                        codigoHTML+='<option value="3">Fornecedor 3</option>'
                    codigoHTML+='</select>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
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
            codigoHTML+='<input id="buscaProdutoDate" type="month" class="form-control">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button onclick="buscarProduto(\'codigo\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Código de barras</button>'
            codigoHTML+='<button onclick="buscarProduto(\'nome\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
            codigoHTML+='<button onclick="buscarProduto(\'todos\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button onclick="buscarProduto(\'dataValidade\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Data de validade</button>'
            codigoHTML+='<button onclick="buscarProduto(\'dataChegada\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Data de inclusão</button>'
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
            codigoHTML+='<h5 class="mb-1">Nome: '+json.name+'</h5>'
            codigoHTML+='<small>Código de barras: '+json.barcode+'</small>'
        codigoHTML+='</div>'
        codigoHTML+='<small>Descrição: '+json.description+'</small>'
    codigoHTML+='</a>'

    return codigoHTML;
}










//funcao responsavel por carregar os dados do produto selecionado na lista
function carregarCamposComDadosProduto(posicao){

    document.getElementById('dadosDoProduto').innerHTML = telaProduto('Atualizar');

    setTimeout(function(){
        document.getElementById('id').value = JSONPRODUTOCLASSEPRODUTO[posicao]._id;
        document.getElementById('barcode').value = JSONPRODUTOCLASSEPRODUTO[posicao].barcode;
        document.getElementById('nome').value = JSONPRODUTOCLASSEPRODUTO[posicao].name;
        document.getElementById('valorUni').value = JSONPRODUTOCLASSEPRODUTO[posicao].price;
        document.getElementById('valorCus').value = JSONPRODUTOCLASSEPRODUTO[posicao].cost;
        var data = (JSONPRODUTOCLASSEPRODUTO[posicao].validity).split("T");
        document.getElementById('dataValidade').value = data[0];
        //document.getElementById('dataChegada').value = JSONPRODUTOCLASSEPRODUTO[posicao].
        document.getElementById('qtdEstoque').value = JSONPRODUTOCLASSEPRODUTO[posicao].stock;
        //document.getElementById('listaFornecedor').value = JSONPRODUTOCLASSEPRODUTO[posicao].
        document.getElementById('descricao').value = JSONPRODUTOCLASSEPRODUTO[posicao].description;
    },1000);

}










//function responsavel por cadastrar produto
async function cadastrarProduto(){

    var user = JSON.parse(sessionStorage.getItem('login'));

    if(document.getElementById('nomeFornecedor') != null && validaDadosCampo(['#nomeFornecedor'])){

        if(validaDadosCampo(['#barcode','#nome','#valorUni','#valorCus','#dataValidade','#qtdEstoque','#nomeFornecedor','#cpfCnpjFornecedor','#telefoneFornecedor','#emailFornecedor'])){

            try {
                
                var jsonProduto = '{"barcode":"'+$('#barcode').val()+'",'
                        jsonProduto +='"name":"'+$('#nome').val()+'",'
                        jsonProduto +='"price":'+$('#valorUni').val()+','
                        jsonProduto +='"cost":'+$('#valorCus').val()+','
                        var data = (document.getElementById('dataValidade').value).split("-");
                        jsonProduto +='"validity":"'+new Date(data[0],data[1]-1,data[2]).toISOString()+'",'
                        jsonProduto +='"stock":'+$('#qtdEstoque').val()+','
                        jsonProduto +='"description":"'+$('#descricao').val()+'"}'
                    

                    var result = await requisicaoPOST('products', JSON.parse(jsonProduto), {headers:{Authorization:`Bearer ${user.token}`}});

                setTimeout(async function(){

                    alert(result.data._id);

                    var jsonFornecedor = '{"name":"'+$('#nomeFornecedor').val()+'",'
                            jsonFornecedor +='"identification":"'+$('#cpfCnpjFornecedor').val()+'",'
                            jsonFornecedor +='"phone":"'+$('#telefoneFornecedor').val()+'",'
                            jsonFornecedor +='"description":"'+$('#descricaoFornecedor').val()+'",'
                            jsonFornecedor +='"products":["'+result.data._id+'"],'
                            jsonFornecedor +='"email":"'+$('#emailFornecedor').val()+'"}'
                
                            alert(jsonFornecedor);

                        await requisicaoPOST('providers', JSON.parse(jsonFornecedor), {headers:{Authorization:`Bearer ${user.token}`}});

                    mensagemDeAviso('Cadastrado com sucesso!');

                }, 1000);
            
            } catch (error) {
                mensagemDeErro('Não foi possível cadastrar o produto! Erro: '+error);
            }
            
        }else{
            mensagemDeErro('Preencha todos os campos!');
        }

    }else{

        if(validaDadosCampo(['#barcode','#nome','#valorUni','#valorCus','#dataValidade','#qtdEstoque','#listaFornecedor'])){

            try {
                var json = '{"barcode":"'+$('#barcode').val()+'",'  
                        json +='"name":"'+$('#nome').val()+'",'
                        json +='"price":'+$('#valorUni').val()+',' 
                        json +='"cost":'+$('#valorCus').val()+','
                        var data = (document.getElementById('dataValidade').value).split("-");
                        json +='"validity":"'+new Date(data[0],data[1]-1,data[2]).toISOString()+'",'
                        json +='"stock":'+$('#qtdEstoque').val()+','
                        json +='"description":"'+$('#descricao').val()+'",'
                        json +='"providerId":"'+$('#listaFornecedor').val()+'"}'

                    await requisicaoPOST('providers', JSON.parse(json), {headers:{Authorization:`Bearer ${user.token}`}})

                mensagemDeAviso('Cadastrado com sucesso!');   
    
            } catch (error) {
                mensagemDeErro('Não foi possível cadastrar o produto! Erro: '+error);
            }
        
        }else{
            mensagemDeErro('Preencha todos os campos!');
        }

    }


    setTimeout(function(){autenticacaoProduto('Cadastrar')},1000);
}



                            






//funcao responsavel por buscar os produtos e enviar para a lista
async function buscarProduto(tipo){

    var cont=0;
    var user = JSON.parse(sessionStorage.getItem('login'));
    document.getElementById('listaDeProdutos').innerHTML='';

    if(tipo=='codigo'){

        var json = await requisicaoGET('products_barcode?barcode='+$('#buscaProduto').val(), {headers:{Authorization:`Bearer ${user.token}`}})
        JSONPRODUTOCLASSEPRODUTO=[];
        JSONPRODUTOCLASSEPRODUTO.push(json.data);
        $('#listaDeProdutos').append(carregarListaProdutos(json.data, 0));

    }else if(tipo=='nome'){
    
        var json = await requisicaoGET('products?name='+$('#buscaProduto').val(), {headers:{Authorization:`Bearer ${user.token}`}})
        JSONPRODUTOCLASSEPRODUTO=[];
        while(json.data[cont]){    
            JSONPRODUTOCLASSEPRODUTO.push(json.data[cont]);
            $('#listaDeProdutos').append(carregarListaProdutos(json.data[cont], cont));
            cont++;
        }

    }else if(tipo=='todos'){
        
        var json = await requisicaoGET('products', {headers:{Authorization:`Bearer ${user.token}`}})
        JSONPRODUTOCLASSEPRODUTO=[];
        while(json.data[cont]){    
            JSONPRODUTOCLASSEPRODUTO.push(json.data[cont]);
            $('#listaDeProdutos').append(carregarListaProdutos(json.data[cont], cont));
            cont++;
        }

    }else if(tipo=='dataValidade'){
        
        var json = await requisicaoGET('products_validity?date='+$('#buscaProdutoDate').val(), {headers:{Authorization:`Bearer ${user.token}`}})
        JSONPRODUTOCLASSEPRODUTO=[];
        while(json.data[cont]){    
            JSONPRODUTOCLASSEPRODUTO.push(json.data[cont]);
            $('#listaDeProdutos').append(carregarListaProdutos(json.data[cont], cont));
            cont++;
        }

    }else if(tipo=='dataChegada'){
        alert('ainda n disponivel');
    }

}










//funcao responsavel por atualizar produto
function atualizarProduto(){
    
    if(document.getElementById('nomeFornecedor') != null && validaDadosCampo(['#nomeFornecedor'])){

        if(validaDadosCampo(['#id','#barcode','#nome','#valorUni','#valorCus','#dataValidade','#qtdEstoque','#nomeFornecedor','#cpfCnpjFornecedor','#telefoneFornecedor','#emailFornecedor'])){

            var json = '{"codigo":"'+$('#barcode').val()+'",'
                    json +='"nome":"'+$('#nome').val()+'",'
                    json +='"valorUnit":'+$('#valorUni').val()+','
                    json +='"valorCust":'+$('#valorCus').val()+','
                    json +='"dataValidade":"'+$('#dataValidade').val()+'",'
                    json +='"quantidadeEstoque":'+$('#qtdEstoque').val()+','
                    if(validaDadosCampo(['#descricao'])){
                        json +='"descricao":"'+$('#descricao').val()+'",'
                    }else{
                        json +='"descricao":"" ,'
                    }
                    json +='"nomeFornecedor":"'+$('#nomeFornecedor').val()+'",'
                    json +='"cpfCnpjFornecedor":"'+$('#cpfCnpjFornecedor').val()+'",'
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

        if(validaDadosCampo(['#id','#barcode','#nome','#valorUni','#valorCus','#dataValidade','#qtdEstoque','#listaFornecedor'])){

            var json = '{"codigo":"'+$('#barcode').val()+'",'
                    json +='"nome":"'+$('#nome').val()+'",'
                    json +='"valorUnit":'+$('#valorUni').val()+','
                    json +='"valorCust":'+$('#valorCus').val()+','
                    json +='"dataValidade":"'+$('#dataValidade').val()+'",'
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
async function excluirProduto(){

    if(validaDadosCampo(['#id'])){
        
        try {
            var user = JSON.parse(sessionStorage.getItem('login'));
            await requisicaoDELETE('products/'+$('#id').val(), '', {headers:{Authorization:`Bearer ${user.token}`}});
            mensagemDeAviso('Excluido com sucesso!');  
        } catch (error) {
            mensagemDeErro('Não foi possível excluir! Erro: '+error);
        }

    }else{
        mensagemDeErro('Não é possivel, falta de ID!');
    }

}