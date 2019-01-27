'use strict'
const { appointmentApi } = require('../api')

function newAppointment (req, res) {
  const { body } = req
  appointmentApi.createMany(body).then((response) => {
    console.log(response)
    res.status(200).send('ok')
  }).catch((err) => {
    console.log(err)
    res.status(500).send('failed')
  })
}

function getAppointment (req, res) {
  const { date } = req.query
  appointmentApi.getAppointment(date).then((response) => {
    console.log(response)
    res.status(200).send(response)
  }).catch((err) => {
    console.log(err)
    res.status(500).send('failed')
  })
}

module.exports = {
  newAppointment, getAppointment
}
