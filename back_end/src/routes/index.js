'use strict'
const appointmentsRoute = require('./appointments')

module.exports = (app) => {
  app.use('/appointments', appointmentsRoute)
}
