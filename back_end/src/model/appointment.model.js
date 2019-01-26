'use strict'

const { Schema, model } = require('mongoose')

const AppointmentSchema = new Schema({
  date: { type: Date, required: true },
  client: {
    email: { type: String, required: true },
    phone: String,
    name: String
  }
})

module.exports = model('Appointment', AppointmentSchema)
