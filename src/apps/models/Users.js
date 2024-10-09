const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs")

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        user_name: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar: Sequelize.STRING,
        bio: Sequelize.STRING,
        gender: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize, // Aqui você deve passar o sequelize para o segundo parâmetro.
        tableName: 'users', // Caso você queira especificar um nome de tabela
        timestamps: true,    // Caso você queira que a tabela tenha os campos 'created_at' e 'updated_at'
      }
    );
    this.addHook("beforeSave", async (user)=>{
      if(user.password){
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(passaword){
    return bcryptjs.compare(passaword, this.password_hash)
  }
}

module.exports = Users;  // Aqui estamos exportando a classe Users, não a instância.
