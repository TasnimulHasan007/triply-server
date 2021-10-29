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

// mongodb info
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lmhyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function run() {
  try {
    await client.connect()
    const database = client.db('Triply')
    const toursCollection = database.collection('tours')

    // POST API
    app.post('/tours', async (req, res) => {
      const tour = req.body
      const result = await toursCollection.insertOne(tour)
      res.json(result)
    })

    // GET API
    app.get('/tours', async (req, res) => {
      const cursor = toursCollection.find({})
      const tours = await cursor.toArray()
      res.send(tours)
    })
  } finally {
    // await client.close()
  }
}
run().catch(console.dir)

// testing server
app.get('/', (req, res) => {
  res.send('Running Triply server')
})

// running server
app.listen(port, () => {
  console.log(`server listening at port: ${port}`)
})
