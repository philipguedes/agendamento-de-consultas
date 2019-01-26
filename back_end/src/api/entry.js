'use strict'

const _ = require('lodash')
const { fromTime } = require('../utils/date')
const EntryModel = require('../model/entry.model')

async function batchInsert (list) {
  const items = []
  _.forEach(list, (time) => {
    items.push({ time })
  })
  const ans = await EntryModel.insertMany(items)
  return ans
}

async function findAll () {
  const entries = await EntryModel.find({})
  const result = []
  _.forEach(entries, (item) => {
    result.push(parseEntity(item))
  })
  return result
}

function parseEntity (entity) {
  const { time } = entity
  const parsed = fromTime(time)
  return parsed.format()
}

module.exports = {
  batchInsert, findAll
}
