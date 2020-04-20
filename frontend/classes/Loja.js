
///---------------------------------------------------tela loja--------------------------------------------------------------------------










//funcao responsavel pela autenticacao de usuario no setor loja
function autenticacaoLoja(){

    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador'){
        verificarCadastroLoja();        
    }else{
        mensagemDeErro("Usuário não autorizado!");
    }

}










//funcao responsavel por criar a tela da loja
function telaLoja(tipo){

    var codigoHTML='';

    if(tipo=='Atualizar'){
        codigoHTML+='<h3 class="text-center">Atualizar Loja</h3>'
    }else if(tipo=='Cadastrar'){
        codigoHTML+='<h3 class="text-center">Cadastrar Loja</h3>'
    }
    
    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<form>'
            codigoHTML+='<div class="form-row">'
                
                if(tipo=='Atualizar'){
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
                    codigoHTML+='<label for="cpfCnpj">CPF/CNPJ:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="cpfCnpj" placeholder="CPF ou CNPJ">'
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

                if(tipo=='Atualizar'){
                    codigoHTML+='<button onclick="atualizarLoja();" type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Salvar</button>'
                    codigoHTML+='<button onclick="excluirLoja();" type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
                }else if(tipo=='Cadastrar'){
                    codigoHTML+='<button onclick="cadastrarLoja();" type="button" class="btn btn-primary" style="margin: 5px;"><span class="fas fa-save"></span> Salvar</button>'
                }
            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'

    return codigoHTML;
}










//funcao responsavel por verificar se existe algum caddastro de loja
function verificarCadastroLoja(){
    var json = '[{"id":"1a2", "nome":"loja 1", "cpfCnpj":"188.649.517-63", "telefone":"(22) 99985-2356", "email":"loja@gmail.com", "endereco":"Rua Sete de Setembro, Lumiar/RJ"}]'

    json = JSON.parse(json);

    if(json[0] != null){
        document.getElementById('janela2').innerHTML = telaLoja('Atualizar');
        setTimeout(function(){carregarDadosLoja(json);},1000);
    }else{
        document.getElementById('janela2').innerHTML = telaLoja('Cadastrar');
    }
}










//funcao responsavel por carregar os dados da loja cadastrada
function carregarDadosLoja(json){

    document.getElementById('id').value = json[0].id;
    document.getElementById('nome').value = json[0].nome;
    document.getElementById('cpfCnpj').value = json[0].cpfCnpj;
    document.getElementById('telefone').value = json[0].telefone;
    document.getElementById('email').value = json[0].email;
    document.getElementById('endereco').value = json[0].endereco;

}










//funcao responsavel por atualizar os dados da loja
function atualizarLoja(){

    if(validaDadosCampo(['#id','#nome','#cpfCnpj','#telefone','#email','#endereco'])){
        var json = '{"id":"'+$('#id').val()+'",'
            json +='"nome":"'+$('#nome').val()+'",'
            json +='"cpfCnpj":"'+$('#cpfCnpj').val()+'",'
            json +='"telefone":"'+$('#telefone').val()+'",'
            json +='"email":"'+$('#email').val()+'",'
            json +='"endereco":"'+$('#endereco').val()+'"}'
        
        document.getElementById('janela2').innerHTML = json;
    }else{
        mensagemDeErro('Preencha todos os dados!');
    }

}










//funcao responsavel por cadastrar os dados da loja
function cadastrarLoja(){

    if(validaDadosCampo(['#nome','#cpfCnpj','#telefone','#email','#endereco'])){
        var json = '{"nome":"'+$('#nome').val()+'",'
            json +='"cpfCnpj":"'+$('#cpfCnpj').val()+'",'
            json +='"telefone":"'+$('#telefone').val()+'",'
            json +='"email":"'+$('#email').val()+'",'
            json +='"endereco":"'+$('#endereco').val()+'"}'
        
        document.getElementById('janela2').innerHTML = json;
    }else{
        mensagemDeErro('Preencha todos os dados!');
    }
    
}









//funcao responsavel por excluir a loja
function excluirLoja(){
    
    if(validaDadosCampo(['#id'])){
        var json = '{"id":"'+$('#id').val()+'"}'

        document.getElementById('janela2').innerHTML = json;
    }else{
        mensagemDeErro('Não é possivel, falta de ID!');
    }

}