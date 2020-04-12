
///---------------------------------------------------tela loja--------------------------------------------------------------------------

//funcao responsavel pela autenticacao de usuario no setor loja
function autenticacaoLoja(){

    if(1==1){
        document.getElementById('janela2').innerHTML = telaLoja(0);
        loarding();
    }

}


//funcao responsavel por criar a tela da loja
function telaLoja(tipo){

    var codigoHTML='';

    if(tipo==0){
        codigoHTML+='<h3 class="text-center">Atualizar Loja</h3>'
    }else{
        codigoHTML+='<h3 class="text-center">Atualizar Loja</h3>'
    }
    
    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<form>'
            codigoHTML+='<div class="form-row">'
                
                if(tipo==0){
                    codigoHTML+='<div class="form-group col-md-6">'
                        codigoHTML+='<label for="id">ID:</label>'
                        codigoHTML+='<input type="text" class="form-control" id="id" placeholder="ID" disabled>'
                    codigoHTML+='</div>'
                }

                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="nome">Nome:</label>'
                    codigoHTML+='<input type="Text" class="form-control" id="nome" placeholder="Nome">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="cpf-cnpj">CPF/CNPJ:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="cpf-cnpj" placeholder="CPF ou CNPJ">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="telefone">Telefone:</label>'
                    codigoHTML+='<input type="Text" class="form-control" id="telefone" placeholder="Telefone">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="email">E-mail:</label>'
                    codigoHTML+='<input type="email" class="form-control" id="email" placeholder="Email">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="endereco">Endereço:</label>'
                    codigoHTML+='<textArea type="Text" class="form-control" id="endereco" placeholder="Endereço">'
                    codigoHTML+='</textArea>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<button type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-save"></span> Salvar</button>'
                codigoHTML+='<button type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'

    return codigoHTML;
}

