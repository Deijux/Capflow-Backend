const { validationResult } = require('express-validator')
const { httpError } = require('../helpers/handleError.helper')

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    return httpError(res, 403, error.array())
  }
}

module.exports = { validateResult }
