

///---------------------------------------------tela principal de Estoque-----------------------------------------------

//funcao responsavel pela autenticacao no setor estoque
function autenticacaoEstoqueFacede(){
    
    if(1==1){
        document.getElementById('janela2').innerHTML = telaEstoque();
        document.getElementById('tabelaDeProdutosEstoque').innerHTML = carregarProdutosEstoque();
    }

}


//funcao responsavel pela tela principal de estoque
function telaEstoque(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Estoque</h3>'
    

    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<h5 class="text-center">Buscar</h5>'
        codigoHTML+='<div class="input-group mb-3">'
            codigoHTML+='<input id="buscaProduto" type="text" class="form-control" placeholder="Nome">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="input-group mb-3">'
            codigoHTML+='<input id="buscaProdutoQuantidade" type="Number" class="form-control" placeholder="Quantidade">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button type="button" class="btn btn-outline-primary">Buscar por Nome</button>'
            codigoHTML+='<button type="button" class="btn btn-outline-primary">Buscar por Quantidade</button>'
            codigoHTML+='<button type="button" class="btn btn-outline-primary">Exibir todos</button>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'

    codigoHTML+='<h5 class="text-center" style="margin-top:30px;">Lista de Produtos</h5>'
    codigoHTML+='<table id="tabelaDeProdutosEstoque" class="table table-bordered bg-light">'
    codigoHTML+='</table>'

    return codigoHTML;

}


//funcao responsavel por carregar os dados dos produtos para estoque
function carregarProdutosEstoque(){
    
    var codigoHTML='', cont=0;

    codigoHTML+='<thead>'
        codigoHTML+='<tr>'
            codigoHTML+='<th scope="col">Código</th>'
            codigoHTML+='<th scope="col">Nome</th>'
            codigoHTML+='<th scope="col">Quantidade</th>'
            codigoHTML+='<th scope="col">Adicionar</th>'
            codigoHTML+='<th scope="col">#</th>'
        codigoHTML+='</tr>'
    codigoHTML+='</thead>'
    codigoHTML+='<tbody>'

    while(cont<10){

        codigoHTML+='<tr>'
            codigoHTML+='<td>1234567</td>'
            codigoHTML+='<td>Mark</td>'
            codigoHTML+='<td>200</td>'
            codigoHTML+='<td><input id="quantidadeItem" type="Number" class="form-control" placeholder="Adicionar quantidade"></td>'
            codigoHTML+='<td><button type="button" class="btn btn-primary">Atualizar</button></td>'
        codigoHTML+='</tr>'

        cont++;
    }

    codigoHTML+='</tbody>'


    return codigoHTML;

}