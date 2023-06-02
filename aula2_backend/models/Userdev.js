const { Sequelize, DataTypes } = require('sequelize');

const db = require('../database/conn')

const Userdev = db.define('Userdev', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Roledev',
      key: 'id',
    },
  },
})

module.exports = Userdev