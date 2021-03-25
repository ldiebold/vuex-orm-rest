import axios from 'axios'
axios.defaults.withCredentials = true

import qs from 'qs'
import formatDatesForRequest from '../support/formatDatesForRequest'

export default function (form, options = {}, query, url = null) {
  url = url || `${this.api_url}`

  form = formatDatesForRequest(form, this)

  if (query) {
    if (typeof query == 'object')
      url += `?${qs.stringify(query)}`
    else if (typeof query == 'string')
      url += query
    else throw 'query must be either an object or a string'
  }

  options = Object.assign({
    method: 'post',
    data: form,
    url,
  }, options)

  return axios(options)
    .then(response => {
      this.insert({ data: this.config.rest.getDataFromResponseFunction(response) })
      return response
    })
}