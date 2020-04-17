

///--------------------------------------------------Sub Menus------------------------------------------------------------------------------


//funcao reponsavel pelo sub menu do produto
function subMenuProduto(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Produto</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button onclick="autenticacaoProduto(\'Cadastrar\');" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="autenticacaoProduto(\'Atualizar\');" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Buscar Produto'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}


//funcao reponsavel pelo sub menu do administrador
function subMenuAdministrador(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Administrador</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Administrador'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Buscar Administrador'
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
            codigoHTML+='<span class="fas fa-users"></span> Impressão Etiquetas'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}