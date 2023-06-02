const { Sequelize, DataTypes } = require('sequelize');

const db = require('../database/conn')

const Roledev = db.define('Roledev', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  })
  
  module.exports = Roledev