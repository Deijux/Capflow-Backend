const express = require('express')
const router = express.Router()
const { validateProduct } = require('../validators/products.validator')
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', validateProduct, createProduct)
router.put('/:id', validateProduct, updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
