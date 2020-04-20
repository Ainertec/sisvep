

///---------------------------------------------tela principal de Estoque-----------------------------------------------










//funcao responsavel pela autenticacao no setor estoque
function autenticacaoEstoqueFacede(){
    
    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        document.getElementById('janela2').innerHTML = telaEstoque();
    }else{
        mensagemDeErro("Usuário não autorizado!");
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
            codigoHTML+='<button onclick="buscarProdutoEstoque();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
            codigoHTML+='<button onclick="buscarProdutoEstoque();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Quantidade</button>'
            codigoHTML+='<button onclick="buscarProdutoEstoque();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'

    codigoHTML+='<h5 class="text-center" style="margin-top:30px;">Lista de Produtos</h5>'
    codigoHTML+='<table id="tabelaDeProdutosEstoque" class="table table-bordered bg-light">'
    codigoHTML+='</table>'

    return codigoHTML;

}










//funcao responsavel por carregar os dados dos produtos para estoque
function carregarProdutosEstoque(json){
    
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

    while(json[cont]){

        codigoHTML+='<tr>'
            codigoHTML+='<td>'+json[cont].codigo+'</td>'
            codigoHTML+='<td>'+json[cont].nome+'</td>'
            codigoHTML+='<td id="quantidadeAtual'+json[cont].id+'">'+json[cont].quantidade+'</td>'
            codigoHTML+='<td><input id="quantidadeItem'+json[cont].id+'" type="Number" class="form-control" placeholder="Adicionar quantidade"></td>'
            codigoHTML+='<td><button onclick="atualizarEstoqueDeProduto(\''+json[cont].id+'\')" type="button" class="btn btn-primary"><span class="fas fa-sync-alt"></span> Atualizar</button></td>'
        codigoHTML+='</tr>'

        cont++;
    }

    codigoHTML+='</tbody>'


    return codigoHTML;

}










//funcao responsavel por buscar e listar os produtos da busca
function buscarProdutoEstoque(){

    var json = '[{"id":"1a2", "codigo":123, "nome":"Produto 1", "quantidade":300},{"id":"2b3", "codigo":345, "nome":"Produto 2", "quantidade":200},{"id":"3c4", "codigo":567, "nome":"Produto 3", "quantidade":150}]'

    json=JSON.parse(json);

    document.getElementById('tabelaDeProdutosEstoque').innerHTML = carregarProdutosEstoque(json);

}









//funcao rsponsavel por atualizar a quantidade de um determinado produto
function atualizarEstoqueDeProduto(id){

    var json = '{"quantidade":'+(parseInt($('#quantidadeAtual'+id).text())+parseInt($('#quantidadeItem'+id).val()))+'}'

    document.getElementById('janela2').innerHTML = json;
}