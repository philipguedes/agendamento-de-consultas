'use strict'

const { Schema, model } = require('mongoose')

const AppointmentSchema = new Schema({
  status: { type: String },
  created: { type: Date, default: Date.now },
  schedule: { type: Date, required: 'This date is required!', unique: true, index: true },
  // updates: [{
  //   created: { type: Date, default: Date.now },
  //   reason: { type: String }
  // }],
  user: {
    email: { type: String },
    phone: { type: String },
    name: { type: String }
  },
  free: { type: Boolean }
})

module.exports = model('Appointment', AppointmentSchema)
