const { Sequelize } = require('sequelize');
const databaseConfig = require('../configs/db');

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Verifica se a conexão foi estabelecida corretamente
    this.connection = new Sequelize(databaseConfig);

    // Aqui podemos adicionar um teste para verificar se a conexão com o banco foi bem-sucedida
    this.connection.authenticate()
      .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
      })
      .catch((error) => {
        console.error('Não foi possível conectar ao banco de dados:', error);
      });
  }
}

module.exports = new Database();
