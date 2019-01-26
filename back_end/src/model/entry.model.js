'use strict'

const { Schema, model } = require('mongoose')

const EntrySchema = new Schema({
  time: {
    type: Number,
    index: {
      unique: true
    }
  }
})

module.exports = model('Entry', EntrySchema)
