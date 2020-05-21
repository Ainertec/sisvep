//---------------------------------------------- teclas de atalho principal do software ----------------------------------------------









//variavel de estado de execucao dos atalhos globais
var ativacaoDeAtalhoGeral = true;









//funcao responsavel por ativar os atalhos gerais do software
function ativarAtalhosPrincipais(){
    Mousetrap.bind('ctrl+1', function() { if(ativacaoDeAtalhoGeral){autenticacaoVendaFacede();}else{liberarSubMenu();} });
    Mousetrap.bind('ctrl+2', function() { if(ativacaoDeAtalhoGeral){subMenuProduto(); liberarMousetrap();}else{liberarSubMenu();} });
    Mousetrap.bind('ctrl+3', function() { if(ativacaoDeAtalhoGeral){autenticacaoFornecedorFacede();}else{liberarSubMenu();} });
    Mousetrap.bind('ctrl+4', function() { if(ativacaoDeAtalhoGeral){autenticacaoFuncionarioFacede();}else{liberarSubMenu();} });
    Mousetrap.bind('ctrl+5', function() { if(ativacaoDeAtalhoGeral){autenticacaoEstoqueFacede();}else{liberarSubMenu();} });
    Mousetrap.bind('ctrl+6', function() { if(ativacaoDeAtalhoGeral){autenticacaoRelatorioFacede();}else{liberarSubMenu();} });
    Mousetrap.bind('ctrl+7', function() { if(ativacaoDeAtalhoGeral){subMenuImpressao(); liberarMousetrap();}else{liberarSubMenu();} });
    Mousetrap.bind('ctrl+8', function() { if(ativacaoDeAtalhoGeral){autenticacaoLoja();}else{liberarSubMenu();} });
    Mousetrap.bind('ctrl+9', function() { if(ativacaoDeAtalhoGeral){telaDeConfiguracaoDispositivo();}else{liberarSubMenu();} });
    Mousetrap.bind('esc', function() { if(ativacaoDeAtalhoGeral){logout(); window.location.href = "./home.html";}else{liberarSubMenu();} });
}









//funcao responsavel por pausar os atalhos
function pausarAtalhos(){
    ativacaoDeAtalhoGeral=false;
}









//funcao responsavel por retirar a pausa dos atalhos
function retirarPausaAtalho(){
    ativacaoDeAtalhoGeral=true;
}









//funcao responsavel por gerar as teclas de atalho da tela de venda
function atalhosTeclaVenda(){
    liberarMousetrap();

    Mousetrap.bind('ctrl+del', function() { removerProdutoDaLista(document.getElementById('campocodigodeleteitemvenda').value); });
    Mousetrap.bind('ctrl+enter', function() { buscarProdutoVenda(document.getElementById('campocodigoadicionaritemvenda').value); });
    Mousetrap.bind('d enter', function() { modalPagamento('dinheiro'); });
    Mousetrap.bind('c enter', function() { modalPagamento('cartao'); });
    Mousetrap.bind('q', function() { document.getElementById('qtdItemDaVenda').focus(); });
    Mousetrap.bind('r', function() { document.getElementById('campocodigodeleteitemvenda').focus(); });
    Mousetrap.bind('a', function() { document.getElementById('campocodigoadicionaritemvenda').focus(); });
    Mousetrap.bind('b', function() { liberarSubMenu(); });
    Mousetrap.bind('l', function() { modalItemVendaPorLista(); });
}









//funcao responsavel por gerar as teclas de atalho da tela de login
function atalhosTeclaLogin(){
    liberarMousetrap();

    Mousetrap.bind('enter', function() { efetuarLogin(); });
    Mousetrap.bind('left', function() { document.getElementById('login').focus(); });
    Mousetrap.bind('right', function() { document.getElementById('senha').focus(); });
}









//funcao responsavel por gerar as teclas de atalho da tela de relatorio
function atalhosTeclaRelatorio(){
    liberarMousetrap();

    Mousetrap.bind('left', function() { document.getElementById('dataInicio').focus(); });
    Mousetrap.bind('right', function() { document.getElementById('dataFim').focus(); });
}












//funcao reponsavel por gerar as teclas de atalho da tela de produto
function atalhoTeclaProduto(){
    liberarMousetrap();

    Mousetrap.bind('left', function() { document.getElementById('buscaProduto').focus(); });
    Mousetrap.bind('right', function() { document.getElementById('buscaProdutoDate').focus(); });
}











//funcao responsavel por gerar as teclas de atalho da tela de loja
function atalhoTeclaLoja(){
    liberarMousetrap();

    Mousetrap.bind('right', function() { document.getElementById('nome').focus(); });
}










//funcao responsavel por gerar as teclas de atalho da tela impressao
function atalhoTeclaImpressao(tipo){
    liberarMousetrap();

    if(tipo=="etiqueta"){
        Mousetrap.bind('left', function() { document.getElementById('quantidade').focus(); });
    }
    Mousetrap.bind('right', function() { document.getElementById('codigo').focus(); });
}










//funcao responsavel por gerar as teclas de atalho da tela de funcionario
function atalhoTeclaFuncionario(tipo){
    liberarMousetrap();

    if(tipo=="Administrador"){
        Mousetrap.bind('right', function() { document.getElementById('buscaFuncionarioByName').focus(); });
    }else{
        Mousetrap.bind('right', function() { document.getElementById('login').focus(); });
    }
}











//funcao responsavel por gerar as teclas de atalho da tela de fornecedor
function atalhoTeclaFornecedor(){
    liberarMousetrap();

    Mousetrap.bind('right', function() { document.getElementById('buscaFornecedor').focus(); });
}











//funcao reponsavel por gerar as teclas de atalho da tela de estoque
function atalhoTeclaEstoque(){
    liberarMousetrap();

    Mousetrap.bind('left', function() { document.getElementById('buscaProduto').focus(); });
    Mousetrap.bind('right', function() { document.getElementById('buscaProdutoQuantidade').focus(); });
}










//funcao responsavel por limpar ultimas mousetraps utilizadas
function liberarMousetrap(){
    Mousetrap.reset();
    ativarAtalhosPrincipais();
}









//funcao de inicializacao de atalhos
$(document).ready(function(){
    ativarAtalhosPrincipais();
});