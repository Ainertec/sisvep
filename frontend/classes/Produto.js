

///-----------------------------------------------------tela principal de produto----------------------------------------------------------


//funcao responsavel pela autenticacao de usuario no setor produto
function autenticacaoProduto(tipo){

    if(tipo==1){
        document.getElementById('janela2').innerHTML = telaProduto(0);
        loarding();
    }else if(tipo==2){
        document.getElementById('janela2').innerHTML = telaBuscarProduto();
        document.getElementById('dadosDoProduto').innerHTML = telaProduto(0);
        document.getElementById('listaDeProdutos').innerHTML = carregarListaProdutos();
        loarding();
    }

}


//funcao reponsavel por gerar a tela de produto
function telaProduto(tipo){
     var codigoHTML='';

    if(tipo==0){
        codigoHTML+='<h3 class="text-center">Atualizar Produto</h3>'
    }else{
        codigoHTML+='<h3 class="text-center">Cadastrar Produto</h3>'
    }
    
    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<form>'
            codigoHTML+='<div class="form-row">'
                
                if(tipo==0){
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
                    codigoHTML+='<label for="cpf-cnpj">Nome:</label>'
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
                codigoHTML+='<button onclick="document.getElementById(\'dadosDoFornecedor\').innerHTML = carregarDadosFornecedor(1);" type="button" class="btn btn-primary" style="margin: 5px;"><span class="fas fa-save"></span> Cadastrar Fornecedor</button>'
                codigoHTML+='<button type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-save"></span> Salvar</button>'
                codigoHTML+='<button type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
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
        codigoHTML+='<h5 class="text-center">Buscar</h5>'
        codigoHTML+='<div class="input-group mb-3">'
            codigoHTML+='<input id="buscaProduto" type="text" class="form-control" placeholder="Nome ou código de barras" aria-label="Recipients username" aria-describedby="botaoBuscar">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button type="button" class="btn btn-outline-primary">Buscar por Código de barras</button>'
            codigoHTML+='<button type="button" class="btn btn-outline-primary">Buscar por Nome</button>'
            codigoHTML+='<button type="button" class="btn btn-outline-primary">Exibir todos</button>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'


    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<h5 class="text-center">Lista</h5>'
        codigoHTML+='<div id="listaDeProdutos" class="list-group">'

        codigoHTML+='</div>'
    codigoHTML+='</div>'


    codigoHTML+='<h5 class="text-center">Dados</h5>'
    codigoHTML+='<div id="dadosDoProduto">'
    
    codigoHTML+='</div>'

    return codigoHTML;

}




//funcao responsavel pela lista de produtos
function carregarListaProdutos(){

    var codigoHTML='';

    for(var cont=0; cont<10; cont++){
        codigoHTML+='<a href="#" class="list-group-item list-group-item-action">'
            codigoHTML+='<div class="d-flex w-100 justify-content-between">'
                codigoHTML+='<h5 class="mb-1">Nome: </h5>'
                codigoHTML+='<small>Código de barras: </small>'
            codigoHTML+='</div>'
            codigoHTML+='<small>Descrição: </small>'
        codigoHTML+='</a>'
    }

    return codigoHTML;
}