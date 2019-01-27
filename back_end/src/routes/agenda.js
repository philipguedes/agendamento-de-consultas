'use strict'

const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validator')
const { agendaCtrl } = require('../ctrl')

const router = express.Router()

const PUT_CLIENT_VALIDATION = {
  body: Joi.object({
    date: Joi.date().iso().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
  })
}

router.put('/', validator(PUT_CLIENT_VALIDATION), agendaCtrl.putClient)

module.exports = router
