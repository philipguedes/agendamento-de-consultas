'use strict'

const express = require('express')
const BaseJoi = require('joi')
const JoiExtension = require('joi-date-extensions')
const validator = require('express-joi-validator')
const { appointmentCtrl } = require('../ctrl')
const Joi = BaseJoi.extend(JoiExtension)

const router = express.Router()

const POST_VALIDATION = {
  body: Joi.array().items(Joi.date().iso().required()).required()
}
const GET_VALIDATION = {
  query: Joi.object({
    date: Joi.date().format('YYYY-MM-DD')
  })
}

router.post('/', validator(POST_VALIDATION), appointmentCtrl.newAppointment)

router.get('/', validator(GET_VALIDATION), appointmentCtrl.getAppointment)

module.exports = router
