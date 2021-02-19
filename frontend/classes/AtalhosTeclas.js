// ---------------------------------------------- teclas de atalho principal do software ----------------------------------------------

// variavel de estado de execucao dos atalhos globais
let ATIVACAODEATALHOGERAL = true

// funcao responsavel por ativar os atalhos gerais do software
function ativarAtalhosPrincipais() {
  Mousetrap.bind('ctrl+1', function () {
    if (ATIVACAODEATALHOGERAL) {
      animacaoJanela2()
      setTimeout(function () {
        autenticacaoVendaFacede()
      }, 100)
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('ctrl+2', function () {
    if (ATIVACAODEATALHOGERAL) {
      animacaoJanela2()
      setTimeout(function () {
        subMenuProduto()
        liberarMousetrap()
      }, 100)
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('ctrl+3', function () {
    if (ATIVACAODEATALHOGERAL) {
      animacaoJanela2()
      setTimeout(function () {
        autenticacaoFornecedorFacede()
      }, 100)
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('ctrl+4', function () {
    if (ATIVACAODEATALHOGERAL) {
      animacaoJanela2()
      setTimeout(function () {
        autenticacaoFuncionarioFacede()
      }, 100)
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('ctrl+5', function () {
    if (ATIVACAODEATALHOGERAL) {
      animacaoJanela2()
      setTimeout(function () {
        autenticacaoEstoqueFacede()
      }, 100)
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('ctrl+6', function () {
    if (ATIVACAODEATALHOGERAL) {
      animacaoJanela2()
      setTimeout(function () {
        autenticacaoRelatorioFacede()
      }, 100)
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('ctrl+7', function () {
    if (ATIVACAODEATALHOGERAL) {
      animacaoJanela2()
      setTimeout(function () {
        subMenuImpressao()
        liberarMousetrap()
      }, 100)
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('ctrl+8', function () {
    if (ATIVACAODEATALHOGERAL) {
      animacaoJanela2()
      setTimeout(function () {
        autenticacaoLoja()
      }, 100)
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('ctrl+9', function () {
    if (ATIVACAODEATALHOGERAL) {
      telaDeConfiguracaoDispositivo()
    } else {
      liberarSubMenu()
    }
  })
  Mousetrap.bind('esc', function () {
    if (ATIVACAODEATALHOGERAL) {
      logout()
      window.location.href = './home.html'
    } else {
      liberarSubMenu()
    }
  })
}

// funcao responsavel por pausar os atalhos
function pausarAtalhos() {
  ATIVACAODEATALHOGERAL = false
}

// funcao responsavel por retirar a pausa dos atalhos
function retirarPausaAtalho() {
  ATIVACAODEATALHOGERAL = true
}

// funcao responsavel por gerar as teclas de atalho da tela de venda
function atalhosTeclaVenda() {
  liberarMousetrap()

  Mousetrap.bind('del del', function () {
    removerProdutoDaLista(
      document.getElementById('campocodigodeleteitemvenda').value
    )
  })
  Mousetrap.bind('enter enter', function () {
    buscarProdutoVenda(
      document.getElementById('campocodigoadicionaritemvenda').value
    )
  })
  Mousetrap.bind('d enter', function () {
    modalPagamento('dinheiro')
  })
  Mousetrap.bind('c enter', function () {
    modalPagamento('cartao')
  })
  Mousetrap.bind('q', function () {
    document.getElementById('qtdItemDaVenda').focus()
  })
  Mousetrap.bind('r', function () {
    document.getElementById('campocodigodeleteitemvenda').focus()
  })
  Mousetrap.bind('a', function () {
    document.getElementById('campocodigoadicionaritemvenda').focus()
  })
  Mousetrap.bind('b b', function () {
    liberarSubMenu()
  })
  Mousetrap.bind('l', function () {
    modalItemVendaPorLista()
  })
}

// funcao responsavel por gerar as teclas de atalho da tela de login
function atalhosTeclaLogin() {
  liberarMousetrap()

  Mousetrap.bind('enter', function () {
    efetuarLogin()
  })
  Mousetrap.bind('left', function () {
    document.getElementById('login').focus()
  })
  Mousetrap.bind('right', function () {
    document.getElementById('senha').focus()
  })
  Mousetrap.bind('up', function () {
    document.getElementById('login').focus()
  })
  Mousetrap.bind('down', function () {
    document.getElementById('senha').focus()
  })
}

// funcao responsavel por limpar ultimas mousetraps utilizadas
function liberarMousetrap() {
  Mousetrap.reset()
  ativarAtalhosPrincipais()
}

// funcao de inicializacao de atalhos
$(document).ready(function () {
  ativarAtalhosPrincipais();
})
