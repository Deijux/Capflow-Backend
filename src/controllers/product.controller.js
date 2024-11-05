const Product = require('../models/product.model')
const cloudinary = require('../config/cloudinary.config')
const { handleError } = require('../helpers/handleError.helper')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json(products)
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (!product) {
      throw new Error('Producto no encontrado en la base de datos')
    }

    return res.status(200).json(product)
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, description, price, brand, details } = req.body

    const urls = []

    // Catch 1 by 1 to send a Cloudinary
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'productos', resource_type: 'image' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            },
          )
          .end(file.buffer)
      })
      urls.push(result.secure_url)
    }

    const newProduct = new Product({
      name,
      description,
      price,
      brand,
      imagesUrl: urls,
      details,
    })

    await newProduct.save()
    return res.status(201).json(newProduct)
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
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
      throw new Error('Producto no encontrado en la base de datos')
    }

    return res.status(200).json(updatedProduct)
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      throw new Error('Producto no encontrado en la base de datos')
    }

    return res.status(200).json({ message: 'Producto eliminado exitosamente' })
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
