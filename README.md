# Sisvep parte Desktop

- Sistema voltado para gerenciamento de vendas<br/><br/>

Requisitos:<br/><br/>
-Diagrama de caso de uso<br/>
* imagem - diagrama_caso_de_uso_sisvep.png<br/>
-Diagrama de classe<br/>
`
Produto
O produto é formado pelo: ID, Nome, descrição, valor unitário, código (barcode), data de validade, data de inclusão, referencia do fornecedor, valor de custo, quantidade estoque.
Para o produto é necessário: sistema de cadastro, sistema de busca por código, sistema de exibir todos, sistema de busca por id, sistema de busca por data de validade, sistema de busca por referencia do fornecedor, sistema de busca por data de inclusão, sistema de busca por quantidade em estoque, sistema de busca por nome, sistema de exclusão, sistema de atualização, sistema de atualização de estoque.
OBS.: o sistema deve alertar quando o estoque estiver abaixo de uma quantidade determinada pelo usuário, o sistema deve alertar que existem produtos vencendo quando estes estiverem com 7 dias próximos de  seu vencimento, o sistema não deve permitir vendas de produtos com estoque zerado.

Fornecedor
O fornecedor é formado pelo: ID, Nome, descrição, telefone, email, CNPJ ou CPF.
Para o fornecedor é necessário: sistema de cadastro, sistema de busca por nome, sistema de busca por CNPJ ou CPF, sistema de busca por id, sistema de exclusão, sistema de atualização.
OBS.: Nenhum

Venda
A venda é formada pelo: ID, data e hora da venda, nome de cada item da venda, valor unitário de cada item da venda, quantidade vendida de cada item da venda, valor total dos itens, forma de pagamento, referencia do funcionário responsável.
Para a venda é necessário: sistema de cadastro, sistema de busca por data da venda, sistema de busca por forma de pagamento, sistema de busca por referencia do funcionário, sistema de busca por id, sistema de busca por valor total, sistema de exclusão.
OBS.: o sistema de exclusão deverá excluir todas as vendas com mais de 7 anos, o sistema deverá atualizar o estoque de cada produto presente na venda retirando do estoque a quantidade presente na venda.

Loja
A loja é formada pelo: ID, CNPJ ou CPF, nome, telefone, email, endereço.
Para a loja é necessário: sistema de cadastro, sistema de exibir todos, sistema de busca por id, sistema de exclusão, sistema de atualização.
OBS.: o sistema deve permitir o cadastro de apenas uma loja.

Funcionário (Comum)/(Admin)
O funcionário é formado pelo: ID, CPF ou CNPJ, nome, (relação de horas trabalhadas por dia trabalhado), código de acesso, tipo de funcionário (comum/admin).
Para o funcionário é necessário: sistema de cadastro, sistema de busca por id, sistema de exibir todos, sistema de busca por nome, sistema de busca por código de acesso, sistema de cadastrar horas trabalhadas, sistema de atualizar, sistema de excluir.
OBS.: o sistema deverá calcular as horas trabalhadas dentro de um período informado para um funcionário informado, somente funcionário administrador poderá criar funcionários administradores ou comuns.

`<br/><br/>
Ferramentas de desenvolvimento:<br/>
- Back end<br/>
* Node JS<br/>
-Font end<br/>
* Electron<br/>
-Percistencia<br/>
* não definido ainda<br/><br/>

Data de inicio do projeto 24-03-2020 como consta na busca da marca no INPI<br/>
Inicio do projeto em 04-04-2020<br/><br/>

Desenvolvedores:<br/>
Aldair Klein<br/>
Cleiton Baloneker<br/>
