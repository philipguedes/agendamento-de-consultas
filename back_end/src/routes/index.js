'use strict'
const appointmentsRoute = require('./appointments')
const agendaRoute = require('./agenda')

module.exports = (app) => {
  app.use('/appointments', appointmentsRoute)
  app.use('/agenda', agendaRoute)
}
