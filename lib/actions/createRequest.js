"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _formatDatesForRequest = _interopRequireDefault(require("../support/formatDatesForRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_axios["default"].defaults.withCredentials = true;

function _default(form) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var query = arguments.length > 2 ? arguments[2] : undefined;
  var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  url = url || "".concat(this.api_url);
  form = (0, _formatDatesForRequest["default"])(form, this);

  if (query) {
    if (_typeof(query) == 'object') url += "?".concat(_qs["default"].stringify(query));else if (typeof query == 'string') url += query;else throw 'query must be either an object or a string';
  }

  options = Object.assign({
    method: 'post',
    data: form,
    url: url
  }, options);
  return (0, _axios["default"])(options).then(function (response) {
    _this.insert({
      data: _this.config.rest.getDataFromResponseFunction(response)
    });

    return response;
  });
}