const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.config')

const Detail = sequelize.define(
  'Detail',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    tableName: 'details',
    timestamps: false,
  },
)

module.exports = Detail
