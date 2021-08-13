'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Saves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      lvl: {
        type: Sequelize.INTEGER
      },
      xp: {
        type: Sequelize.INTEGER
      },
      positionX: {
        type: Sequelize.INTEGER
      },
      positionY: {
        type: Sequelize.INTEGER
      },
      atk: {
        type: Sequelize.INTEGER
      },
      hp: {
        type: Sequelize.INTEGER
      },
      gold: {
        type: Sequelize.INTEGER
      },
      LoginId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Logins'
          },
          key: 'id'
        },
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Saves');
  }
};
