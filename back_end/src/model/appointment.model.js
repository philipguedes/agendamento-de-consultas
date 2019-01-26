'use strict'

const { Schema, model } = require('mongoose')

const AppointmentSchema = new Schema({
  status: { type: String, default: 'created' },
  created: { type: Date, default: Date.now },
  updates: [{
    created: { type: Date, default: Date.now },
    reason: { type: String }
  }],
  user: {
    email: { type: String, required: true },
    phone: String,
    name: String
  }
})

module.exports = model('Appointment', AppointmentSchema)
