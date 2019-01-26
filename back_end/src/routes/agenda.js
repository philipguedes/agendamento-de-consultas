'use strict'

const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation')()
const { agendaController } = require('../controllers')

const router = express.Router()

const OPEN_VALIDATION = {
  body: Joi.object({
    datetimes: Joi.array().items(Joi.date().iso().required()).required()
  })
}

router.post('/:day/open', validator.body(OPEN_VALIDATION.body), agendaController.post)

module.exports = router
