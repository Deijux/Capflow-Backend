const mongoose = require('mongoose')
const { Schema, model } = mongoose

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, require: true },
})

const Admin = model('Admin', adminSchema)

module.exports = Admin
