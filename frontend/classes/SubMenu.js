

///--------------------------------------------------Sub Menus------------------------------------------------------------------------------










//funcao reponsavel pelo sub menu do produto
function subMenuProduto(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Produto</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button onclick="autenticacaoProduto(\'Cadastrar\');" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-cart-plus"></span> Cadastrar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="autenticacaoProduto(\'Atualizar\');" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-search"></span> Buscar Produto'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}










//funcao reponsavel pelo sub menu de impressão
function subMenuImpressao(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Impressão</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button onclick="telaDadosEtiqueta();" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-barcode"></span> Impressão Etiquetas'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaReimpressaoDeComprovanteVenda();" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-vote-yea"></span> Reimpressão Comprovante Venda'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaImpressaoRelatorio();" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-chart-pie"></span> Impressão Relatório'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}