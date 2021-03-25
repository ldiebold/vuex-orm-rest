"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.withCredentials = true;

function _default(ids) {
  var _this = this;

  return _axios["default"]["delete"]("".concat(this.api_url, "/bulk"), {
    data: ids
  }).then(function (response) {
    var primaryKey = _this.constructor.primaryKey || 'id';

    var responseIds = _this.config.rest.getDataFromResponseFunction(response).map(function (record) {
      return record[primaryKey];
    });

    _this["delete"](function (record) {
      return responseIds.includes(record[primaryKey]);
    });

    return response;
  });
}