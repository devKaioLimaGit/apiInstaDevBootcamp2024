// Importa o Sequelize, que é o ORM utilizado para se comunicar com o banco de dados.
const { Sequelize } = require('sequelize');

// Importa o modelo 'Users', que foi definido anteriormente.
const Users = require("../apps/models/Users");

// Cria um array 'models' contendo todos os modelos que você deseja inicializar.
const models = [Users];

// Importa a configuração do banco de dados, que deve conter detalhes como o nome do banco, usuário, senha, etc.
const databaseConfig = require('../configs/db');

// A classe 'Database' será responsável pela inicialização da conexão com o banco de dados e da configuração dos modelos.
class Database {
  // O construtor da classe chama o método 'init' para configurar tudo assim que a instância da classe for criada.
  constructor() {
    this.init();
  }

  // Método 'init' é responsável por estabelecer a conexão com o banco de dados e inicializar os modelos.
  init() {
    // Cria uma instância do Sequelize utilizando as configurações do banco de dados
    // Passando as informações de conexão (usuário, senha, host, banco de dados, etc) que foram configuradas no arquivo 'databaseConfig'.
    this.connection = new Sequelize(databaseConfig);

    // Itera sobre todos os modelos presentes no array 'models' e inicializa cada um com a conexão do Sequelize.
    models.map((model) => model.init(this.connection));

    // Aqui você tenta autenticar a conexão com o banco de dados
    // O método 'authenticate' tenta fazer uma conexão e, se der tudo certo, ele retorna uma promessa resolvida.
    // Se a conexão for bem-sucedida, exibe uma mensagem no console.
    this.connection.authenticate()
      .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
      })
      .catch((error) => {
        // Se ocorrer algum erro na conexão, ele será capturado e exibido no console.
        console.error('Não foi possível conectar ao banco de dados:', error);
      });
  }
}

// Exporta uma instância da classe 'Database', garantindo que a conexão seja feita automaticamente
// quando o arquivo for importado. Isso facilita o uso da conexão em outras partes do código.
module.exports = new Database();
