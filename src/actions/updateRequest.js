import axios from 'axios'
axios.defaults.withCredentials = true

import formatDatesForRequest from '../support/formatDatesForRequest'

export default {
  get: function () {
    return (form, options = { replace: true }, url) => {
      url = url || `${this.constructor.api_url}/${this.id}`

      form = formatDatesForRequest(form, this.constructor)

      return axios.patch(url, form)
        .then(response => {
          if (options.replace) {
            this.constructor.insert({
              where: this.id,
              data: this.constructor.config.rest.getDataFromResponseFunction(response)
            })
              .then(entities => {
                if (this.constructor.$afterUpdate) {
                  this.constructor.$afterUpdate(response, entities)
                }
              })
          }

          return response
        })
    }
  }
}