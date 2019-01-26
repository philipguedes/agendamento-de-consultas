'use strict'

const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation')()
const { appointmentCtrl } = require('../ctrl')

const router = express.Router()

const POST_VALIDATION = {
  body: Joi.object({
    date: Joi.date().iso().required()
  })
}

router.post('/', validator.body(POST_VALIDATION.body), appointmentCtrl.newAppointment)

module.exports = router
