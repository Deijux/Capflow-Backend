const { Op } = require('sequelize')
const { Product, Detail } = require('../models')
const cloudinary = require('../config/cloudinary.config')
const { handleError } = require('../helpers/handleError.helper')
const { orderProducts } = require('../helpers/orderProducts.helper')

const getProducts = async (req, res) => {
  const { q } = req.query
  try {
    let where = {}
    if (q) {
      where = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } },
          { brand: { [Op.iLike]: `%${q}%` } },
        ],
      }
    }
    const products = await Product.findAll({
      where,
      include: [{ model: Detail, as: 'details' }],
    })
    return res.status(200).json(products)
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id, {
      include: [{ model: Detail, as: 'details' }],
    })

    if (!product) {
      throw new Error('Producto no encontrado en la base de datos')
    }

    return res.status(200).json(product)
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

const getProductByBrand = async (req, res) => {
  try {
    const { brand } = req.params
    const products = await Product.findAll({
      where: { brand: { [Op.iLike]: `%${brand}%` } },
      include: [{ model: Detail, as: 'details' }],
    })

    if (products.length <= 0)
      throw new Error('Productos no encontrado en la base de datos')

    return res.status(200).json(products)
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

const getAllProductByBrand = async (req, res) => {
  const { q } = req.query
  try {
    let where = {}
    if (q) {
      where = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } },
          { brand: { [Op.iLike]: `%${q}%` } },
        ],
      }
    }
    const products = await Product.findAll({
      where,
      include: [{ model: Detail, as: 'details' }],
    })
    return res.status(200).json(orderProducts(products))
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    return res.status(500).json({ message: 'Error al obtener los productos' })
  }
}

const createProduct = async (req, res) => {
  const urls = []
  const publicIds = []

  try {
    const { name, description, price, brand, details } = req.body

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
      publicIds.push(result.public_id)
      urls.push(result.secure_url)
    }

    const newProduct = await Product.create(
      {
        name,
        description,
        price,
        brand,
        imagesUrl: urls,
        details: Array.isArray(details) ? details : JSON.parse(details),
      },
      { include: [{ model: Detail, as: 'details' }] },
    )
    return res.status(201).json(newProduct)
  } catch (error) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(publicId)
    }
    return handleError(res, Array({ message: error.message }))
  }
}

const updateProduct = async (req, res) => {
  const urls = []
  const publicIds = []
  try {
    const { id } = req.params
    const productData = req.body
    const { name, description, price, brand, details, existingImages } =
      productData

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: 'productos' }, (error, result) => {
              if (error) reject(error)
              else resolve(result)
            })
            .end(file.buffer)
        })
        publicIds.push(result.public_id)
        urls.push(result.secure_url)
      }
    }

    const allImages = [...existingImages, ...urls]

    const product = await Product.findByPk(id, {
      include: [{ model: Detail, as: 'details' }],
    })
    if (!product) {
      throw new Error('Producto no encontrado en la base de datos')
    }

    await product.update({
      name,
      description,
      price,
      brand,
      imagesUrl: allImages,
    })

    if (details) {
      const parsedDetails = Array.isArray(details)
        ? details
        : JSON.parse(details)

      await Detail.destroy({ where: { productId: id } })
      await Detail.bulkCreate(parsedDetails.map(d => ({ ...d, productId: id })))
    }

    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: Detail, as: 'details' }],
    })

    return res.status(200).json(updatedProduct)
  } catch (error) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(publicId).catch(console.error)
    }
    return handleError(res, Array({ message: 'aqui' + error.message }))
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const deletedCount = await Product.destroy({
      where: { id },
    })

    if (deletedCount === 0) {
      throw new Error('Producto no encontrado en la base de datos')
    }

    return res.status(200).json({ message: 'Producto eliminado exitosamente' })
  } catch (error) {
    return handleError(res, [{ message: error.message }])
  }
}

module.exports = {
  getProducts,
  getProductById,
  getProductByBrand,
  getAllProductByBrand,
  createProduct,
  updateProduct,
  deleteProduct,
}
