'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('donations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      donorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      donorEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USD',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      paymentMethod: {
        type: Sequelize.ENUM('credit_card', 'paypal', 'bank_transfer', 'other'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    // Agregar índice para email si es necesario
    await queryInterface.addIndex('donations', ['donorEmail']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('donations');
  }
};