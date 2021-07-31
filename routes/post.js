const Post = require('../models/Post')

const post = {
  // 取得貼文
  getPost: async (req, res) => {
    const id = req.params.id
    try {
      const post = await Post.findById(id)
      res.status(200).json({ post, message: '成功取得貼文' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  // 取得所有貼文
  getAllPost: async (req, res) => {
    const username = req.query.user
    const categoryName = req.query.category
    try {
      let posts
      if (username) {
        posts = await Post.find({ username })
      } else if (categoryName) {
        posts = await Post.find({
          categories: { $in: [categoryName] }
        })
      } else {
        posts = await Post.find()
      }
      res.status(200).json({ posts, message: '成功取得貼文' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  // 建立貼文
  createPost: async (req, res) => {
    const newPost = new Post(req.body)
    try {
      const savedPost = await newPost.save()
      res.status(200).json({ savedPost, message: '貼文建立成功' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  // 更新貼文
  updatePost: async (req, res) => {
    const { username } = req.body
    const id = req.params.id
    try {
      const post = await Post.findById(id)
      if (post.username === username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
          )
          res.status(200).json({ updatedPost, message: '貼文更新成功' })
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      } else {
        res.status(401).json({ message: '只能更新自己的貼文' })
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  // 刪除貼文
  deletePost: async (req, res) => {
    const { username } = req.body
    const id = req.params.id
    try {
      const post = await Post.findById(id)
      if (post.username === username) {
        try {
          await post.delete()
          res.status(200).json({ message: '貼文刪除成功' })
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      } else {
        res.status(401).json({ message: '只能刪除自己的貼文' })
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = post
