'use strict'

const express = require('express')
const BaseJoi = require('joi')
const JoiExtension = require('joi-date-extensions')
const validator = require('express-joi-validator')
const { agendaCtrl } = require('../ctrl')
const Joi = BaseJoi.extend(JoiExtension)

const router = express.Router()

const PUT_CLIENT_VALIDATION = {
  body: Joi.object({
    date: Joi.date().iso().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
  })
}

const GET_VALIDATION = {
  query: Joi.object({
    date: Joi.date().format('YYYY-MM-DD')
  })
}

router.put('/', validator(PUT_CLIENT_VALIDATION), agendaCtrl.putClient)

router.get('/', validator(GET_VALIDATION), agendaCtrl.getAgenda)

module.exports = router
