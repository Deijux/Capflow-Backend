const { validationResult } = require('express-validator')
const errorFormatter = require('../validators/errorFormat.validator')
const { handleError } = require('../helpers/handleError.helper')

const validateResult = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter)

  if (!errors.isEmpty()) {
    return handleError(res, errors.array(), 403)
  }

  return next()
}

module.exports = { validateResult }
