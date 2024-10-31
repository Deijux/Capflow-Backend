const mongoose = require('mongoose')
const { Schema, model } = mongoose

const detailSchema = new Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
})

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  imagesUrl: { type: [String], required: true },
  details: { type: [detailSchema], required: true },
})

const Product = model('Product', productSchema)

module.exports = Product
