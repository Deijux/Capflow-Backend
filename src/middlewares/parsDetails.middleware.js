const { handleError } = require('../helpers/handleError.helper')

const parseDetails = (req, res, next) => {
  try {
    if (req.body.details) {
      req.body.details = JSON.parse(req.body.details) // Convertir a objeto/array
    }
    next()
  } catch {
    return handleError(
      res,
      Array({ message: 'El campo details debe ser un array JSON válido' }),
    )
  }
}

module.exports = parseDetails
