const { sequelize } = require('../config/database.config')
const Product = require('./product.model')
const Detail = require('./detail.model')
const Admin = require('./admin.model')

Product.hasMany(Detail, {
  foreignKey: 'productId',
  as: 'details',
})

Detail.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
})

module.exports = {
  sequelize,
  Product,
  Detail,
  Admin,
}
