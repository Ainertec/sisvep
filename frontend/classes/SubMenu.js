

///--------------------------------------------------Sub Menus------------------------------------------------------------------------------


//funcao reponsavel pelo sub menu da loja
function subMenuLoja(){
    
    var codigoHTML='';

    codigoHTML='<h3 class="text-center">Loja</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Loja'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Visualizar Loja'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-edit"></span> Atualizar Loja'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Deletar Loja'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}



//funcao reponsavel pelo sub menu do produto
function subMenuProduto(){
    
    var codigoHTML='';

    codigoHTML='<h3 class="text-center">Produto</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Visualizar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-edit"></span> Atualizar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Deletar Produto'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}



//funcao reponsavel pelo sub menu do fornecedor
function subMenuFornecedor(){
    
    var codigoHTML='';

    codigoHTML='<h3 class="text-center">Fornecedor</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Fornecedor'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Visualizar Fornecedor'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-edit"></span> Atualizar Fornecedor'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Deletar Fornecedor'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}



//funcao reponsavel pelo sub menu do fiado
function subMenuFiado(){
    
    var codigoHTML='';

    codigoHTML='<h3 class="text-center">Fiado</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Fiado'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Visualizar Fiado'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-edit"></span> Atualizar Fiado'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Deletar Fiado'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}



//funcao reponsavel pelo sub menu do funcionario
function subMenuFuncionario(){
    
    var codigoHTML='';

    codigoHTML='<h3 class="text-center">Funcionário</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Funcionário'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Visualizar Funcionário'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-edit"></span> Atualizar Funcionário'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Deletar Funcionário'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}




//funcao reponsavel pelo sub menu do administrador
function subMenuAdministrador(){
    
    var codigoHTML='';

    codigoHTML='<h3 class="text-center">Administrador</h3>'
    codigoHTML+='<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Administrador'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Visualizar Administrador'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-edit"></span> Atualizar Administrador'
        codigoHTML+='</button>'
        codigoHTML+='<button type="button" class="btn btn-light border-danger btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Deletar Administrador'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;
}