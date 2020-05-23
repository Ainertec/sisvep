// /--------------------------------------------tela principal de relatorio-------------------------------------------------

// funcao responsavel autenticar o acesso ao setor de relatorio
async function autenticacaoRelatorioFacede() {
  const situacao = autenticacaoLogin()

  if (JSON.parse(situacao).tipo == 'Administrador') {
    await requisicaoDELETE('sales', '', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
    document.getElementById('janela2').innerHTML = telaGeralRelatorio()
  } else {
    mensagemDeErro('Usuário não autorizado!')
  }
}

// funcao responsavel por gerar a tela de relatorios
function telaGeralRelatorio() {
  let codigoHTML = ''

  codigoHTML += '<h3 class="text-center">Relatórios</h3>'

  codigoHTML +=
    '<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
  codigoHTML += '<h5 class="text-center">Data inicial</h5>'
  codigoHTML += '<div class="input-group mb-3">'
  codigoHTML +=
    '<input id="dataInicio" type="date" class="form-control mousetrap" aria-label="Recipients username" aria-describedby="botaoBuscar">'
  codigoHTML += '</div>'
  codigoHTML += '<h5 class="text-center">Data final</h5>'
  codigoHTML += '<div class="input-group mb-3">'
  codigoHTML +=
    '<input id="dataFim" type="date" class="form-control mousetrap" aria-label="Recipients username" aria-describedby="botaoBuscar">'
  codigoHTML += '</div>'
  codigoHTML +=
    '<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
  codigoHTML +=
    '<button onclick="if(validaDadosCampo([\'#dataInicio\',\'#dataFim\'])){graficoLucroMensal(); graficoQuantidadeVendasMensal();}else{mensagemDeErro(\'Preencha os campos de data inicial e data final!\');}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Relatórios periódicos</button>'
  codigoHTML +=
    '<button onclick="graficoLucroTotal(); graficoProdutosVendidos(); graficoRepresentacaoDeProdutoSobreVendas(); graficoRepresentacaoDeProdutoSobreLucro(); graficoQuantidadeProdutosporFornecedor();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Relatórios completos</button>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'

  codigoHTML += '<div id="grafico0" style="margin-top:10px;"></div>'
  codigoHTML += '<div id="grafico1" style="margin-top:10px;"></div>'
  codigoHTML += '<div id="grafico2" style="margin-top:10px;"></div>'
  codigoHTML += '<div id="grafico3" style="margin-top:10px;"></div>'
  codigoHTML += '<div id="grafico4" style="margin-top:10px;"></div>'
  codigoHTML += '<div id="grafico5" style="margin-top:10px;"></div>'
  codigoHTML += '<div id="grafico6" style="margin-top:10px;"></div>'

  return codigoHTML
}

// funcao responsavel por gerar a tela de relatorio de lucro mensal
async function graficoLucroMensal() {
  try {
    const json = await requisicaoGET(
      `report?initialDate=${$('#dataInicio').val()}&finalDate=${$(
        '#dataFim'
      ).val()}`,
      { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
    )
    let cont = 0
    var vetor1 = []
    var vetor2 = []

    while (json.data[cont]) {
      vetor1.push(
        `Data: ${json.data[cont]._id.month}/${json.data[cont]._id.year}`
      )
      vetor2.push(json.data[cont].amount)
      cont++
    }
  } catch (error) {
    mensagemDeErro('Não foi possível carregar o gráfico Lucro Mensal!')
  }

  Highcharts.chart('grafico1', {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Gráfico de Lucro Mensal',
    },
    subtitle: {
      text: 'Este gráfico demostra o lucro total de cada mês.',
    },
    xAxis: {
      categories: vetor1,
    },
    yAxis: {
      title: {
        text: 'Valor (R$)',
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: 'Reais',
        data: vetor2,
      },
    ],
  })
}

// funcao responsavel por gerar a tela de relatorio de produtos vendidos
async function graficoProdutosVendidos() {
  try {
    const json = await requisicaoGET('report_soldouts', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
    let cont = 0
    var vetor1 = []
    var vetor2 = []

    while (json.data[cont]) {
      vetor1.push(corrigirTamanhoString(15, json.data[cont]._id.name))
      vetor2.push(json.data[cont].soldout)
      cont++
    }
  } catch (error) {
    mensagemDeErro('Não foi possível carregar o gráfico Produtos Vendidos!')
  }

  Highcharts.chart('grafico2', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Gráfico Produtos Vendidos',
    },
    subtitle: {
      text: 'Este gráfico desmostra a venda de cada produto.',
    },
    xAxis: {
      categories: vetor1,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantidade (Unidade)',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Unid.</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Quantidade',
        data: vetor2,
      },
    ],
  })
}

// funcao responsavel por gerar a tela de quantidade de vendas por mes
async function graficoQuantidadeVendasMensal() {
  try {
    const json = await requisicaoGET(
      `report_solds_by_month?initialDate=${$(
        '#dataInicio'
      ).val()}&finalDate=${$('#dataFim').val()}`,
      { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }
    )
    let cont = 0
    var vetor1 = []
    var vetor2 = []

    while (json.data[cont]) {
      vetor1.push(
        `Data: ${json.data[cont]._id.month}/${json.data[cont]._id.year}`
      )
      vetor2.push(json.data[cont].total)
      cont++
    }
  } catch (error) {
    mensagemDeErro(
      'Não foi possível carregar o gráfico Quantidade de Vendas Mensal!'
    )
  }

  Highcharts.chart('grafico3', {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Gráfico de Quantidade de Vendas Mensal',
    },
    subtitle: {
      text: 'Este gráfico demostra a quantidade vendas por mês.',
    },
    xAxis: {
      categories: vetor1,
    },
    yAxis: {
      title: {
        text: 'Quantidade (Unidade)',
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: 'Quantidade',
        data: vetor2,
      },
    ],
  })
}

// funcao responsavel por gerar a tela de representacao dos produtos sobre as vendas
async function graficoRepresentacaoDeProdutoSobreVendas() {
  try {
    var json = await requisicaoGET('report_products_total_percent', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
    let cont = 0

    while (json.data[cont]) {
      json.data[cont] = JSON.parse(
        `{"name": "${corrigirTamanhoString(
          15,
          json.data[cont]._id.name
        )}","y": ${json.data[cont].soldout}}`
      )
      cont++
    }
  } catch (error) {
    mensagemDeErro(
      'Não foi possível carregar o gráfico Representação de Produtos sobre Vendas!'
    )
  }

  Highcharts.chart('grafico4', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Gráfico Representação de Produtos sobre Vendas',
    },
    subtitle: {
      text:
        'Este gráfico demostra a inferência de cada produto sobre as vendas.',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Representa',
        colorByPoint: true,
        data: json.data,
      },
    ],
  })
}

// funcao responsavel por gerar a tela de quantidade de produtos fornecidos por cada fornecedor
async function graficoQuantidadeProdutosporFornecedor() {
  try {
    const json = await requisicaoGET('report_providers_products', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
    let cont = 0
    var vetor1 = []
    var vetor2 = []

    while (json.data[cont]) {
      vetor1.push(corrigirTamanhoString(15, json.data[cont].name))
      vetor2.push(json.data[cont].totalProducts)
      cont++
    }
  } catch (error) {
    mensagemDeErro(
      'Não foi possível carregar o gráfico Quantidade de Produtos Fornecidos por Fornecedor!'
    )
  }

  Highcharts.chart('grafico5', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Gráfico Quantidade de Produtos Fornecidos por Fornecedor',
    },
    subtitle: {
      text:
        'Este gráfico desmostra a quantidade total de produtos fornecidos por cada fornecedor.',
    },
    xAxis: {
      categories: vetor1,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantidade (Unidade)',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Unid.</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Quantidade',
        data: vetor2,
      },
    ],
  })
}

// funcao responsavel por gerar a tela de representacao dos produtos sobre o lucro
async function graficoRepresentacaoDeProdutoSobreLucro() {
  try {
    var json = await requisicaoGET('report_products_amount_percent', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
    let cont = 0

    while (json.data[cont]) {
      json.data[cont] = JSON.parse(
        `{"name": "${corrigirTamanhoString(
          15,
          json.data[cont]._id.name
        )}","y": ${json.data[cont].soldout}}`
      )
      cont++
    }
  } catch (error) {
    mensagemDeErro(
      'Não foi possível carregar o gráfico Representação de Produtos sobre Lucro!'
    )
  }

  Highcharts.chart('grafico6', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Gráfico Representação de Produtos sobre Lucro',
    },
    subtitle: {
      text: 'Este gráfico demostra a inferência de cada produto sobre o Lucro.',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Representa',
        colorByPoint: true,
        data: json.data,
      },
    ],
  })
}

// funcao responsavel por gerar a tela de respresentacao de lucro total
async function graficoLucroTotal() {
  try {
    var json = await requisicaoGET('report_sales_amount', {
      headers: { Authorization: `Bearer ${buscarSessionUser().token}` },
    })
  } catch (error) {
    mensagemDeErro(
      'Não foi possível carregar o gráfico Demonstrativo de Lucro Total!'
    )
  }

  Highcharts.chart('grafico0', {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Demostrativo de Lucro Total',
    },
    subtitle: {
      text: 'Este gáfico demonstra a valor total arrecado sobre as vendas.',
    },
    xAxis: {
      categories: ['Valor total'],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0.0,
      title: {
        text: 'Valor (R$ x.xx)',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: ' reais',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Valor total',
        data: [parseFloat(json.data.total)],
      },
    ],
  })
}
