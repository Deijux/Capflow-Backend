const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')

dotenv.config()
const sequelize = require('./config/database.config')

const corsOptions = require('./config/cors.config')
const productsRoutes = require('./routes/product.routes')
const adminRoutes = require('./routes/admin.routes')

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/api/products', productsRoutes)
app.use('/api/auth', adminRoutes)

sequelize
  .sync({ alter: true }) // Alter ajusta columnas si cambian los modelos (solo en desarrollo)
  .then(() => {
    console.log('✅ Modelos sincronizados con la base de datos')
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ Error al conectar a la BD:', err.message)
    process.exit(1)
  })
