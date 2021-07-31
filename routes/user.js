const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')

const user = {
  // 取得使用者
  getUser: async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.findById(id)
      const { password, ...info } = user._doc
      res.status(200).json(info)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  // 更新使用者資訊
  updateUser: async (req, res) => {
    const { userId, password } = req.body
    const id = req.params.id
    if (userId === id) {
      try {
        if (password) {
          const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(password, salt)
        }
        try {
          const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
          )
          res.status(200).json({ updateUser, message: '資料更新成功' })
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      } catch (err) {
        res.status(404).json({ message: '密碼錯誤' })
      }
    } else {
      res.status(401).json({ message: '只能更新自己的資訊' })
    }
  },
  // 刪除使用者
  deleteUser: async (req, res) => {
    const { userId } = req.body
    const id = req.params.id
    if (userId === id) {
      try {
        const user = await User.findById(id)
        try {
          await Post.deleteMany({ username: user.username })
          await User.findByIdAndDelete(id)
          res.status(200).json({ message: '使用者刪除成功' })
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      } catch (err) {
        res.status(404).json({ message: '找不到使用者' })
      }
    } else {
      res.status(401).json({ message: '只能刪除自己的資訊' })
    }
  }
}

module.exports = user
