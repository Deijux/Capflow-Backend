const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helpers')

const validateProduct = [
  check('name').notEmpty().withMessage('El nombre es obligatorio'),
  check('description').notEmpty().withMessage('La descripción es obligatoria'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  check('brand').notEmpty().withMessage('La marca es obligatoria'),
  check('details').isArray().withMessage('El campo details debe ser un array'),
  check('details')
    .custom(value => value.length > 0)
    .withMessage('El campo details no puede estar vacío'),
  check('details.*.size').notEmpty().withMessage('El tamaño es obligatorio'),
  check('details.*.stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo'),

  (req, res, next) => {
    validateResult(req, res, next)
  },
]

module.exports = { validateProduct }
