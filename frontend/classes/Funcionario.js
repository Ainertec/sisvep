
///-------------------------------------------------tela principal funcionario ------------------------------------------------------

//funcao responsavel pela autenticacao no setor de funcionario
function autenticacaoFuncionarioFacede(tipo){
    
    if(tipo==0){
        document.getElementById('janela2').innerHTML = telaFuncionario(1);
        document.getElementById('listaHorasTrabalhadas').innerHTML = carregarListaHorasTrabalhadasFuncionario();
        loarding();
    }else{

    }
} 


//funcao responsavel por gerar a tela de funcionario
function telaFuncionario(tipo){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Dados Funcionário</h3>'
    
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
                    codigoHTML+='<label for="cpf-cnpj">CPF/CNPJ:</label>'
                    codigoHTML+='<input type="text" class="form-control" id="cpf-cnpj" placeholder="CPF ou CNPJ">'
                codigoHTML+='</div>'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="senha">Senha:</label>'
                    codigoHTML+='<input type="password" class="form-control" id="senha" placeholder="Senha">'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<div class="form-group col-md-6">'
                    codigoHTML+='<label for="tipoFun">Tipo de funcionário:</label>'
                    if(tipo==1){
                        codigoHTML+='<select class="custom-select mr-sm-6" id="tipoFun" disabled>'
                    }else{
                        codigoHTML+='<select class="custom-select mr-sm-6" id="tipoFun">'
                    }
                        codigoHTML+='<option value="1">Comum</option>'
                        codigoHTML+='<option value="2">Administrador</option>'
                    codigoHTML+='</select>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="form-row">'
                codigoHTML+='<button type="button" class="btn btn-success" style="margin: 5px;"><span class="fas fa-save"></span> Atualizar</button>'
                if(tipo==0){
                    codigoHTML+='<button type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Cadastrar</button>'
                    codigoHTML+='<button type="button" class="btn btn-danger" style="margin: 5px;"><span class="fas fa-trash-alt"></span> Excluir</button>'
                }
            codigoHTML+='</div>'
        codigoHTML+='</form>'
        codigoHTML+='<div id="listaHorasTrabalhadas">'

        codigoHTML+='</div>'
    codigoHTML+='</div>'


    return codigoHTML;

}



//funcao responsavel pela lista de horas trabalhadas pelo funcionario
function carregarListaHorasTrabalhadasFuncionario(){

    var codigoHTML='';

    for(var cont=0; cont<10; cont++){
        codigoHTML+='<a href="#" class="list-group-item list-group-item-action">'
            codigoHTML+='<div class="d-flex w-100 justify-content-between">'
                codigoHTML+='<h5 class="mb-1">Nome: </h5>'
                codigoHTML+='<small>CPF/CNPJ: </small>'
            codigoHTML+='</div>'
            codigoHTML+='<small>Descrição: </small>'
        codigoHTML+='</a>'
    }

    return codigoHTML;
}