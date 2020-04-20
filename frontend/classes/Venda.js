

///---------------------------------------------------------Tela principal de venda-------------------------------------------------------










//vetor com códigos dos produtos da venda
var VETORCODIGOITENSVENDA=[];










//funcao responsavel pela autenticacao de usuario no setor venda
function autenticacaoVendaFacede(){

    var situacao = autenticacaoLogin();
    VETORCODIGOITENSVENDA=[];
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        document.getElementById('janela2').innerHTML = telaVenda();
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
                            codigoHTML+='<input type="Number" class="form-control form-control-sm col-3" id="qtdItemDaVenda" style="margin-left:10px" value=1>'
                        codigoHTML+='</div>'
                        codigoHTML+='<div class="form-group row">'
                            codigoHTML+='<div class="input-group mb-3">'
                                codigoHTML+='<label for="campoebuttondeleteitemvenda">Produto</label>'
                                codigoHTML+='<input id="campocodigodeleteitemvenda" type="Number" class="form-control form-control-sm col-4" style="margin-left:10px" placeholder="Código" aria-describedby="buttonDeleteItemDaVenda">'
                                codigoHTML+='<div class="input-group-append">'
                                    codigoHTML+='<button onclick="removerProdutoDaLista(document.getElementById(\'campocodigodeleteitemvenda\').value);" class="btn btn-danger btn-sm" type="button" id="buttonDeleteItemDaVenda"><span class="fas fa-times iconsTam"></span> Remover</button>'
                                codigoHTML+='</div>'
                            codigoHTML+='</div>'
                        codigoHTML+='</div>'
                        codigoHTML+='<div class="form-group row">'
                            codigoHTML+='<div class="input-group mb-3">'
                                codigoHTML+='<label for="campocodigoadicionaritemvenda">Produto</label>'
                                codigoHTML+='<input id="campocodigoadicionaritemvenda" type="Number" class="form-control form-control-sm col-4" style="margin-left:10px" placeholder="Código" aria-describedby="buttonAdicionarItemDaVenda">'
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
                codigoHTML2+='<th>Código: '+json.codigo+'</th>'
                codigoHTML2+='<th>Nome: '+json.nome+'</th>'
                codigoHTML2+='<th>Preço Uni.: R$ '+(json.preco).toFixed(2)+'</th>'
                codigoHTML2+='<th>Quantidade: '+$('#qtdItemDaVenda').val()+'</th>'
            codigoHTML2+='</tr>'
        codigoHTML2+='</tbody>'
    codigoHTML2+='</table>'

    document.getElementById('dadosItemVenda').innerHTML = codigoHTML2;

    
    if(document.getElementById('codigoProduto'+json.codigo) != null){

        document.getElementById('quantidadeProduto'+json.codigo).innerHTML=parseInt($('#quantidadeProduto'+json.codigo).text()) + parseInt($('#qtdItemDaVenda').val());
        document.getElementById('valorProduto'+json.codigo).innerHTML=(parseFloat($('#valorProduto'+json.codigo).text()) + parseFloat((json.preco * $('#qtdItemDaVenda').val()))).toFixed(2);
    
    }else{

        VETORCODIGOITENSVENDA.push(json.codigo);

        codigoHTML+='<tr id="produto-'+json.codigo+'">'
            codigoHTML+='<td id="codigoProduto'+json.codigo+'">'+json.codigo+'</td>'
            codigoHTML+='<td id="nomeProduto'+json.codigo+'">'+json.nome+'</td>'
            codigoHTML+='<td id="valorProduto'+json.codigo+'">'+(json.preco*$('#qtdItemDaVenda').val()).toFixed(2)+'</td>'
            codigoHTML+='<td id="quantidadeProduto'+json.codigo+'">'+$('#qtdItemDaVenda').val()+'</td>'
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
                        codigoHTML+='<input id="valorPago" type="Number" class="form-control form-control-lg col-5" style="margin-left:10px">'
                    }

                codigoHTML+='</div>'
                codigoHTML+='<div class="modal-footer">'
                    codigoHTML+='<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>'
                    
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

    if(tipo=='dinheiro'){
        $("#valorPago").keypress(function(){

            setTimeout(function(){
                document.getElementById('exibirTroco').innerHTML = (parseFloat(document.getElementById('valorPago').value) - parseFloat($('#valorTotalPagamento').text())).toFixed(2);
            }, 1000);
    
        });
    }

}










//funcao responsavel por retirar o produto da lista
function removerProdutoDaLista(codigoProduto){

    if(document.getElementById('produto-'+codigoProduto) != null){

        if(parseInt($('#quantidadeProduto'+codigoProduto).text())-$('#qtdItemDaVenda').val() > 0){

            var valorUnit = parseFloat($('#valorProduto'+codigoProduto).text())/parseInt($('#quantidadeProduto'+codigoProduto).text());
            document.getElementById('quantidadeProduto'+codigoProduto).innerHTML = parseInt($('#quantidadeProduto'+codigoProduto).text())-$('#qtdItemDaVenda').val();
            document.getElementById('valorProduto'+codigoProduto).innerHTML = valorUnit * parseInt($('#quantidadeProduto'+codigoProduto).text());
            gerarValorTotal();        
            mensagemDeAviso('Item removido com sucesso!');

        }else if(parseInt($('#quantidadeProduto'+codigoProduto).text())-$('#qtdItemDaVenda').val() == 0){
        
            VETORCODIGOITENSVENDA.forEach(function (item, indice, array) {
                if(codigoProduto==item){
                    VETORCODIGOITENSVENDA[indice]=-1;
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
        if(document.getElementById('valorProduto'+VETORCODIGOITENSVENDA[cont]) != null){
            valorTotal+=parseFloat($('#valorProduto'+VETORCODIGOITENSVENDA[cont]).text());
        }
        cont++;
    }

    document.getElementById('exibirValorTotalAtualizado').innerHTML = valorTotal.toFixed(2);
}










//funcao responsavel por buscar e enviar os itens para a lista
function buscarProdutoVenda(codigo){
    
    if(codigo != ''){
        var json = JSON.parse('{"codigo":'+codigo+', "nome":"produto1", "preco":23.30}');
    
        carregarDadosItensVenda(json);

        beepAlerta();
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
function cadastrarVenda(formaPagamento){
    
    var datad = new Date();
    var json = '{"dataHora":"'+datad.getFullYear()+'-'+(datad.getMonth()+1)+'-'+datad.getDate()+' '+datad.getHours()+':'+(datad.getMinutes()+1)+':'+(datad.getSeconds()+1)+'", "formaPagamento":"'+formaPagamento+'", "valorTotal":'+$('#exibirValorTotalAtualizado').text()+', "listaItens":[';
    var aux=true;


    VETORCODIGOITENSVENDA.forEach(function (item) {
        if(document.getElementById('codigoProduto'+item) != null){
            if(aux){
                json+='{"nome":"'+$('#nomeProduto'+item).text()+'" , "quantidade":'+parseInt($('#quantidadeProduto'+item).text())+' , "precoUni":'+ (parseFloat($('#valorProduto'+item).text()) / parseInt($('#quantidadeProduto'+item).text())).toFixed(2) +'}'
                aux=false;
            }else{
                json+=',{"nome":"'+$('#nomeProduto'+item).text()+'" , "quantidade":'+parseInt($('#quantidadeProduto'+item).text())+' , "precoUni":'+ (parseFloat($('#valorProduto'+item).text()) / parseInt($('#quantidadeProduto'+item).text())).toFixed(2) +'}'
            }
        }
    });

    json+=']}'
    
    alert(json);

    json = JSON.parse(json);

    alert('Cadastrado com sucesso!');

    setTimeout(function(){autenticacaoVendaFacede();},1000);

}