'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      pin_code: {
        type: DataTypes.STRING
      },
      phone_no: {
        type: DataTypes.STRING
      },
      userId:{
        type: DataTypes.INTEGER,

        references: {
          model: 'users',
          key:"id",
        },onDelete:'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Addresses');
  }
};