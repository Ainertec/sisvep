### Rodando o backend:
- execute o comando `yarn` ou `npm i` para instalar as dependências.
- levante o servidor mongo.
- execute o comando `yarn dev` ou `npm run dev` para rodar o backend.

### Importando para o insomnia:
- Caso você queira ver as rotas assim como seu parâmetro e retornos, é possivel importar
todos os teste feitos para seu insomina.

- Basta clicar no botão abaixo:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Sisvep&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fainertec-developer%2Fsisvep-desktop-master%2Fmaster%2Fbackend%2FInsomnia_2020-04-24.json)



### Usando o Insomnia:

- Para evitar a repetição e facilitar o manutenção usei variavéis no workspace.

- `baseUrl` a url que o node está rodando.

- `resource` a rota que está sendo acessada, geralmente o nome da página em ingles e lowcase.

- Também foi utilizado as funções do insomina para auxiliar nos teste das rotas.

- `response` faz uma requisição para uma determinada rota e paga determinado retorno.

- `timestamp` retorna a data atual.