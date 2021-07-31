const router = require('express').Router()
const auth = require('./auth')
const user = require('./user')

// 註冊、登入
router.post('/api/auth/register', auth.register)
router.post('/api/auth/login', auth.login)

// 使用者操作
router.get('/api/users/:id', user.getUser)
router.put('/api/users/:id', user.updateUser)
router.delete('/api/users/:id', user.deleteUser)

module.exports = router
