### Rodando o backend:
- execute o comando `yarn` ou `npm i` para instalar as dependências.
- execute o comando `yarn dev` ou `npm run dev` para rodar o backend.

### Importando para o insomnia:
- Caso você queira ver as rotas assim como seu parâmetro e retornos, é possivel importar
todos os teste feitos para seu insomina.

- Basta clicar no botão abaixo:



### Usando o Insomnia:

- Para evitar a repetição e facilitar o manutenção usei variavéis no workspace.

- `baseUrl` a url que o node está rodando.

- `resource` a rota que está sendo acessada, geralmente o nome da página em ingles e lowcase.

- Também foi utilizado as funções do insomina para auxiliar nos teste das rotas.

- `response` faz uma requisição para uma determinada rota e paga determinado retorno.

- `timestamp` retorna a data atual.