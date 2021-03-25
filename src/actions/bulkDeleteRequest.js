import axios from 'axios'
axios.defaults.withCredentials = true

export default function (ids) {
  return axios.delete(`${this.api_url}/bulk`, { data: ids })
    .then(response => {
      let primaryKey = this.constructor.primaryKey || 'id'
      let responseIds = this.config.rest.getDataFromResponseFunction(response).map(record => record[primaryKey])
      this.delete(record => {
        return responseIds.includes(record[primaryKey])
      })
      return response
    })
}