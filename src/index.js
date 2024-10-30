const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const express = require('express')
const connectDB = require('./config/database.config')
const productsRoutes = require('./routes/product.routes')
const adminRoutes = require('./routes/admin.routes')

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cookieParser())

app.use('/api/products', productsRoutes)
app.use('/auth', adminRoutes)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
