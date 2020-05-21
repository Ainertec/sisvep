
//--------------------------------------------------------tela principal de impressão -----------------------------------------










//funcao responsavel por gerar a tela principal das etiquetas
function telaDadosEtiqueta(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Dados Etiqueta</h3>'

    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<form>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="nome">Quantidade:</label>'
                    codigoHTML+='<input type="Number" class="form-control mousetrap" id="quantidade" placeholder="Quantidade">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="nome">Código:</label>'
                    codigoHTML+='<input type="number" class="form-control mousetrap" id="codigo" placeholder="Código" max="9999999" min="999999">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<button onclick="if(document.getElementById(\'codigo\').value<=9999999 && document.getElementById(\'codigo\').value>999999){gerarEtiquetasCodigoDeBarras(document.getElementById(\'quantidade\').value, document.getElementById(\'codigo\').value)}else{mensagemDeErro(\'O código deve ter menos que 7 digitos!\')}" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-file-pdf"></span> Gerar</button>'
            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
    atalhoTeclaImpressao("etiqueta");

}










//funcao para gerar etiquetas com código de barras
function gerarEtiquetasCodigoDeBarras(quantidade,codigo){
    
    var codigoHTML='';

    codigoHTML+='<div class="modal fade" id="modalImpressaoBarcode" tabindex="-1" role="dialog" aria-labelledby="modalBarcodeImpressao" aria-hidden="true">'
            codigoHTML+='<div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">'
                codigoHTML+='<div class="modal-content">'
                    codigoHTML+='<div class="modal-header">'
                        codigoHTML+='<h5 class="modal-title" id="modalBarcodeImpressao">Emissão Código de Barras</h5>'
                        codigoHTML+='<button onclick="imprimirImpressora(\'#emissaoCodigoDeBarras\'); setTimeout(function(){limparModal();}, 1000);" type="button" class="btn btn-primary" style="margin-left:10px;">'
                            codigoHTML+='Imprimir'
                        codigoHTML+='</button>'
                        codigoHTML+='<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
                            codigoHTML+='<span aria-hidden="true">&times;</span>'
                        codigoHTML+='</button>'
                    codigoHTML+='</div>'
                    codigoHTML+='<div id="emissaoCodigoDeBarras" class="modal-body">'
                        for(var cont=0; cont<quantidade; cont++){
                            codigoHTML+='<svg id="barcode'+cont+'"></svg>'
                        }
                    codigoHTML+='</div>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
    codigoHTML+='</div>'
    
    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalImpressaoBarcode').modal('show');


    for(var cont=0; cont<quantidade; cont++){
        JsBarcode("#barcode"+cont+"", codigo, {
            format: "ean8",
            flat: false,
          });
    }

}










//funcao reponsavel por gerar a tela de reimpressao de comprovante de venda
function telaReimpressaoDeComprovanteVenda(){

    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        var codigoHTML='';

        codigoHTML+='<h3 class="text-center">2ª Via Comprovante</h3>'

        codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
            codigoHTML+='<form>'
                codigoHTML+='<div class="form-row">'
                    codigoHTML+='<div class="form-group col-md-12">'
                        codigoHTML+='<label for="nome">Código ID:</label>'
                        codigoHTML+='<input type="text" class="form-control mousetrap" id="codigo" placeholder="Código ID">'
                    codigoHTML+='</div>'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-row">'
                    codigoHTML+='<button onclick="gerarSegundaViaComprovante(document.getElementById(\'codigo\').value)" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-file-pdf"></span> Gerar</button>'
                codigoHTML+='</div>'
            codigoHTML+='</form>'
        codigoHTML+='</div>'

        document.getElementById('janela2').innerHTML = codigoHTML;
        atalhoTeclaImpressao(null); 
    }else{
        mensagemDeErro("Usuário não autorizado!");
    }
}










//funcao responsavel por gera a segunda via de comprovante
async function gerarSegundaViaComprovante(codigo){

    var json = await requisicaoGET('sales_by_id?id='+codigo, {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});
    var result = await requisicaoGET('shops', {headers:{Authorization:`Bearer ${buscarSessionUser().token}`}});

    var codigoHTML='';

    codigoHTML+='<div class="modal fade" id="modalNota" tabindex="-1" role="dialog" aria-labelledby="modalNotaImpressao" aria-hidden="true">'
        codigoHTML+='<div class="modal-dialog modal-dialog-scrollable" role="document">'
            codigoHTML+='<div class="modal-content">'
                codigoHTML+='<div class="modal-header">'
                    codigoHTML+='<h5 class="modal-title" id="modalNotaImpressao">Nota Compra 2a Via</h5>'
                    codigoHTML+='<button onclick="imprimirImpressora(\'#infoDadosnota\'); setTimeout(function(){limparModal();}, 1000);" type="button" class="btn btn-primary" style="margin-left:10px;">'
                        codigoHTML+='Imprimir'
                    codigoHTML+='</button>'
                    codigoHTML+='<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
                        codigoHTML+='<span aria-hidden="true">&times;</span>'
                    codigoHTML+='</button>'
                codigoHTML+='</div>'
                codigoHTML+='<div id="infoDadosnota" class="modal-body">'

                    codigoHTML+='<p>========================</p>'
                    codigoHTML+='<p>2a VIA COMPROVANTE VENDA</p>'
                    codigoHTML+='<p>'+result.data.name+'<br/>'
                    codigoHTML+='CPF/CNPJ: '+result.data.identification+'<br/>'
                    codigoHTML+='Tel.: '+result.data.phone+'<br/>'
                    codigoHTML+='End.: '+result.data.address+'</p>'
                    codigoHTML+='<p>========================<br/>'
                    codigoHTML+='CUPOM NÃO FISCAL<br/>'
                    codigoHTML+='========================</p>'
                    var data=(json.data.createdAt).split(".");
                    codigoHTML+='<p>Data: '+data[0]+'</p>'
                    codigoHTML+='<p>----------------------------------------</p>'
                    codigoHTML+='<p>'
                    json.data.itens.forEach(function (item) {
                        codigoHTML+='Produto: '+item.product.name+' /quan.:'+parseInt(item.quantity)+'<br/>'
                        codigoHTML+='-Preço uni.: R$'+(parseFloat(item.product.price)).toFixed(2)+' preço tot.: R$'+(parseFloat(item.product.price)*parseInt(item.quantity)).toFixed(2)+'<br/>'
                    });
                    codigoHTML+='</p>'
                    codigoHTML+='<p>========================</p>'
                    codigoHTML+='<p>Valor total: R$'+(json.data.total).toFixed(2)+'<br/>'
                    codigoHTML+='Forma de pagamento: '+json.data.payment+'</p>'
                    codigoHTML+='<p>========================</p>'
                    codigoHTML+='<p>ID venda: '+json.data._id+'</p>'


                codigoHTML+='</div>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalNota').modal('show');
    
    imprimirImpressora('#infoDadosnota');

}










//funcao responsavel por gerar a tela de impressao de relatorio
function telaImpressaoRelatorio(){

    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        
        var codigoHTML='';

        codigoHTML+='<div class="modal fade" id="modalRelatorio" tabindex="-1" role="dialog" aria-labelledby="modalRelatorioImpressao" aria-hidden="true">'
            codigoHTML+='<div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">'
                codigoHTML+='<div class="modal-content">'
                    codigoHTML+='<div class="modal-header">'
                        codigoHTML+='<h5 class="modal-title" id="modalRelatorioImpressao">Impressão relatório</h5>'
                        codigoHTML+='<button onclick="imprimirImpressora(\'#infoDadosRelatorio\'); setTimeout(function(){limparModal();}, 1000);" type="button" class="btn btn-primary" style="margin-left:10px;">'
                            codigoHTML+='Imprimir'
                        codigoHTML+='</button>'
                        codigoHTML+='<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
                            codigoHTML+='<span aria-hidden="true">&times;</span>'
                        codigoHTML+='</button>'
                    codigoHTML+='</div>'
                    codigoHTML+='<div id="infoDadosRelatorio" class="modal-body">'

                        codigoHTML+='<h3 class="text-center">Relatórios</h3>'
                        
                        codigoHTML+='<input id="dataInicio" type="hidden" value="2020-05-01">'
                        codigoHTML+='<input id="dataFim" type="hidden" value="'+(new Date()).getFullYear()+'-'+(((new Date()).getMonth()+1).toString()).padStart(2,'0')+'-'+(((new Date()).getDate()).toString()).padStart(2, '0')+'">'
                        
                        codigoHTML+='<div id="grafico0" style="margin-top:10px;"></div>'
                        codigoHTML+='<div id="grafico1" style="margin-top:10px;"></div>'
                        codigoHTML+='<div id="grafico2" style="margin-top:10px;"></div>'
                        codigoHTML+='<div id="grafico3" style="margin-top:10px;"></div>'
                        codigoHTML+='<div id="grafico4" style="margin-top:10px;"></div>'
                        codigoHTML+='<div id="grafico5" style="margin-top:10px;"></div>'
                        codigoHTML+='<div id="grafico6" style="margin-top:10px;"></div>'
                        
                    codigoHTML+='</div>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'

        document.getElementById('modal').innerHTML = codigoHTML;

        $('#modalRelatorio').modal('show');

        setTimeout(function(){
            graficoLucroMensal();
            graficoQuantidadeVendasMensal();
            graficoLucroTotal();
            graficoProdutosVendidos();
            graficoRepresentacaoDeProdutoSobreVendas();
            graficoRepresentacaoDeProdutoSobreLucro();
            graficoQuantidadeProdutosporFornecedor();
        }, 1000);

    }else{
        mensagemDeErro("Usuário não autorizado!");
    }
}