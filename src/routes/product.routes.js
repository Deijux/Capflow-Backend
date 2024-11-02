const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer.middleware')
const { validateProduct } = require('../validators/products.validator')
const { authMiddleware } = require('../middlewares/auth.middleware')
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post(
  '/',
  authMiddleware,
  upload.array('images', 5),
  validateProduct,
  createProduct,
)
router.put('/:id', authMiddleware, validateProduct, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router
