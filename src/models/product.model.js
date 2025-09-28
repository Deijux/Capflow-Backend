const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.config')

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 100] },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagesUrl: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ['brand'] }],
  },
)

module.exports = Product
