'use strict'

const moment = require('moment')

function fromTime (seconds, date = undefined) {
  const base = moment.isMoment(date) ? moment(date).startOf('day') : moment().startOf('day')
  base.add(seconds)
  return base
}

function timeOfDay (date) {
  const base = moment(date).startOf('day')
  return date.diff(base)
}

module.exports = {
  fromTime, timeOfDay
}
