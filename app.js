// 模組
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8081

// 中間件
app.use(express.json())
app.use(cors())

app.listen(port, () => { console.log('Backed server is running') })
