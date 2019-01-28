'use strict'

const _ = require('lodash')
const appointmentApi = require('./appointment')

async function postAgenda ({ schedule, email, phone, name }) {
  const user = { email, phone, name }
  const result = await appointmentApi.allocate(schedule, user)
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
  postAgenda, getAgenda
}
