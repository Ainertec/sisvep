# Sisvep parte Desktop

- Sistema voltado para gerenciamento de vendas<br/><br/>

- Estrutura de pastas:<br/>
Program: ficará todos os arquivos referentes ao back-end.<br/>
View: ficará todos os arquivos referente ao front-end desktop.<br/>
OBS.: em caso de duvida basta seguir o padrão do gresp-pro-desktop-finally.<br/><br/>


Requisitos:<br/><br/>
- Diagrama de caso de uso<br/>
imagem - diagrama_caso_de_uso_sisvep.png<br/>
- Requisitos minimos<br/>
```
# Produto
O produto é formado pelo: ID, Nome, descrição, valor unitário, código (barcode), data de validade, data de inclusão, referencia do fornecedor, valor de custo, quantidade estoque.
Para o produto é necessário: sistema de cadastro, sistema de busca por código, sistema de exibir todos, sistema de busca por data de validade, sistema de busca por data de inclusão, sistema de busca por quantidade em estoque, sistema de busca por nome, sistema de exclusão, sistema de atualização, sistema de atualização de estoque.
- OBS.: o sistema deve alertar quando o estoque estiver abaixo de uma quantidade determinada pelo usuário, o sistema deve alertar que existem produtos vencendo quando estes estiverem com 7 dias próximos de  seu vencimento, o sistema não deve permitir vendas de produtos com estoque zerado.

# Fornecedor
O fornecedor é formado pelo: ID, Nome, descrição, telefone, email, CNPJ ou CPF.
Para o fornecedor é necessário: sistema de cadastro, sistema de busca por nome, sistema de busca por CNPJ ou CPF, sistema de busca por id, sistema de exclusão, sistema de atualização.
- OBS.: Nenhum

# Venda
A venda é formada pelo: ID, data e hora da venda, nome de cada item da venda, valor unitário de cada item da venda, quantidade vendida de cada item da venda, valor total dos itens, forma de pagamento, referencia do funcionário responsável.
Para a venda é necessário: sistema de cadastro, sistema de busca por data da venda, sistema de busca por forma de pagamento, sistema de busca por referencia do funcionário, sistema de busca por id, sistema de busca por valor total, sistema de exclusão.
OBS.: o sistema de exclusão deverá excluir todas as vendas com mais de 7 anos, o sistema deverá atualizar o estoque de cada produto presente na venda retirando do estoque a quantidade presente na venda.

# Loja
A loja é formada pelo: ID, CNPJ ou CPF, nome, telefone, email, endereço.
Para a loja é necessário: sistema de cadastro, sistema de exibir todos, sistema de busca por todos, sistema de exclusão, sistema de atualização.
- OBS.: o sistema deve permitir o cadastro de apenas uma loja.

# Funcionário (Comum)/(Admin)
O funcionário é formado pelo: ID, nome, login, senha, tipo de funcionário (comum/admin).
Para o funcionário é necessário: sistema de cadastro, sistema de exibir todos, sistema de busca por nome, sistema de atualizar, sistema de excluir.
- OBS.: somente funcionário administrador poderá criar funcionários administradores ou comuns.

# Relatório
Relatório de lucro mensal (e uma lista separada por meses, aonde cada mês é composto pela soma das vendas referentes a ele). Relatório de produtos vendidos (é uma lista com todos os produtos dizendo quanto de cada produto foi vendido). Relatório de vendas por mês(é uma lista separada por meses aonde é somada todas as vendas referente ao mesmo). Relatório de representação de produtos nas vendas (é uma lista separada pelos produtos, a lista contém a porcentagem de respresentação de cada produto, a porcentagem é feita da seguinte forma soma-se a quantidade total de vendas de todos os produtos, depois é pego a quantidade de vendas de um unico produto depois é feito a regra de três sobre ele). Relatório de respresentação de produto sobre lucro total (é uma lista de produtos, é somado a valor total arrecadado com os produtos vendidos, após isso é feito a regra de três sobre o valor do produto e o valor total de todos os itens).
Relatório de representação de fornecimento de produtos por Fronecedor (é uma lista de fornecedores, aonde é feito uma soma dos produtos fornecidos por cada fornecedor). Valor total arrecadado (é devolvido o valor total de todas as vendas).
```
<br/><br/>
Ferramentas de desenvolvimento:<br/>
- Back end<br/>
Node JS<br/>
- Font end<br/>
Electron<br/>
- Percistencia<br/>
não definido ainda<br/><br/>

Data de inicio do projeto 24-03-2020 como consta na busca da marca no INPI<br/>
Inicio do projeto em 04-04-2020<br/><br/>

Desenvolvedores:<br/>
Aldair Klein<br/>
Cleiton Baloneker<br/>
