const express = require('express')
const router = express.Router()
const {
  registerAdminValidator,
  loginAdminValidator,
} = require('../validators/admin.validator')
const { adminLogin, adminRegister } = require('../controllers/admin.controller')

router.post('/register', registerAdminValidator, adminRegister)
router.post('/login', loginAdminValidator, adminLogin)

module.exports = router
