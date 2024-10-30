const express = require('express')
const router = express.Router()
const { validateProduct } = require('../validators/products.validator')
const { authMiddleware } = require('../middlewares/auth.middleware')
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller')

router.get('/', authMiddleware, getProducts)
router.get('/:id', authMiddleware, getProductById)
router.post('/', authMiddleware, validateProduct, createProduct)
router.put('/:id', authMiddleware, validateProduct, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router
