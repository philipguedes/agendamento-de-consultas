'use strict'

const { AppointmentModel } = require('../model')
const moment = require('moment')

const MIN_SCHEDULE = process.env.MIN_SCHEDULE || 28800000
const MAX_SCHEDULE = process.env.MAX_SCHEDULE || 61200000

const APPOINTMENT_STATUS = {
  created: 1,
  cancelled: 2,
  pending: 3,
  confirmed: 4
}

async function create (date) {
  let appoint = {}
  const ref = moment(date).startOf('day')
  const diff = ref.diff(date)
  const schedule = moment(date).toDate()
  if (diff >= MIN_SCHEDULE && diff <= MAX_SCHEDULE) {
    appoint = await AppointmentModel.create({
      status: APPOINTMENT_STATUS.created,
      created: Date.now(),
      free: true,
      schedule
    })
  }
  return appoint
}

function allocate (date, user) {
  const created = moment(date).toDate()
  return AppointmentModel.where({ created }).update(
    { user, free: false, status: APPOINTMENT_STATUS.pending }
  )
}

module.exports = {
  create, allocate
}
