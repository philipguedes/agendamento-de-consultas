'use strict'

const Model = require('../model/appointment.model')

async function create ({ name, email, phone, date }) {
  const client = { name, email, phone }
  const result = await Model.create({ client, date })
  return result
}

module.exports = {
  create
}
