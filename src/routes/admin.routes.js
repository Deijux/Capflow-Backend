const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middlewares/auth.middleware')
const { adminLogin, adminRegister } = require('../controllers/admin.controller')
const {
  registerAdminValidator,
  loginAdminValidator,
} = require('../validators/admin.validator')

router.post('/register', authMiddleware, registerAdminValidator, adminRegister)
router.post('/login', loginAdminValidator, adminLogin)

module.exports = router
