"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _isJsonString = _interopRequireDefault(require("../support/isJsonString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.withCredentials = true;
var _default = {
  get: function get() {
    var _this = this;

    return function () {
      return _axios["default"]["delete"]("".concat(_this.api_url, "/").concat(_this.id)).then(function (response) {
        // If primary key, then delete using composite key
        if (Array.isArray(_this.constructor.primaryKey)) {
          if ((0, _isJsonString["default"])(_this.$id)) {
            _this.constructor["delete"](JSON.parse(_this.$id));
          }
        } else {
          _this.constructor["delete"](_this.id);
        }

        return response;
      });
    };
  }
};
exports["default"] = _default;