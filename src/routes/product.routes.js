const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer.middleware')
const { validateProduct } = require('../validators/products.validator')
const { authMiddleware } = require('../middlewares/auth.middleware')
const parseDetails = require('../middlewares/parsDetails.middleware')
const {
  getProductById,
  getProductByBrand,
  getAllProductByBrand,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller')

router.get('/', getAllProductByBrand)
router.get('/:id', getProductById)
router.get('/brand/:brand', getProductByBrand)
router.post(
  '/',
  authMiddleware,
  upload.array('images', 5),
  parseDetails,
  validateProduct,
  createProduct,
)
router.put('/:id', authMiddleware, validateProduct, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router
