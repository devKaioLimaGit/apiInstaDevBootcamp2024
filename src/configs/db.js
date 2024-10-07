require("dotenv").config();

module.exports = {
  dialect: process.env.DIALECT, // Define o tipo de banco de dados (MySQL)
  host: process.env.HOST, // O host onde o banco de dados está rodando
  username: process.env.DB_USERNAME, // Nome de usuário para conectar ao banco de dados
  password: process.env.DB_PASSWORD, // Senha do banco de dados
  database: process.env.DATABASE, // Nome do banco de dados
  port: process.env.DB_PORT, // Porta do banco de dados
  define: {
    timestamps: true, // Habilita a criação de campos de 'createdAt' e 'updatedAt'
    underscored: true, // Converte nomes das colunas para o formato snake_case (com _)
    underscoredAll: true, // Aplica o formato snake_case a todos os nomes de colunas e tabelas
  },
};
