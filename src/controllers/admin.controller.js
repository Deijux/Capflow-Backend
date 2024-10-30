const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.model')
const { handleError } = require('../helpers/handleError.helper')

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    const login = await Admin.findOne({ username })
    if (!login) throw new Error('Credenciales incorrectas')

    const isMatch = await bcrypt.compare(password, login.password)
    if (!isMatch) throw new Error('Credenciales incorrectas')

    const token = jwt.sign({ id: login._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    return res.status(201).json({ token })
  } catch (error) {
    return handleError(
      res,
      error.message === 'Credenciales incorrectas' ? 401 : 500,
      [{ msg: error.message }],
    )
  }
}

const adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body

    const findUser = await Admin.findOne({ username })
    if (findUser) {
      throw new Error('El usuario ya existe')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newAdmin = new Admin({ username, password: hashedPassword })
    await newAdmin.save()
    return res.status(200).json({ msg: 'Administrado creado con éxito' })
  } catch (error) {
    return handleError(
      res,
      error.message === 'El usuario ya existe' ? 401 : 500,
      [{ msg: error.message }],
    )
  }
}

module.exports = {
  adminLogin,
  adminRegister,
}
