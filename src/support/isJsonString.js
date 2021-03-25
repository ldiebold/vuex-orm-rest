export default function isJsonString (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}