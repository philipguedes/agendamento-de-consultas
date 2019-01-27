import axios from 'axios'
import querystring from 'querystring'
import moment from 'moment'
import { apiUrl } from './config'

async function getAgenda () {
  let response
  try {
    response = await axios.get(`${apiUrl}/agenda`)
  } catch (err) {
    response = {}
    console.error(err)
  }
  return response
}

async function postSelectedAppointment ({ date, time }) {
  let response
  try {
    response = await axios.post(`${apiUrl}/appointment`)
  } catch (error) {
    console.error(error)
    response = {}
  }
  return response
}

async function getAppointmentsByDay (date) {
  let response
  const formatted = moment(date).format('YYYY-MM-DD')
  try {
    response = await axios.get(`${apiUrl}/appointments`, querystring.stringify({ date: formatted }))
  } catch (error) {
    console.error(error)
    response = {}
  }
  return response
}

async function openAppointments (dates) {
  let response
  try {
    response = await axios.post(`${apiUrl}/appointments`, dates)
  } catch (error) {
    console.error(error)
    response = {}
  }
  return response
}

export default {
  getAgenda,
  postSelectedAppointment,
  openAppointments,
  getAppointmentsByDay
}
