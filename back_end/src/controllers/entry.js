'use strict'

const entryApi = require('../api/entry')

function post (req, res) {
  const { body } = req
  entryApi.batchInsert(body).then((response) => {
    console.log(response)
    res.send('ok')
  }).catch((err) => {
    console.error(`error inserting: ${err}`)
    res.status(500).send('not ok')
  })
}

function get (req, res) {
  entryApi.findAll().then((response) => {
    console.log(response)
    res.send(response)
  }).catch((err) => {
    console.error(`error getting entries: ${err}`)
    res.status(500).send('not ok')
  })
}

module.exports = {
  post, get
}
