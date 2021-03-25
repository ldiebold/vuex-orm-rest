import axios from 'axios'
axios.defaults.withCredentials = true

export default function (id, axiosOptions = {}, url = null) {
  url = url || `${this.api_url}/${id}`

  axiosOptions = Object.assign({ with: [] }, axiosOptions)

  return axios.get(url, {
    params: {
      with: axiosOptions.with,
      ...axiosOptions.params
    }
  })
    .then(response => {
      this.insert({ data: this.config.rest.getDataFromResponseFunction(response) })
      if (this.onFind) this.onFind(response)
      return response
    })
}