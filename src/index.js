const dotenv = require('dotenv')
const express = require('express')
const connectDB = require('./config/database.config')
const productsRoutes = require('./routes/product.routes')

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())

app.use('/api/products', productsRoutes)

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
