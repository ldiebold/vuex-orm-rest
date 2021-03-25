"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _axios = _interopRequireDefault(require("axios"));

var _formatDatesForRequest = _interopRequireDefault(require("../support/formatDatesForRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.withCredentials = true;

function _default(forms) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    replace: true
  };
  forms = forms.map(function (form) {
    return (0, _formatDatesForRequest["default"])(form, _this);
  });
  return _axios["default"].post("".concat(this.api_url, "/bulk"), forms).then(function (response) {
    if (options.replace) {
      _this.insert({
        data: _this.config.rest.getDataFromResponseFunction(response)
      });
    }

    return response;
  });
}