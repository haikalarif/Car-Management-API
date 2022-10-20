'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('operations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcar: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cars',
          key: 'id',
        },
      },
      iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('operations');
  }
};