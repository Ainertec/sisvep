
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
                    codigoHTML+='<input type="Number" class="form-control" id="quantidade" placeholder="Quantidade">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="nome">Código:</label>'
                    codigoHTML+='<input type="Number" class="form-control" id="codigo" placeholder="Código">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<button onclick="gerarEtiquetasCodigoDeBarras(document.getElementById(\'quantidade\').value, document.getElementById(\'codigo\').value)" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-file-pdf"></span> Gerar</button>'
            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;

}










//funcao para gerar etiquetas com código de barras
function gerarEtiquetasCodigoDeBarras(quantidade,codigo){
    
    var codigoHTML='';

    codigoHTML+='<a href="./home.html">Voltar</a><br/>'

    for(var cont=0; cont<quantidade; cont++){
        codigoHTML+='<svg id="barcode'+cont+'"></svg>'
    }


    document.getElementById('janelaTotal').innerHTML = codigoHTML;

    for(var cont=0; cont<quantidade; cont++){
        JsBarcode("#barcode"+cont+"", codigo, {
            format: "ean8",
            flat: false,
          });
    }

    setTimeout(function(){window.print();},2000);

}