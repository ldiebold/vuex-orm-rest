"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bulkCreateRequest = _interopRequireDefault(require("./actions/bulkCreateRequest"));

var _bulkDeleteRequest = _interopRequireDefault(require("./actions/bulkDeleteRequest"));

var _bulkUpdateRequest = _interopRequireDefault(require("./actions/bulkUpdateRequest"));

var _createRequest = _interopRequireDefault(require("./actions/createRequest"));

var _deleteRequest = _interopRequireDefault(require("./actions/deleteRequest"));

var _findRequest = _interopRequireDefault(require("./actions/findRequest"));

var _getRequest = _interopRequireDefault(require("./actions/getRequest"));

var _searchRequest = _interopRequireDefault(require("./actions/searchRequest"));

var _updateRequest = _interopRequireDefault(require("./actions/updateRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultConfig = {
  getDataFromResponse: function getDataFromResponse(response) {
    if (response.data.data) {
      return response.data.data;
    }

    return response.data;
  },
  getApiUrl: function getApiUrl(VuexOrmModel) {
    return VuexOrmModel.config.rest.api_url;
  }
};
var _default = {
  install: function install(_ref, config) {
    var Model = _ref.Model;

    if (!config.api_url) {
      throw "please supply an 'api_url' in the 'options' object";
    }
    /**
     * Expose the config on our model
     */


    Model.config = Model.config ? Model.config : {};
    Model.config.rest = Object.assign({}, defaultConfig, config);
    Object.defineProperty(Model.prototype, 'config', Model.config);
    /**
     * Get the models entity (static)
     */

    Object.defineProperty(Model, 'getEntity', {
      get: function get() {
        var _this = this;

        return function () {
          return _this.entity || _this.constructor.entity;
        };
      }
    });
    /**
     * Get the models entity (instance)
     */

    Object.defineProperty(Model.prototype, 'getEntity', {
      get: function get() {
        var _this2 = this;

        return function () {
          return _this2.constructor.entity || _this2.constructor.entity;
        };
      }
    });
    /**
     * Get API URL (static)
     */

    Object.defineProperty(Model, 'api_url', {
      get: function get() {
        return "".concat(this.config.rest.getApiUrl(this), "/").concat(this.getEntity());
      }
    });
    /**
     * Get API URL (instance)
     */

    Object.defineProperty(Model.prototype, 'api_url', {
      get: function get() {
        return "".concat(this.constructor.config.rest.getApiUrl(this.constructor), "/").concat(this.getEntity());
      }
    });
    /**
     * CRUD
     */

    Model.$create = _createRequest["default"];
    Model.$find = _findRequest["default"];
    Object.defineProperty(Model.prototype, '$update', _updateRequest["default"]);
    Object.defineProperty(Model.prototype, '$delete', _deleteRequest["default"]);
    Model.$get = _getRequest["default"];
    /**
     * Bulk Operations Requests
     */

    Model.$bulkCreate = _bulkCreateRequest["default"];
    Model.$bulkUpdate = _bulkUpdateRequest["default"];
    Model.$bulkDelete = _bulkDeleteRequest["default"];
    /**
     * Other
     */

    Model.$search = _searchRequest["default"];
  }
};
exports["default"] = _default;