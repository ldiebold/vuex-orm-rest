"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _formatDatesForRequest = _interopRequireDefault(require("../support/formatDatesForRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.withCredentials = true;
var _default = {
  get: function get() {
    var _this = this;

    return function (form) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        replace: true
      };
      var url = arguments.length > 2 ? arguments[2] : undefined;
      url = url || "".concat(_this.constructor.api_url, "/").concat(_this.id);
      form = (0, _formatDatesForRequest["default"])(form, _this.constructor);
      return _axios["default"].patch(url, form).then(function (response) {
        if (options.replace) {
          _this.constructor.insert({
            where: _this.id,
            data: _this.constructor.config.rest.getDataFromResponseFunction(response)
          }).then(function (entities) {
            if (_this.constructor.$afterUpdate) {
              _this.constructor.$afterUpdate(response, entities);
            }
          });
        }

        return response;
      });
    };
  }
};
exports["default"] = _default;