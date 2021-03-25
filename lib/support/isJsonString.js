"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isJsonString;

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}