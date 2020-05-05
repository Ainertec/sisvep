## Query para inserção do usuário admin no banco de dados
db.users.insert(
  {
    "admin":true,
    "name":"admin",
    "question":"Qual o nome da sua mãe?",
    "response":"admin",
    "password_hash":"$2a$08$/Ji.Ih6mIfYNyHDsWvAD1.skWq81Kbwkvs9QNcx8mMItbnVPR0VI6"
  })