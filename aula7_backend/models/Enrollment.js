const { Sequelize, DataTypes } = require('sequelize')

const db = require('../database/conn')

const User = require('../models/User')
const TravelPackage = require('../models/TravelPackage')

const Enrollment = db.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  travelPackageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  
})

Enrollment.belongsTo(User)
Enrollment.belongsTo(TravelPackage)

module.exports = Enrollment