import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/routes'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const routeService = {
  getAll,
  create,
  update
}


export default routeService