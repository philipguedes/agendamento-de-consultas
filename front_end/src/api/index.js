import axios from 'axios'
import qs from 'qs'
import { apiUrl } from './config'

async function getAgenda (date) {
  const queryString = qs.stringify({ date })
  try {
    const { data } = await axios.get(`${apiUrl}/agenda?${queryString}`)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

function postAgenda (body) {
  const uri = `${apiUrl}/agenda`
  return axios.post(uri, body)
}

async function postSelectedAppointment ({ date, time }) {
  let response
  try {
    response = await axios.post(`${apiUrl}/appointment`)
  } catch (error) {
    console.log(error)
    response = {}
  }
  return response
}

async function getAppointmentsByDay (date) {
  const queryString = qs.stringify({ date })
  try {
    const { data } = await axios.get(`${apiUrl}/appointments?${queryString}`)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

async function openAppointments (dates) {
  try {
    const response = await axios.post(`${apiUrl}/appointments/open`, dates)
    return response
  } catch (error) {
    console.log(error)
    return []
  }
}

async function closeAppointments (dates) {
  try {
    const response = await axios.post(`${apiUrl}/appointments/close`, dates)
    return response
  } catch (error) {
    console.log(error)
    return []
  }
}

export default {
  getAgenda,
  postSelectedAppointment,
  openAppointments,
  closeAppointments,
  getAppointmentsByDay,
  postAgenda
}
