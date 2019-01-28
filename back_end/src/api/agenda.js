'use strict'

const _ = require('lodash')
const appointmentApi = require('./appointment')

async function putClient ({ date, email, phone, name }) {
  const user = { email, phone, name }
  const result = await appointmentApi.allocate(date, user)
  return result
}

async function getAgenda (date) {
  const agenda = []
  const result = await appointmentApi.getAppointment(date)
  _.forEach(result, (r) => {
    agenda.push(r.schedule)
  })
  return agenda
}

module.exports = {
  putClient, getAgenda
}
