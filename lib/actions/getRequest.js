"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_axios["default"].defaults.withCredentials = true;

function _default(axiosOptions) {
  var _this = this;

  var persistBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'create';
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  url = url || "".concat(this.api_url);
  axiosOptions = Object.assign({
    "with": []
  }, axiosOptions);
  return _axios["default"].get(url, {
    params: _objectSpread({
      "with": axiosOptions["with"]
    }, axiosOptions.params)
  }).then(function (response) {
    _this[persistBy]({
      data: _this.config.rest.getDataFromResponseFunction(response)
    });

    if (_this.onGet) _this.onGet(response);
    return response;
  });
}