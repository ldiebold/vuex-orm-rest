import axios from 'axios'
axios.defaults.withCredentials = true

import formatDatesForRequest from '../support/formatDatesForRequest'

export default function (forms, options = { replace: true }) {
  forms = forms.map(form => formatDatesForRequest(form, this))

  return axios.post(`${this.api_url}/bulk`, forms)
    .then(response => {
      if (options.replace) {
        this.insert({
          data: this.config.rest.getDataFromResponseFunction(response)
        })
      }
      return response
    })
}