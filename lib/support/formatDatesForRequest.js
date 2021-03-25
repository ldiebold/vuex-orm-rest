"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatDatesForRequest;

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function formatDatesForRequest(form, entityClass) {
  Object.keys(form).forEach(function (key) {
    // If is an instance of Date, format
    if (form[key] instanceof Date) {
      form[key] = (0, _dayjs["default"])(form[key]).unix();
      return form;
    }

    if (!entityClass.dates) {
      return form;
    } // If is a number, assume timestamp and return


    if (typeof form[key] == 'number') {
      return form;
    } // If is included in dates on entity, format


    if (entityClass.dates.includes(key)) {
      form[key] = (0, _dayjs["default"])(form[key], ['DD/MM/YYYY', 'MM/YYYY', 'YYYY'], 'en-au', true).unix();
    }
  });
  return form;
}