'use strict'
const appointmentsRoute = require('./appointments')
const agendaRoute = require('./agenda')
const entryRoute = require('./entry')

module.exports = (app) => {
  app.use('/appointments', appointmentsRoute)
  app.use('/agenda', agendaRoute)
  app.use('/entry', entryRoute)
}
