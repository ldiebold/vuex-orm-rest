import axios from 'axios'
axios.defaults.withCredentials = true

export default function (axiosOptions, persistBy = 'create', url = null) {
  url = url || `${this.api_url}`

  axiosOptions = Object.assign({ with: [] }, axiosOptions)

  return axios.get(url, {
    params: {
      with: axiosOptions.with,
      ...axiosOptions.params
    }
  })
    .then(response => {
      this[persistBy]({ data: this.config.rest.getDataFromResponseFunction(response) })
      if (this.onGet) this.onGet(response)
      return response
    })
}