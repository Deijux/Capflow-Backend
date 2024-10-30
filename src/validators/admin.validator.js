const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helpers')

const registerAdminValidator = [
  check('username').notEmpty().withMessage('El nombre de usuario es requerido'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  (req, res, next) => {
    validateResult(req, res, next)
  },
]

const loginAdminValidator = [
  check('username').notEmpty().withMessage('El nombre de usuario es requerido'),
  check('password').notEmpty().withMessage('La contraseña es requerida'),

  (req, res, next) => {
    validateResult(req, res, next)
  },
]

module.exports = { registerAdminValidator, loginAdminValidator }
