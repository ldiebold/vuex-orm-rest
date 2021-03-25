"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.withCredentials = true;

function _default(data, axiosOptions) {
  var _this = this;

  var persistBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'insert';
  return _axios["default"].post("".concat(this.api_url, "/search"), data, axiosOptions).then(function (response) {
    _this[persistBy]({
      data: _this.config.rest.getDataFromResponseFunction(response)
    });

    if (_this.onSearch) _this.onSearch(response);
    return response;
  });
}