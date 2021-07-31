const router = require('express').Router()
const multer = require('multer')
const auth = require('./auth')
const user = require('./user')
const category = require('./category')
const post = require('./post')

// 圖片上傳資訊
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, './uploads')
  },
  filename: function (req, file, cd) {
    cd(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('image')

// 註冊、登入
router.post('/api/auth/register', auth.register)
router.post('/api/auth/login', auth.login)

// 使用者操作
router.get('/api/users/:id', user.getUser)
router.put('/api/users/:id', user.updateUser)
router.delete('/api/users/:id', user.deleteUser)

// 種類操作
router.get('/api/categories', category.getAllCategories)
router.post('/api/categories', category.postCategory)

// 貼文操作
router.post('/api/posts', post.createPost)
router.get('/api/posts/', post.getAllPost)
router.get('/api/posts/:id', post.getPost)
router.put('/api/posts/:id', post.updatePost)
router.delete('/api/posts/:id', post.deletePost)

// 圖片上傳
router.post('/api/upload', upload, (req, res) => { res.status(200).json({ message: '圖片上傳成功' }) })

module.exports = router
