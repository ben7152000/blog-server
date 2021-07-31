const User = require('../models/User')
const bcrypt = require('bcrypt')

const auth = {
  // 註冊
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const newUser = new User({
        username,
        email,
        password: hashPassword
      })
      const user = await newUser.save()
      res.status(200).json({ user, message: '註冊成功' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  // 登入
  login: async (req, res) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      !user && res.status(400).json('帳號或密碼錯誤')
      const validated = await bcrypt.compare(password, user.password)
      !validated && res.status(400).json('密碼錯誤')
      const { userPassword, ...info } = user._doc
      res.status(200).json({ info, message: '登入成功' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = auth
