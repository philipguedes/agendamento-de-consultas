'use strict'

const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation')()
const { appointmentsController } = require('../controllers')

const router = express.Router()

const POST_VALIDATION = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    date: Joi.date().iso().required()
  })
}

router.get('/', appointmentsController.get)

router.get('/all', appointmentsController.getAll)

router.post('/', validator.body(POST_VALIDATION.body), appointmentsController.post)

module.exports = router
