import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async userId => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

export default { getAll, getById }