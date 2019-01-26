'use strict'

const appointmentApi = require('./appointment')

async function putClient ({ date, email, phone, name }) {
  const user = { email, phone, name }
  const result = await appointmentApi.allocate(date, user)
  return result
}

module.exports = {
  putClient
}
