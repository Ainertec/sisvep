

///---------------------------------------------------------Tela principal de venda-------------------------------------------------------


//funcao responsavel pela autenticacao de usuario no setor venda
function autenticacaoVenda(){

    if(1==1){
        document.getElementById('janela2').innerHTML = telaVenda();
        carregarDadosItensVenda();
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
                        codigoHTML+='<h2><strong>R$ 1200.00</strong></h2>'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'

                codigoHTML+='<div class="card border-danger" style="margin:5px;">'
                    codigoHTML+='<div class="card-body">'
                        codigoHTML+='<h5><strong>Código Nº: 123456789123</strong></h5>'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'

                codigoHTML+='<div class="card border-danger" style="margin:5px;">'
                    codigoHTML+='<div class="card-body">'
                        codigoHTML+='<div class="form-group row">'
                            codigoHTML+='<label for="qtdItemDaVenda">Produto <strong>X</strong></label>' 
                        codigoHTML+='<input type="Number" class="form-control form-control-sm col-3" id="qtdItemDaVenda" style="margin-left:10px" value=2>'
                        codigoHTML+='</div>'
                        codigoHTML+='<div class="form-group row">'
                            codigoHTML+='<div name="campoebuttondeleteitemvenda" class="input-group mb-3">'
                                codigoHTML+='<label for="campoebuttondeleteitemvenda">Produto</label>'
                                codigoHTML+='<input type="Number" class="form-control form-control-sm col-4" style="margin-left:10px" placeholder="Código" aria-describedby="buttonDeleteItemDaVenda">'
                                codigoHTML+='<div class="input-group-append">'
                                    codigoHTML+='<button class="btn btn-danger btn-sm" type="button" id="buttonDeleteItemDaVenda"><span class="fas fa-times iconsTam"></span> Remover</button>'
                                codigoHTML+='</div>'
                            codigoHTML+='</div>'
                        codigoHTML+='</div>'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'

                codigoHTML+='<div class="card border-danger" style="margin:5px;">'
                    codigoHTML+='<div class="card-header"><strong>Pagamento</strong></div>'    
                    codigoHTML+='<div class="card-body">'
                        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
                            codigoHTML+='<button type="button" class="btn btn-primary"><span class="fas fa-dollar-sign iconsTam"></span> Dinheiro</button>'
                            codigoHTML+='<button type="button" class="btn btn-info"><span class="fas fa-credit-card iconsTam"></span> Cartão</button>'
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
function carregarDadosItensVenda(){

    var codigoHTML='', codigoHTML2='', cont=0;
        
    while(cont<20){

        codigoHTML2+='<table class="table table-danger">'
            codigoHTML2+='<tbody>'
                codigoHTML2+='<tr>'
                    codigoHTML2+='<td>Código: Mark</td>'
                    codigoHTML2+='<td>Nome: fjdhdhf</td>'
                    codigoHTML2+='<td>Preço Uni.: R$ 20.00</td>'
                    codigoHTML2+='<td>Quantidade: 20</td>'
                codigoHTML2+='</tr>'
            codigoHTML2+='</tbody>'
        codigoHTML2+='</table>'


        codigoHTML+='<tr>'
            codigoHTML+='<td>123456789123</td>'
            codigoHTML+='<td>fjdhdhf</td>'
            codigoHTML+='<td>'+(20*$('#qtdItemDaVenda').val())+'</td>'
            codigoHTML+='<td>'+$('#qtdItemDaVenda').val()+'</td>'
        codigoHTML+='</tr>'

        cont++;

        document.getElementById('dadosItemVenda').innerHTML = codigoHTML2;
        $('#tabelaCarregarItensParaVenda').append(codigoHTML);
        
        codigoHTML='';
        codigoHTML2='';
    }

}