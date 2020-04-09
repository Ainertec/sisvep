### Venda
 ID, data e hora da venda, nome de cada item da venda, valor unitário de cada item da venda, quantidade vendida de cada item da venda, valor total dos itens, forma de pagamento, referencia do funcionário responsável.

### Produto  
ID, Nome, descrição, valor unitário, código (barcode), data de validade, data de inclusão, referencia do fornecedor, valor de custo, quantidade estoque.

### Fornecedor
 ID, Nome, descrição, telefone, email, CNPJ ou CPF.

### Funcionário
 ID, CPF ou CNPJ, nome, (relação de horas trabalhadas por dia trabalhado), código de acesso, tipo de funcionário (comum/admin).

### Loja
 ID, CNPJ ou CPF, nome, telefone, email, endereço.



#### em MongoDB:

##### Loja:
 {
  _id:Object._id,
  Cnpj/cpf: ,
  nome:
  telefone: [],
  email: [],
  endereço: {
  rua:
  número:
  cidade:
  estado:
  cep:
  }

}
<!-- ID, Nome, descrição, valor unitário, código (barcode), data de validade, data de inclusão, referencia do fornecedor, valor de custo, quantidade estoque. -->

##### Produto
{
  _id: ,
  decricao: ,
  valorUnitario ,
  barcode: ,
  dataDeValidade: date ,
  createAt: ,
  fornecedor_id: ,
  custo:
  estoque: 
}
<!-- ID, Nome, descrição, telefone, email, CNPJ ou CPF. -->

##### Fornecedor
{
  _id: ,
  nome: ,
  descricao: ,
  telefone:[],
  email: [],
  Cnpj/cpf: ,
  produtos:[
    {
      produto_id: 
    }
  ]
}
<!-- #### (Análisar relação) Utra forma seria:
##### Fornecedor
{
  _id: ,
  decricao: ,
  valorUnitario ,
  barcode: ,
  dataDeValidade: date ,
  createAt: ,
  fornecedor:{
    _id: ,
  nome: ,
  descricao: ,
  telefone:[],
  email: [],
  Cnpj/cpf:
  }
  custo:
  estoque: 
} -->

<!-- ID, data e hora da venda, nome de cada item da venda, valor unitário de cada item da venda, quantidade vendida de cada item da venda, valor total dos itens, forma de pagamento, referencia do funcionário responsável. -->

##### Venda
{
  _id: 
  createAt: 
  items:[
    {
      product_id: ,
      quantidade: ,
    },
  ],
  total: ,
  forma_pagamento: ,
  funcionário_id: ,
}

<!-- ID, CPF ou CNPJ, nome, (relação de horas trabalhadas por dia trabalhado), código de acesso, tipo de funcionário (comum/admin). -->

##### Funcionário
 {
  _id: ,
  CPF/CNPJ: ,
  nome: ,
  senha: ,
  admin: true/false ,
  jornada:
    {
      horas: ,
      dias: ,
    }
}
