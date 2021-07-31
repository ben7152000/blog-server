const router = require('express').Router()
const auth = require('./auth')

// 註冊、登入
router.post('/api/auth/register', auth.register)
router.post('/api/auth/login', auth.login)

module.exports = router
