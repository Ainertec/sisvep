

///--------------------------------------------tela principal de relatorio-------------------------------------------------










//funcao responsavel autenticar o acesso ao setor de relatorio
function autenticacaoRelatorioFacede(){

    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador'){
        document.getElementById('janela2').innerHTML = telaGeralRelatorio();
        graficoLucroMensal();
        graficoProdutosVendidos();
        graficoQuantidadeVendasMensal();
        graficoRepresentacaoDeProdutoSobreVendas();
        graficoRepresentacaoDeProdutoSobreLucro();
        graficoQuantidadeProdutosporFornecedor();
    }else{
        mensagemDeErro("Usuário não autorizado!");
    }

}










//funcao responsavel por gerar a tela de relatorios
function telaGeralRelatorio(){
    var codigoHTML='';

    codigoHTML+='<div id="grafico1"></div>'
    codigoHTML+='<div id="grafico2" style="margin-top:10px;"></div>'
    codigoHTML+='<div id="grafico3" style="margin-top:10px;"></div>'
    codigoHTML+='<div id="grafico4" style="margin-top:10px;"></div>'
    codigoHTML+='<div id="grafico5" style="margin-top:10px;"></div>'
    codigoHTML+='<div id="grafico6" style="margin-top:10px;"></div>'
    
    return codigoHTML;
}










//funcao responsavel por gerar a tela de relatorio de lucro mensal
function graficoLucroMensal(){

    Highcharts.chart('grafico1', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Gráfico de Lucro Mensal'
        },subtitle: {
            text: 'Este gráfico demostra o lucro total de cada mês.'
        },
        xAxis: {
            categories: ['5-2020','6-2020','7-2020','9-2020','11-2020']
        },
        yAxis: {
            title: {
                text: 'Valor (R$)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [{
            name: 'Reais',
            data: [10000.00, 20000.00, 30000.00, 40000.00, 50000.00]
        }]
    });
}










//funcao responsavel por gerar a tela de relatorio de produtos vendidos
function graficoProdutosVendidos(){

    Highcharts.chart('grafico2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gráfico Produtos Vendidos'
        },
        subtitle: {
            text: 'Este gráfico desmostra a venda de cada produto.'
        },
        xAxis: {
            categories: ['Produto 1','Produto 2','Produto 3','Produto 4','Produto 5'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quantidade (Unidade)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} Unid.</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Quantidade',
            data: [49, 60, 70, 56, 32]
        }]
    });

}










//funcao responsavel por gerar a tela de quantidade de vendas por mes
function graficoQuantidadeVendasMensal(){

    Highcharts.chart('grafico3', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Gráfico de Quantidade de Vendas Mensal'
        },subtitle: {
            text: 'Este gráfico demostra a quantidade vendas por mês.'
        },
        xAxis: {
            categories: ['5-2020','6-2020','7-2020','9-2020','11-2020']
        },
        yAxis: {
            title: {
                text: 'Quantidade (Unidade)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [{
            name: 'Quantidade',
            data: [1000, 2000, 3000, 4000, 5000]
        }]
    });
}










//funcao responsavel por gerar a tela de representacao dos produtos sobre as vendas
function graficoRepresentacaoDeProdutoSobreVendas(){

    Highcharts.chart('grafico4', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Gráfico Representação de Produtos sobre Vendas'
        },subtitle: {
            text: 'Este gráfico demostra a inferência de cada produto sobre as vendas.'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Representa',
            colorByPoint: true,
            data: [{
                name: 'Produto 1',
                y: 10.00,
            },{
                name: 'Produto 2',
                y: 20.00,
            },{
                name: 'Produto 3',
                y: 30.00,
            },{
                name: 'Produto 4',
                y: 15.00,
            },{
                name: 'Produto 5',
                y: 25.00,
            }]
        }]
    });

}










//funcao responsavel por gerar a tela de quantidade de produtos fornecidos por cada fornecedor
function graficoQuantidadeProdutosporFornecedor(){

    Highcharts.chart('grafico5', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gráfico Quantidade de Produtos Fornecidos por Fornecedor'
        },
        subtitle: {
            text: 'Este gráfico desmostra a quantidade total de produtos fornecidos por cada fornecedor.'
        },
        xAxis: {
            categories: ['Fornecedor 1','Fornecedor 2','Fornecedor 3','Fornecedor 4','Fornecedor 5'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quantidade (Unidade)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} Unid.</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Quantidade',
            data: [49, 60, 70, 56, 32]
        }]
    });

}










//funcao responsavel por gerar a tela de representacao dos produtos sobre o lucro
function graficoRepresentacaoDeProdutoSobreLucro(){

    Highcharts.chart('grafico6', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Gráfico Representação de Produtos sobre Lucro'
        },subtitle: {
            text: 'Este gráfico demostra a inferência de cada produto sobre o Lucro.'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Representa',
            colorByPoint: true,
            data: [{
                name: 'Produto 1',
                y: 10.00,
            },{
                name: 'Produto 2',
                y: 20.00,
            },{
                name: 'Produto 3',
                y: 30.00,
            },{
                name: 'Produto 4',
                y: 15.00,
            },{
                name: 'Produto 5',
                y: 25.00,
            }]
        }]
    });

}