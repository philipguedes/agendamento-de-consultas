'use strict'

const express = require('express')
const BaseJoi = require('joi')
const JoiExtension = require('joi-date-extensions')
const validator = require('express-joi-validator')
const { agendaCtrl } = require('../ctrl')
const Joi = BaseJoi.extend(JoiExtension)

const router = express.Router()

const POST_VALIDATION = {
  body: Joi.object({
    schedule: Joi.date().iso().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string()
  })
}

const GET_VALIDATION = {
  query: Joi.object({
    date: Joi.date().format('YYYY-MM-DD')
  })
}

router.post('/', validator(POST_VALIDATION), agendaCtrl.postAgenda) // validation

router.get('/', validator(GET_VALIDATION), agendaCtrl.getAgenda)

module.exports = router
