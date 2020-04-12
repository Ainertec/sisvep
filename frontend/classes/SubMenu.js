

///--------------------------------------------------Sub Menus------------------------------------------------------------------------------


//funcao reponsavel pelo sub menu do produto
function subMenuProduto(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Produto</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button onclick="autenticacaoProduto(1);" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="autenticacaoProduto(2);" type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Buscar Produto'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}


//funcao reponsavel pelo sub menu do fiado
function subMenuFiado(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Fiado</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Fiado'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Buscar Fiado'
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
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Funcionário'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Buscar Funcionário'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}