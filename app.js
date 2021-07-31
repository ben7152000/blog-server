// 模組
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 8081

// 中間件
app.use(express.json())
app.use(cors())

// 資料庫
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => console.log('Database connection successful'))
  .catch(err => console.log(err))

// 路由
app.use(require('./routes'))

app.listen(port, () => { console.log('Backed server is running') })
