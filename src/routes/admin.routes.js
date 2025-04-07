const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middlewares/auth.middleware')
const {
  adminLogin,
  adminLogout,
  adminRegister,
} = require('../controllers/admin.controller')
const {
  registerAdminValidator,
  loginAdminValidator,
} = require('../validators/admin.validator')

router.post('/register', authMiddleware, registerAdminValidator, adminRegister)
router.post('/login', loginAdminValidator, adminLogin)
router.post('/logout', authMiddleware, adminLogout)

module.exports = router
