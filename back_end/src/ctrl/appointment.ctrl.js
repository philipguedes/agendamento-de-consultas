'use strict'
const { appointmentApi } = require('../api')

function newAppointment (req, res) {
  const { body } = req
  const { date } = body
  appointmentApi.create(date).then((response) => {
    console.log(response)
    res.status(200).send('ok')
  }).catch((err) => {
    console.log(err)
    res.status(500).send('failed')
  })
}

module.exports = {
  newAppointment
}
