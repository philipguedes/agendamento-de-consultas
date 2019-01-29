'use strict'
const appointmentsRoute = require('./appointments')
const agendaRoute = require('./agenda')

module.exports = (app) => {
  app.use('/appointments', appointmentsRoute)
  app.use('/agenda', agendaRoute)
  app.use('/health', (req, res) => { res.status(200).send('ok') })
}
