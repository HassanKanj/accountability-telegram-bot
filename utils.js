function isToday(dateStringInUTC) {
  _date = new Date(dateStringInUTC);
  let day = _date.getDay();
  let month = _date.getMonth();
  let year = _date.getYear();

  now = new Date();
  let nowDay = now.getDay();
  let nowMonth = now.getMonth();
  let nowYear = now.getYear();

  if (year == nowYear && month == nowMonth && day == nowDay) {
    return true;
  } else {
    return false;
  }
}

// convert JSON to String, and format the text to print well.
function jsonToString(value) {
  return JSON.stringify(value, null, 4);
}

module.exports = {
  jsonToString,
  isToday,
};
