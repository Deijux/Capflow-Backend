const { validationResult } = require('express-validator')
const { handleError } = require('../helpers/handleError.helper')

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    return handleError(res, 403, [{ msg: error }])
  }
}

module.exports = { validateResult }
