const { Sequelize } = require('sequelize')

const isProd = process.env.NODE_ENV === 'production'

const sequelize = new Sequelize(
  isProd ? process.env.DB_NAME : process.env.DB_NAME_DEV,
  isProd ? process.env.DB_USER : process.env.DB_USER_DEV,
  isProd ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_DEV,
  {
    host: isProd ? process.env.DB_HOST : process.env.DB_HOST_DEV,
    port: isProd ? process.env.DB_PORT : process.env.DB_PORT_DEV,
    dialect: 'postgres',
    logging: false,
  },
)
module.exports = sequelize
