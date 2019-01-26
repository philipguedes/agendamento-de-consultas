'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { dbUrl, port } = require('./config')
const createApiRoutes = require('./src/routes')
const app = express()

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
