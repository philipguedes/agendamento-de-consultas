'use strict'
const Api = require('../api/appointment')

function get (req, res) {

}

function getAll (req, res) {

}

function post (req, res) {
  Api.create(req.body).then((response) => {
    console.log(response)
    res.status(200).send('ok')
  }).catch((err) => {
    console.log(err)
    res.status(500).send('failed')
  })
}

module.exports = {
  get, getAll, post
}
