//imports
const express = require('express')
const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// testing server
app.get('/', (req, res) => {
  res.send('Running Triply server')
})

// running server
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})
