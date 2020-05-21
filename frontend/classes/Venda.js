

///---------------------------------------------------------Tela principal de venda-------------------------------------------------------










//vetor com dados dos produtos da venda
var VETORCODIGOITENSVENDA=[];










//funcao responsavel pela autenticacao de usuario no setor venda
function autenticacaoVendaFacede(){

    var situacao = autenticacaoLogin();
    VETORCODIGOITENSVENDA=[];
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        document.getElementById('janela2').innerHTML = telaVenda();
        pausarAtalhos();
        atalhosTeclaVenda();
        $('#submenu').hide();
        document.getElementById('mensagemSubMenu').innerHTML = '<p>Para liberar o menu pressione a tecla "B"!<br/>Pressione "L" para pesquisar produtos pelo nome.</p>'
    }else{
        mensagemDeErro("Usuário não autorizado!");
    }

}










// funcao responsavel por criar a tela de vendas
function telaVenda(){
    var codigoHTML='';

    codigoHTML+='<div class="card mb-10 border-danger" style="height:540px;">'
        codigoHTML+='<div class="row no-gutters">'
            codigoHTML+='<div class="col-md-4">'

                codigoHTML+='<div class="card bg-success border-danger" style="margin:5px; color: #fff">'
                    codigoHTML+='<div class="card-header"><strong>Valor Total</strong></div>'    
                    codigoHTML+='<div class="card-body">'
                        codigoHTML+='<h2><strong>R$ <span id="exibirValorTotalAtualizado">0.00</span></strong></h2>'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'

                codigoHTML+='<div class="card border-danger" style="margin:5px;">'
                    codigoHTML+='<div class="card-body">'
                        codigoHTML+='<div class="form-group row">'
                            codigoHTML+='<label for="qtdItemDaVenda">Produto <strong>X</strong></label>' 
                            codigoHTML+='<input type="Number" class="form-control form-control-sm col-3 mousetrap" id="qtdItemDaVenda" style="margin-left:10px" value=1>'
                        codigoHTML+='</div>'
                        codigoHTML+='<div class="form-group row">'
                            codigoHTML+='<div class="input-group mb-3">'
                                codigoHTML+='<label for="campocodigodeleteitemvenda">Produto</label>'
                                codigoHTML+='<input id="campocodigodeleteitemvenda" type="Number" class="form-control form-control-sm col-4 mousetrap" style="margin-left:10px" placeholder="Código" aria-describedby="buttonDeleteItemDaVenda">'
                                codigoHTML+='<div class="input-group-append">'
                                    codigoHTML+='<button onclick="removerProdutoDaLista(document.getElementById(\'campocodigodeleteitemvenda\').value);" class="btn btn-danger btn-sm" type="button" id="buttonDeleteItemDaVenda"><span class="fas fa-times iconsTam"></span> Remover</button>'
                                codigoHTML+='</div>'
                            codigoHTML+='</div>'
                        codigoHTML+='</div>'
                        codigoHTML+='<div class="form-group row">'
                            codigoHTML+='<div class="input-group mb-3">'
                                codigoHTML+='<label for="campocodigoadicionaritemvenda">Produto</label>'
                                codigoHTML+='<input id="campocodigoadicionaritemvenda" type="Number" class="form-control form-control-sm col-4 mousetrap" style="margin-left:10px" placeholder="Código" aria-describedby="buttonAdicionarItemDaVenda">'
                                codigoHTML+='<div class="input-group-append">'
                                    codigoHTML+='<button onclick="buscarProdutoVenda(document.getElementById(\'campocodigoadicionaritemvenda\').value);" class="btn btn-primary btn-sm" type="button" id="buttonAdicionarItemDaVenda"><span class="fas fa-plus iconsTam"></span> Adicionar</button>'
                                codigoHTML+='</div>'
                            codigoHTML+='</div>'
                        codigoHTML+='</div>'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'

                codigoHTML+='<div class="card border-danger" style="margin:5px;">'
                    codigoHTML+='<div class="card-header"><strong>Pagamento</strong></div>'    
                    codigoHTML+='<div class="card-body">'
                        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
                            codigoHTML+='<button onclick="modalPagamento(\'dinheiro\');" type="button" class="btn btn-primary"><span class="fas fa-dollar-sign iconsTam"></span> Dinheiro</button>'
                            codigoHTML+='<button onclick="modalPagamento(\'cartao\');" type="button" class="btn btn-info"><span class="fas fa-credit-card iconsTam"></span> Cartão</button>'
                        codigoHTML+='</div>'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'

            codigoHTML+='</div>'
            codigoHTML+='<div class="col-md-8">'
                codigoHTML+='<div class="card-body">'
                    
                    codigoHTML+='<div class="col-11 layer1" style="position: absolute; height: 500px; z-index: 1; overflow: scroll;">'
                        codigoHTML+='<table class="table table-sm table-secondary" style="margin-top: 10px;">'
                            codigoHTML+='<tbody id="tabelaCarregarItensParaVenda">'

                            codigoHTML+='</tbody>'
                        codigoHTML+='</table>'
                    codigoHTML+='</div>'

                codigoHTML+='</div>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'
    
    codigoHTML+='<div id="dadosItemVenda">'
    codigoHTML+='</div>'

    return codigoHTML;

}










//funcao reponsavel por carregar a lista e exibir os dados do item da venda
function carregarDadosItensVenda(json){

    var codigoHTML='', codigoHTML2='';

    codigoHTML2+='<table class="table table-danger">'
        codigoHTML2+='<tbody>'
            codigoHTML2+='<tr>'
                codigoHTML2+='<th>Código: '+json.data.barcode+'</th>'
                codigoHTML2+='<th>Nome: '+json.data.name+'</th>'
                codigoHTML2+='<th>Preço Uni.: R$ '+(json.data.price).toFixed(2)+'</th>'
                codigoHTML2+='<th>Quantidade: '+$('#qtdItemDaVenda').val()+'</th>'
            codigoHTML2+='</tr>'
        codigoHTML2+='</tbody>'
    codigoHTML2+='</table>'

    document.getElementById('dadosItemVenda').innerHTML = codigoHTML2;

    
    if(document.getElementById('codigoProduto'+json.data.barcode) != null){

        document.getElementById('quantidadeProduto'+json.data.barcode).innerHTML=parseInt($('#quantidadeProduto'+json.data.barcode).text()) + parseInt($('#qtdItemDaVenda').val());
        document.getElementById('valorProduto'+json.data.barcode).innerHTML=(parseFloat($('#valorProduto'+json.data.barcode).text()) + parseFloat((json.data.price * $('#qtdItemDaVenda').val()))).toFixed(2);
    
    }else{

        VETORCODIGOITENSVENDA.push(json.data);

        codigoHTML+='<tr id="produto-'+json.data.barcode+'">'
            codigoHTML+='<td id="codigoProduto'+json.data.barcode+'">'+json.data.barcode+'</td>'
            codigoHTML+='<td id="nomeProduto'+json.data.barcode+'">'+json.data.name+'</td>'
            codigoHTML+='<td id="valorProduto'+json.data.barcode+'">'+(parseFloat(json.data.price)*parseInt($('#qtdItemDaVenda').val())).toFixed(2)+'</td>'
            codigoHTML+='<td id="quantidadeProduto'+json.data.barcode+'">'+$('#qtdItemDaVenda').val()+'</td>'
        codigoHTML+='</tr>'

        $('#tabelaCarregarItensParaVenda').append(codigoHTML);

    }

    gerarValorTotal();

}










//funcao responsavel por gerar o modal de pagamento
function modalPagamento(tipo){

    var codigoHTML='';

    codigoHTML+='<div class="modal fade" id="modalPagamento" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">'
        codigoHTML+='<div class="modal-dialog" role="document">'
            codigoHTML+='<div class="modal-content">'
                codigoHTML+='<div class="modal-header">'

                    if(tipo=='dinheiro'){
                        codigoHTML+='<h5 class="modal-title">Pagamento Dinheiro</h5>'
                    }else if(tipo=='cartao'){
                        codigoHTML+='<h5 class="modal-title">Pagamento Cartão</h5>'
                    }

                codigoHTML+='</div>'
                codigoHTML+='<div class="modal-body">'
                    codigoHTML+='<div class="card bg-success border-danger" style="margin:5px;">'
                        codigoHTML+='<div class="card-body">'
                            codigoHTML+='<h2 class="text-light"><strong>Valor Total: R$ <span id="valorTotalPagamento">'+$('#exibirValorTotalAtualizado').text()+'</span></strong></h2>'
                        codigoHTML+='</div>'
                    codigoHTML+='</div>'

                    if(tipo=='dinheiro'){
                        codigoHTML+='<div class="card bg-danger border-danger color-ligth" style="margin:5px;">'
                            codigoHTML+='<div class="card-body">'
                                codigoHTML+='<h2 class="text-light"><strong>Troco: R$ <span id="exibirTroco"></span></strong></h2>'
                            codigoHTML+='</div>'
                        codigoHTML+='</div>'
                        codigoHTML+='<label for="valorPago" style="margin-top:40px;"><strong>Valor Pago</strong></label>' 
                        codigoHTML+='<input id="valorPago" type="Number" class="form-control form-control-lg col-5 mousetrap" style="margin-left:10px" oninput="document.getElementById(\'exibirTroco\').innerHTML = (parseFloat(document.getElementById(\'valorPago\').value) - parseFloat($(\'#valorTotalPagamento\').text())).toFixed(2);">'
                    }

                codigoHTML+='</div>'
                codigoHTML+='<div class="modal-footer">'
                    codigoHTML+='<button onclick="limparModal();" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>'
                    
                    if(tipo=='dinheiro'){
                        codigoHTML+='<button onclick="cadastrarVenda(\'Dinheiro\');" type="button" class="btn btn-primary" data-dismiss="modal">Efetuar Pagamento</button>'
                    }else if(tipo=='cartao'){
                        codigoHTML+='<button onclick="cadastrarVenda(\'Cartão\');" type="button" class="btn btn-primary" data-dismiss="modal">Efetuar Pagamento</button>'
                    }

                codigoHTML+='</div>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'
 
    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalPagamento').modal('show');

}










//funcao responsavel por retirar o produto da lista
function removerProdutoDaLista(codigoProduto){

    if(document.getElementById('produto-'+codigoProduto) != null){

        if(parseInt($('#quantidadeProduto'+codigoProduto).text())-$('#qtdItemDaVenda').val() > 0){

            var valorUnit = parseFloat($('#valorProduto'+codigoProduto).text())/parseInt($('#quantidadeProduto'+codigoProduto).text());
            document.getElementById('quantidadeProduto'+codigoProduto).innerHTML = parseInt($('#quantidadeProduto'+codigoProduto).text())-$('#qtdItemDaVenda').val();
            document.getElementById('valorProduto'+codigoProduto).innerHTML = (valorUnit * parseInt($('#quantidadeProduto'+codigoProduto).text())).toFixed(2);
            gerarValorTotal();        
            mensagemDeAviso('Item removido com sucesso!');

        }else if(parseInt($('#quantidadeProduto'+codigoProduto).text())-$('#qtdItemDaVenda').val() == 0){
        
            VETORCODIGOITENSVENDA.forEach(function (item, indice, array) {
                if(codigoProduto==item.barcode){
                    VETORCODIGOITENSVENDA[indice].barcode=-1;
                }
              });
            document.getElementById('produto-'+codigoProduto).innerHTML='';
            gerarValorTotal();        
            mensagemDeAviso('Item removido com sucesso!');
        
        }else{
            mensagemDeErro('Quantidade para remover invalida!');
        }

    }else{
        mensagemDeErro('Código de barras inválido!');
    }

}










//funcao responsavel por gerar e apresentar o valor total
function gerarValorTotal(){

    var cont=0, valorTotal=0;

    while(VETORCODIGOITENSVENDA[cont]){
        if(document.getElementById('valorProduto'+VETORCODIGOITENSVENDA[cont].barcode) != null){
            valorTotal+=parseFloat($('#valorProduto'+VETORCODIGOITENSVENDA[cont].barcode).text());
        }
        cont++;
    }

    document.getElementById('exibirValorTotalAtualizado').innerHTML = valorTotal.toFixed(2);
}










//funcao responsavel por buscar e enviar os itens para a lista
async function buscarProdutoVenda(codigo){

    if(codigo != ''){
        try {

            var json = await requisicaoGET('products_barcode?barcode='+codigo, {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});
        
            if(json != null){
                carregarDadosItensVenda(json);
                beepAlerta();
            }else{
                mensagemDeErro('Código de barras inválido!');
            }

        } catch (error) {
            mensagemDeErro('Não foi possível encontrar o produto! Erro: '+error);
        }
    }else{

        mensagemDeErro('Código de barras inválido!');

    }

}










//funcao responsavel por emitir um som no momento em que o código de barras chega
function beepAlerta(){

    let beep = new AudioContext(),
    alerta = beep.createOscillator();

    alerta.type = 'triangle';
    alerta.connect(beep.destination);
    alerta.start();

    setTimeout(function(){alerta.stop();},100);
}










//funcao responsavel por receber o codigo de barras lido pelo celular em real time
function socketCodigoBarrasRealTime(){
    
    if ("WebSocket" in window) {

        alert("WebSocket is supported by your Browser!");
        var ws = new WebSocket("ws://localhost:9998/echo");
         
       /* ws.onopen = function() {
           ws.send("Message to send");
           alert("Message is sent...");
        };*/
         
        ws.onmessage = function (evt) { 
           var received_msg = evt.data;
           buscarProdutoVenda(received_msg);
           alert("Message is received...");
        };
         
        ws.onclose = function() { 
           alert("Connection is closed..."); 
        };

     } else {
        alert("WebSocket NOT supported by your Browser!");
     }

}











//funcao responsavel por cadastrar a venda após concluida
async function cadastrarVenda(formaPagamento){
    
    var json = '{"payment":"'+formaPagamento+'","total":'+parseFloat($('#exibirValorTotalAtualizado').text())+',"itens":[';
    var aux=true;

    VETORCODIGOITENSVENDA.forEach(function (item) {
        if(document.getElementById('codigoProduto'+item.barcode) != null){
            if(aux){
                json+='{"product":"'+item._id+'","quantity":'+parseInt($('#quantidadeProduto'+item.barcode).text())+'}'
                aux=false;
            }else{
                json+=',{"product":"'+item._id+'","quantity":'+parseInt($('#quantidadeProduto'+item.barcode).text())+'}'
            }
        }
    });

    json+=']}'
    
    var result = await requisicaoPOST('sales', JSON.parse(json), {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});

    if(formaPagamento=='Dinheiro'){
        modalImpressaoNota(result, parseFloat($('#valorPago').val()));
    }else{
        modalImpressaoNota(result, null);
    }

    setTimeout(function(){autenticacaoVendaFacede();},2000);

}











//funcao responsavel por gerar o modal de impressao e enviar a nota para a impressao
async function modalImpressaoNota(json, valorPago){
    
    var codigoHTML='', result = await requisicaoGET('shops', {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});

    codigoHTML+='<div class="modal fade" id="modalNota" tabindex="-1" role="dialog" aria-labelledby="modalNotaImpressao" aria-hidden="true">'
        codigoHTML+='<div class="modal-dialog modal-dialog-scrollable" role="document">'
            codigoHTML+='<div class="modal-content">'
                codigoHTML+='<div class="modal-header">'
                    codigoHTML+='<h5 class="modal-title" id="modalNotaImpressao">Nota Compra</h5>'
                    codigoHTML+='<button onclick="imprimirImpressora(\'#infoDadosnota\'); setTimeout(function(){limparModal();}, 1000);" type="button" class="btn btn-primary" style="margin-left:10px;">'
                        codigoHTML+='Imprimir'
                    codigoHTML+='</button>'
                    codigoHTML+='<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
                        codigoHTML+='<span aria-hidden="true">&times;</span>'
                    codigoHTML+='</button>'
                codigoHTML+='</div>'
                codigoHTML+='<div id="infoDadosnota" class="modal-body">'

                    codigoHTML+='<p>========================</p>'
                    codigoHTML+='<p>'+result.data.name+'<br/>'
                    codigoHTML+='CPF/CNPJ: '+result.data.identification+'<br/>'
                    codigoHTML+='Tel.: '+result.data.phone+'<br/>'
                    codigoHTML+='End.: '+result.data.address+'</p>'
                    codigoHTML+='<p>========================<br/>'
                    codigoHTML+='CUPOM NÃO FISCAL<br/>'
                    codigoHTML+='========================</p>'
                    var data = (json.data.sale.createdAt).split(".");
                    codigoHTML+='<p>Data: '+data[0]+'</p>'
                    codigoHTML+='<p>----------------------------------------</p>'
                    codigoHTML+='<p>'
                    json.data.sale.itens.forEach(function (item) {
                        codigoHTML+='Produto: '+item.product.name+' / quan.:'+parseInt(item.quantity)+'<br/>'
                        codigoHTML+='-Preço uni.: R$'+(parseFloat(item.product.price)).toFixed(2)+' preço tot.: R$'+(parseFloat(item.product.price)*parseInt(item.quantity)).toFixed(2)+'<br/>'
                    });
                    codigoHTML+='</p>'
                    codigoHTML+='<p>========================</p>'
                    codigoHTML+='<p>Valor total: R$'+(json.data.sale.total).toFixed(2)+'<br/>'
                    if(valorPago != null){
                        codigoHTML+='Valor pago: R$'+(valorPago).toFixed(2)+'<br/>'
                    }else{
                        codigoHTML+='Valor pago: R$'+(json.data.sale.total).toFixed(2)+'<br/>'
                    }
                    codigoHTML+='Forma de pagamento: '+json.data.sale.payment+'</p>'
                    codigoHTML+='<p>========================</p>'
                    codigoHTML+='<p>ID venda: '+json.data.sale._id+'</p>'


                codigoHTML+='</div>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalNota').modal('show');

    imprimirImpressora('#infoDadosnota');
}










//funcao responsavel por liberar o menu lateral
function liberarSubMenu(){
    var codigoHTML='';
        codigoHTML+='<div class="modal fade" id="modalDesbloquearSubMenu" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">'
            codigoHTML+='<div class="modal-dialog" role="document">'
                codigoHTML+='<div class="modal-content">'
                    codigoHTML+='<div class="modal-header">'
                        codigoHTML+='<h5 class="modal-title">Atenção</h5>'
                    codigoHTML+='</div>'
                    codigoHTML+='<div class="modal-body">'
                        codigoHTML+='<p>Ao sair da tela você perderá todos os dados da venda sendo necessário reefetuar toda a venda! Deseja continuar ?</p>'
                    codigoHTML+='</div>'
                    codigoHTML+='<div class="modal-footer">'
                        codigoHTML+='<button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>'
                        codigoHTML+='<button onclick="$(\'#submenu\').show(); document.getElementById(\'mensagemSubMenu\').innerHTML = \'\'; retirarPausaAtalho();" type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
        document.getElementById('modal').innerHTML = codigoHTML;
        $('#modalDesbloquearSubMenu').modal('show');
}










//funcao responsavel por lista um produto por nome para a venda
function modalItemVendaPorLista(){
    var codigoHTML='';

    codigoHTML+='<div class="modal fade" id="modalListaItemVenda" tabindex="-1" role="dialog" aria-labelledby="modalListaItemVenda" aria-hidden="true">'
        codigoHTML+='<div class="modal-dialog modal-dialog-scrollable" role="document">'
            codigoHTML+='<div class="modal-content">'
                codigoHTML+='<div class="modal-header">'
                    codigoHTML+='<h5 class="modal-title" id="modalListaItemVenda">Lista de Produtos</h5>'
                    codigoHTML+='<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
                        codigoHTML+='<span aria-hidden="true">&times;</span>'
                    codigoHTML+='</button>'
                codigoHTML+='</div>'
                codigoHTML+='<div class="modal-body">'
                    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
                        codigoHTML+='<h5 class="text-center">Buscar Produto</h5>'
                        codigoHTML+='<div class="input-group mb-3">'
                            codigoHTML+='<input id="buscaProduto" type="text" class="form-control mousetrap" placeholder="Nome">'
                        codigoHTML+='</div>'
                        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
                            codigoHTML+='<button onclick="buscarItemVendaLista();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
                        codigoHTML+='</div>'
                    codigoHTML+='</div>'
                    codigoHTML+='<div id="listaDeProdutos" class="list-group">'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalListaItemVenda').modal('show');
}










//funcao responsavel por buscar os produtos do modal produtos da tela venda
async function buscarItemVendaLista(){
    var codigoHTML='';

    if(validaDadosCampo(['#buscaProduto'])){
        try {
            var json = await requisicaoGET('products?name='+$('#buscaProduto').val(), {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});   
            json.data.forEach(function (item) {
                codigoHTML+='<a href="#" onclick="buscarProdutoVenda('+item.barcode+'); setTimeout(function(){limparModal();}, 1000);" class="list-group-item list-group-item-action" data-dismiss="modal">'
                    codigoHTML+='<div class="d-flex w-100 justify-content-between">'
                        codigoHTML+='<h5 class="mb-1">Nome: '+item.name+'</h5>'
                        codigoHTML+='<small>Código de barras: '+item.barcode+'</small>'
                    codigoHTML+='</div>'
                    codigoHTML+='<small>Descrição: '+item.description+'</small>'
                codigoHTML+='</a>'
            });
            document.getElementById('listaDeProdutos').innerHTML = codigoHTML;
        } catch (error) {
            mensagemDeErro('Não foi possível fazer a busca! Erro: '+error);
        }
    }else{
        mensagemDeErro('Preencha o campo nome!');
    }
}