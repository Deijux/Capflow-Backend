const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helpers')

const validateProduct = [
  (req, res, next) => {
    try {
      if (req.body.product && typeof req.body.product === 'string') {
        const parsedProduct = JSON.parse(req.body.product)
        req.body = parsedProduct
      }
      next()
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Error al procesar los datos del producto',
        errors: [{ message: 'Formato de datos inválido' }],
      })
    }
  },

  check('name').notEmpty().withMessage('El nombre es obligatorio'),
  check('description').notEmpty().withMessage('La descripción es obligatoria'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  check('brand').notEmpty().withMessage('La marca es obligatoria'),
  check('details').isArray().withMessage('El campo details debe ser un array'),
  check('details')
    .custom(v => v.length > 0)
    .withMessage('El campo details no puede estar vacío'),
  check('details.*.size').notEmpty().withMessage('El tamaño es obligatorio'),
  check('details.*.stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo'),

  (req, res, next) => validateResult(req, res, next),
]

module.exports = { validateProduct }
