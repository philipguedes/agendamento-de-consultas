'use strict'

const { Schema, model } = require('mongoose')

const EntriesSchema = new Schema({
  time: Date,
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment', default: undefined }
})

const AgendaSchema = new Schema({
  day: Date,
  entries: [EntriesSchema]
})

module.exports = model('Agenda', AgendaSchema)
