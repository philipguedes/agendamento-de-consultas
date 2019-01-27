'use strict'

const moment = require('moment')
const _ = require('lodash')
const Promise = require('bluebird')
const { AppointmentModel } = require('../model')

const MIN_SCHEDULE = process.env.MIN_SCHEDULE || 28800000
const MAX_SCHEDULE = process.env.MAX_SCHEDULE || 61200000

const APPOINTMENT_STATUS = {
  created: 1,
  available: 2,
  pending: 3,
  confirmed: 4,
  finished: 5
}

async function createMany (dates) {
  const result = await Promise.map(dates, asyncHandler(create))

  // verificar se tem erros

  return result
}

const asyncHandler = (promise) => async (...args) => {
  let result
  try {
    result = await promise(...args)
    return result
  } catch (error) {
    result = { error: error }
    return result
  }
}

async function create (date) {
  let appoint = {}
  const ref = moment(date).startOf('day')
  const diff = moment(date).diff(ref)
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
    { user, free: false, status: APPOINTMENT_STATUS.confirmed }
  )
}

async function getAppointment (date) {
  const minDate = moment(date).startOf('day')
  const maxDate = moment(date).endOf('day')
  let result = await AppointmentModel.find({ schedule: { '$gte': minDate.toDate(), '$lte': maxDate.toDate() } })
  result = _.map(result, (r) => _.pick(r, ['free', 'schedule', 'status', 'user.email', 'user.name', 'user.phone']))
  return result
}

module.exports = {
  create, allocate, createMany, getAppointment
}
