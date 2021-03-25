import axios from 'axios'
axios.defaults.withCredentials = true

import isJsonString from '../support/isJsonString'

export default {
  get: function () {
    return () => {
      return axios.delete(`${this.api_url}/${this.id}`)
        .then(response => {
          // If primary key, then delete using composite key
          if (Array.isArray(this.constructor.primaryKey)) {
            if (isJsonString(this.$id)) {
              this.constructor.delete(JSON.parse(this.$id))
            }
          } else {
            this.constructor.delete(this.id)
          }
          return response
        })
    }
  }
}