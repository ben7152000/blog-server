const Category = require('../models/Category')

const category = {
  // 新增種類
  postCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body)
      const saveCategory = await newCategory.save()
      res.status(200).json({ saveCategory, message: '新增種類成功' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  // 取得所有種類
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      res.status(200).json(categories)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = category
