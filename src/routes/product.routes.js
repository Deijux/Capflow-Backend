const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer.middleware')
const { validateProduct } = require('../validators/products.validator')
const { authMiddleware } = require('../middlewares/auth.middleware')
const {
  getProducts,
  getProductById,
  getProductByBrand,
  getAllProductByBrand,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller')

router.get('/', getProducts)
router.get('/admin', authMiddleware, getProducts)
router.get('/listed', getAllProductByBrand)
router.get('/:id', getProductById)
router.get('/brand/:brand', getProductByBrand)
router.post(
  '/',
  authMiddleware,
  upload.array('images', 5),
  validateProduct,
  createProduct,
)
router.put(
  '/:id',
  authMiddleware,
  upload.array('images', 5),
  validateProduct,
  updateProduct,
)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router
