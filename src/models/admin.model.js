const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.config')

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [4, 20] },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ROLE_ADMIN', 'ROLE_USER'),
      allowNull: false,
      defaultValue: 'ROLE_USER',
    },
  },
  {
    tableName: 'admins',
    timestamps: false,
  },
)

module.exports = Admin
