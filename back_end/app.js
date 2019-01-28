'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const { dbUrl, port } = require('./config')
const createApiRoutes = require('./src/routes')
const app = express()

/* CORS */
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

app.use(helmet())

/* Mongo */
mongoose.connect(dbUrl, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', () => { console.error('error connect mongodb') })

/* App */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* Routes */
createApiRoutes(app)

/* Listen */
app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
