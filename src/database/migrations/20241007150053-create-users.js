"use strict";

// Importação do módulo 'query' do Express. Contudo, o 'query' não está sendo utilizado nesse arquivo,
// então é possível que essa linha seja desnecessária.
const { query } = require('express');

/** 
 * Define a migração para criar e remover a tabela 'users' no banco de dados.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  // Função 'up' é responsável pela criação da tabela no banco de dados.
  async up(queryInterface, Sequelize) {
    // Criação da tabela 'users' no banco de dados.
    await queryInterface.createTable("users", {
      // Coluna 'id', chave primária da tabela, auto-incrementada.
      id: {
        allowNull: false, // Não permite valores nulos.
        autoIncrement: true, // Será auto-incrementada.
        primaryKey: true, // Define esta coluna como chave primária.
        type: Sequelize.INTEGER, // Tipo de dado é inteiro.
      },
      // Coluna 'name', usada para armazenar o nome do usuário.
      name: {
        type: Sequelize.STRING, // Tipo de dado é string.
        allowNull: false, // Não permite valores nulos.
      },
      // Coluna 'user_name', que armazenará o nome de usuário único.
      user_name: {
        type: Sequelize.STRING, // Tipo de dado é string.
        allowNull: false, // Não permite valores nulos.
        unique: true, // Garante que o nome de usuário seja único.
      },
      // Coluna 'email', armazenará o e-mail do usuário.
      email: {
        type: Sequelize.STRING, // Tipo de dado é string.
        allowNull: false, // Não permite valores nulos.
        unique: true, // Garante que o e-mail seja único.
      },
      // Coluna 'avatar', armazenará o caminho para a imagem do avatar do usuário.
      avatar: {
        type: Sequelize.STRING, // Tipo de dado é string.
        // Não foi especificado allowNull, então o padrão será 'true', ou seja, o avatar pode ser nulo.
      },
      // Coluna 'bio', para armazenar a biografia do usuário.
      bio: {
        type: Sequelize.STRING, // Tipo de dado é string.
        // Como o campo é opcional, o padrão será 'allowNull: true'.
      },
      // Coluna 'gender', para armazenar o gênero do usuário.
      gender: {
        type: Sequelize.STRING, // Tipo de dado é string.
        // O campo 'gender' também pode ser nulo, pois não foi especificado 'allowNull'.
      },
      // Coluna 'password_hash', para armazenar a senha do usuário de forma criptografada (hash).
      password_hash: {
        type: Sequelize.STRING, // Tipo de dado é string.
        allowNull: false, // Não permite valores nulos.
      },
      // Coluna 'created_at', para armazenar a data de criação do usuário.
      created_at: {
        type: Sequelize.DATE, // Tipo de dado é data.
        allowNull: false, // Não permite valores nulos.
      },
      // Coluna 'updated_at', para armazenar a data da última atualização do usuário.
      updated_at: {
        type: Sequelize.DATE, // Tipo de dado é data.
        allowNull: false, // Não permite valores nulos.
      },
    });
  },

  // Função 'down' é responsável por reverter a migração, ou seja, remover a tabela 'users'.
  async down(queryInterface, Sequelize) {
    // Remover a tabela 'users' do banco de dados.
    await queryInterface.dropTable("users");
  },
};
