const Product = require('../models/product.model')

const getProducts = async (req, res) => {
	try {
		const products = await Product.find()
		res.status(200).json(products)
	} catch (error) {
		res.status(500).json({ message: 'Error al obtener los productos', error })
	}
}

const getProductById = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)

		if (!product) {
			res.status(404).json({
				message: 'Error al buscar producto',
				error: 'Producto no encontrado en la base de datos',
			})
		}

		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ message: 'Error al obtener el producto', error })
	}
}

const createProduct = async (req, res) => {
	try {
		const { name, description, price, details } = req.body
		const newProduct = new Product({ name, description, price, details })

		await newProduct.save()
		res.status(201).json(newProduct)
	} catch (error) {
		res.status(500).json({ message: 'Error al crear el producto', error })
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
			res.status(404).json({
				message: 'Error al actualizar producto',
				error: 'Producto no encontrado en la base de datos',
			})
		}

		res.status(200).json(updatedProduct)
	} catch (error) {
		res.status(500).json({ message: 'Error al actualizar el producto', error })
	}
}

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params
		const deletedProduct = await Product.findByIdAndDelete(id)

		if (!deletedProduct) {
			res.status(404).json({
				message: 'Error al eliminar producto',
				error: 'Producto no encontrado en la base de datos',
			})
		}

		res.status(200).json({ message: 'Producto eliminado exitosamente' })
	} catch (error) {
		res.status(500).json({ message: 'Error al eliminar el producto', error })
	}
}

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
}
