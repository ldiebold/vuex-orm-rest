import bulkCreateRequest from './actions/bulkCreateRequest'
import bulkDeleteRequest from './actions/bulkDeleteRequest'
import bulkUpdateRequest from './actions/bulkUpdateRequest'
import createRequest from './actions/createRequest'
import deleteRequest from './actions/deleteRequest'
import findRequest from './actions/findRequest'
import getRequest from './actions/getRequest'
import searchRequest from './actions/searchRequest'
import updateRequest from './actions/updateRequest'

let defaultConfig = {
  getDataFromResponse: function (response) {
    if (response.data.data) {
      return response.data.data
    }
    return response.data
  },

  getApiUrl: function (VuexOrmModel) {
    return VuexOrmModel.config.rest.api_url
  }
}

export default {
  install ({ Model }, config) {
    if (!config.api_url) {
      throw "please supply an 'api_url' in the 'options' object"
    }

    /**
     * Expose the config on our model
     */
    Model.config = Model.config ? Model.config : {}
    Model.config.rest = Object.assign({}, defaultConfig, config)
    Object.defineProperty(Model.prototype, 'config', Model.config)

    /**
     * Get the models entity (static)
     */
    Object.defineProperty(Model, 'getEntity', {
      get: function () {
        return () => this.entity || this.constructor.entity
      }
    })

    /**
     * Get the models entity (instance)
     */
    Object.defineProperty(Model.prototype, 'getEntity', {
      get: function () {
        return () => {
          return this.constructor.entity || this.constructor.entity
        }
      }
    })

    /**
     * Get API URL (static)
     */
    Object.defineProperty(Model, 'api_url', {
      get: function () {
        return `${this.config.rest.getApiUrl(this)}/${this.getEntity()}`
      }
    })

    /**
     * Get API URL (instance)
     */
    Object.defineProperty(Model.prototype, 'api_url', {
      get: function () {
        return `${this.constructor.config.rest.getApiUrl(this.constructor)}/${this.getEntity()}`
      }
    })

    /**
     * CRUD
     */
    Model.$create = createRequest
    Model.$find = findRequest
    Object.defineProperty(Model.prototype, '$update', updateRequest)
    Object.defineProperty(Model.prototype, '$delete', deleteRequest)
    Model.$get = getRequest

    /**
     * Bulk Operations Requests
     */
    Model.$bulkCreate = bulkCreateRequest
    Model.$bulkUpdate = bulkUpdateRequest
    Model.$bulkDelete = bulkDeleteRequest

    /**
     * Other
     */
    Model.$search = searchRequest
  }
}