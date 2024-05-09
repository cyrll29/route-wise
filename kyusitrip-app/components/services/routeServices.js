import axios from 'axios'
import config from '../../utils/config'

const baseUrl = `${config.URL_USED}/api/routes`

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response
  }
  
  const update = async (id, newObject) => {
    const request = axios.put(`${ baseUrl }/${id}`, newObject)
    const response = await request
    return response.data
  }
  
  const routeService = {
    getAll,
    create,
    update
  }
  
  
  export default routeService