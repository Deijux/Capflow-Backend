const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Admin } = require('../models')
const { handleError } = require('../helpers/handleError.helper')

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    const login = await Admin.findOne({ where: { username } })
    if (!login) throw new Error('Credenciales incorrectas')

    const isMatch = await bcrypt.compare(password, login.password)
    if (!isMatch) throw new Error('Credenciales incorrectas')

    const token = jwt.sign(
      { userId: login.id, role: login.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )

    return res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
      })
      .status(201)
      .json({
        message: 'Inicio de sesión realizado correctamente',
        role: login.role,
      })
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

const adminLogout = async (req, res) => {
  try {
    res
      .clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
      })
      .status(200)
      .json({ message: 'Cierre de sesión realizado correctamente' })
    return res
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

const adminRegister = async (req, res) => {
  try {
    const { username, password, role } = req.body

    const findUser = await Admin.findOne({ where: { username } })
    if (findUser) {
      throw new Error('El usuario ya existe')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await Admin.create({
      username,
      password: hashedPassword,
      role,
    })
    return res.status(200).json({ message: 'Administrador creado con éxito' })
  } catch (error) {
    return handleError(res, Array({ message: error.message }))
  }
}

module.exports = {
  adminLogin,
  adminLogout,
  adminRegister,
}
