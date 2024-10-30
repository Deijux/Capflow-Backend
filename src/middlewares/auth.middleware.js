const jwt = require('jsonwebtoken')
const { handleError } = require('../helpers/handleError.helper')

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token)
    return handleError(res, 401, [{ msg: 'Acceso denegado. No hay token.' }])

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = verified
    next()
  } catch {
    return handleError(res, 401, [{ msg: 'Token no válido o expirado.' }])
  }
}

module.exports = { authMiddleware }
