'use strict'
const { agendaApi } = require('../api')

function postAgenda (req, res) {
  const { body } = req
  agendaApi.postAgenda(body).then((response) => {
    console.log(response)
    res.status(200).send('ok')
  }).catch((err) => {
    console.log(err)
    res.status(500).send('failed')
  })
}

function getAgenda (req, res) {
  const { date } = req.query
  agendaApi.getAgenda(date).then((response) => {
    res.status(200).send(response)
  }).catch((err) => {
    console.log(err)
    res.status(500).send('failed')
  })
}

module.exports = {
  postAgenda, getAgenda
}
