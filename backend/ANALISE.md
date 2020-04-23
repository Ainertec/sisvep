## Requisitos Funcionais

- Relacionar produtos com fornecedores, crud de ambós;
- Buscar um produto por nome,código, validade, inclusão, estoque e por fornecedor;
- Buscar um fornecedor por nome, cpf/cnpj, id;
- Relacionar venda com funcionario e produto, crud;
- Buscar uma venda por id, data, forma de pagamento, funcionário e valor total;
- Crud da loja com busca por id;
- Crud de Funcionário, busca por nome, código de acesso e id;

## Requisitos não Funcionais

- O sitema deve se o mais rapido possivél;
- Utilizar express;
- Utilizar MongoDB/MySql;
- Api restfull;

## Regras de Negócio

- Controle de estoque (venda e produto);
- Alerta de produtos vencendo;
- *Não permitir venda com estoques zerados;
- Excluir vendas com mais de 7 anos;
- Cadastro de apenas uma loja;
- Somente funcionários admin podem criar funcionários;
- Calcular as horas trabalhadas dentro de um período informado para um funcionário informado;

## Descrição do Product Owner

### Produto

O produto é formado pelo: ID, Nome, descrição, valor unitário, código (barcode), data de validade, data de inclusão, referencia do fornecedor, valor de custo, quantidade estoque.

Para o produto é necessário: Crud, sistema de busca por: código, todos, id, data de validade, referencia do fornecedor, data de inclusão, estoque e nome. E sistema de atualização de estoque.

- OBS.: Quando o estoque estiver abaixo de uma quantidade determinada pelo usuário, o sistema deve alertar que existem produtos vencendo quando estes estiverem com 7 dias próximos de seu vencimento, o sistema não deve permitir vendas de produtos com estoque zerado.

### Fornecedor

O fornecedor é formado pelo: ID, Nome, descrição, telefone, email, CNPJ ou CPF.

Para o fornecedor é necessário: Crud, sistema de busca por nome, sistema de busca por CNPJ ou CPF e id.

- OBS.: Nenhum

### Venda

A venda é formada pelo: ID, data e hora da venda, nome de cada item da venda, valor unitário de cada item da venda, quantidade vendida de cada item da venda, valor total dos itens, forma de pagamento, referencia do funcionário responsável.

Para a venda é necessário: sistema de cadastro, sistema de busca por: Data da venda, forma de pagamento, referencia do funcionário, id, total, sistema de exclusão.

OBS.: o sistema de exclusão deverá excluir todas as vendas com mais de 7 anos, o sistema deverá atualizar o estoque de cada produto presente na venda retirando do estoque a quantidade presente na venda.

### Loja

A loja é formada pelo: ID, CNPJ ou CPF, nome, telefone, email, endereço.

Para a loja é necessário: Crud, sistema de exibir todos, e por id.

- OBS.: Cadastro de apenas uma loja.

### Funcionário (Comum)/(Admin)

O funcionário é formado pelo: ID, CPF ou CNPJ, nome, (relação de horas trabalhadas por dia trabalhado), código de acesso, tipo de funcionário (comum/admin).

Para o funcionário é necessário: Crud sistema de busca por: id, todos, nome, código de acesso(senha), sistema de cadastrar horas trabalhadas.

- OBS.: calcular as horas trabalhadas dentro de um período informado para um funcionário informado, somente funcionário administrador poderá criar funcionários administradores ou comuns.
