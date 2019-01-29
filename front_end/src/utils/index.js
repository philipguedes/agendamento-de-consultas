'use strict'

import moment from 'moment-timezone'

const timezone = 'America/Sao_Paulo'

function getDate (date = undefined) {
  return moment(date).tz(timezone)
}

function parseDate (date) {
  return moment(date).format('YYYY-MM-DD')
}

function getHour (date) {
  return moment(date).tz(timezone).format('HH:mm')
}

export default {
  parseDate, getDate, getHour
}
