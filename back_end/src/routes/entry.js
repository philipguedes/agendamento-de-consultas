'use strict'

const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation')()
const entryController = require('../controllers/entry')

const router = express.Router()

const POST_VALIDATION = {
  body: Joi.array().items(Joi.number().positive().required()).required()
}

router.post('/', validator.body(POST_VALIDATION.body), entryController.post)

router.get('/', entryController.get)

module.exports = router
