import axios from 'axios'
axios.defaults.withCredentials = true

export default function (data, axiosOptions, persistBy = 'insert') {
  return axios.post(`${this.api_url}/search`, data, axiosOptions)
    .then(response => {
      this[persistBy]({ data: this.config.rest.getDataFromResponseFunction(response) })
      if (this.onSearch) this.onSearch(response)
      return response
    })
}