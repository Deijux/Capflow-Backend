const Product = require('../models/product.model')
const handleError = require('../helpers/handleError.helper')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json(products)
  } catch (error) {
    return handleError(res, 500, error)
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (!product) {
      return handleError(
        res,
        404,
        Array({
          msg: 'Producto no encontrado en la base de datos',
        }),
      )
    }

    return res.status(200).json(product)
  } catch (error) {
    return handleError(res, 500, error)
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, description, price, details } = req.body
    const newProduct = new Product({ name, description, price, details })

    await newProduct.save()
    return res.status(201).json(newProduct)
  } catch (error) {
    return handleError(res, 500, error)
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedProduct) {
      return handleError(
        res,
        404,
        Array({
          msg: 'Producto no encontrado en la base de datos',
        }),
      )
    }

    return res.status(200).json(updatedProduct)
  } catch (error) {
    return handleError(res, 500, error)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return handleError(
        res,
        404,
        Array({
          msg: 'Producto no encontrado en la base de datos',
        }),
      )
    }

    return res.status(200).json({ message: 'Producto eliminado exitosamente' })
  } catch (error) {
    return handleError(res, 500, error)
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
