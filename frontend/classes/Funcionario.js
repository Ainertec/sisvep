
///-------------------------------------------------tela principal funcionario ------------------------------------------------------

//funcao responsavel pela autenticacao no setor de funcionario
function autenticacaoFuncionarioFacede(){
    
    if(1==1){
        document.getElementById('janela2').innerHTML = telaFuncionario('Comum');
    }else{
        document.getElementById('janela2').innerHTML = telaFuncionario('Admin');
    }
} 


//funcao responsavel por gerar a tela de funcionario
function telaFuncionario(tipo){
    
    var codigoHTML='';


    if(tipo=='Admin'){
        codigoHTML+='<h3 class="text-center">Funcionário</h3>'

        codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
            codigoHTML+='<h5 class="text-center">Buscar</h5>'
            codigoHTML+='<div class="input-group mb-3">'
                codigoHTML+='<input id="buscaProduto" type="text" class="form-control" placeholder="Nome">'
            codigoHTML+='</div>'
            codigoHTML+='<div class="btn-group btn-lg btn-block" role="group">'
                codigoHTML+='<button type="button" class="btn btn-outline-primary">Buscar por Nome</button>'
                codigoHTML+='<button type="button" class="btn btn-outline-primary">Exibir todos</button>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    }


    codigoHTML+='<h5 class="text-center">Dados Funcionário</h5>'

    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<form>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="id">ID:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="id" placeholder="ID" disabled>'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="nome">Nome:</label>'
                    codigoHTML+='<input type="Text" class="form-control" id="nome" placeholder="Nome">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="login">Login:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="login" placeholder="Login">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="senha">Senha:</label>'
                    codigoHTML+='<input type="password" class="form-control" id="senha" placeholder="Senha">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="tipoFun">Tipo de funcionário:</label>'
                    if(tipo=='Comum'){
                        codigoHTML+='<select class="custom-select mr-sm-6" id="tipoFun" disabled>'
                    }else if(tipo=='Admin'){
                        codigoHTML+='<select class="custom-select mr-sm-6" id="tipoFun">'
                    }
                        codigoHTML+='<option value="1">Comum</option>'
                        codigoHTML+='<option value="2">Administrador</option>'
                    codigoHTML+='</select>'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="email">Email:</label>'
                    codigoHTML+='<input type="email" class="form-control" id="email" placeholder="Email@email.com.br">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<button type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-edit"></span> Atualizar</button>'
                if(tipo=='Admin'){
                    codigoHTML+='<button type="button" class="btn btn-primary" style="margin: 5px;"><span class="fas fa-save"></span> Cadastrar</button>'
                    codigoHTML+='<button type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
                }
            codigoHTML+='</div>'
        codigoHTML+='</form>'
    codigoHTML+='</div>'

    return codigoHTML;

}