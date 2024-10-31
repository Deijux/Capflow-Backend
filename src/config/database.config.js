const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const uri =
      process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI
        : process.env.MONGO_URI_DEVELOP
    if (!uri) {
      throw new Error('MONGO_URI no está definida en las variables de entorno')
    }
    await mongoose.connect(uri, {})
    console.log('Base de datos conectada')
  } catch (error) {
    console.error('Error al conectar la base de datos:', error)
    process.exit(1)
  }
}

module.exports = connectDB
