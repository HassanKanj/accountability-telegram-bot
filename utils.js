function isToday(dateStringInUTC) {
  _date = new Date(dateStringInUTC);
  dateInLocalTime = _date.toLocaleString();
  dateArray = dateInLocalTime.split(",")[0].split("/");
  let day = dateArray[1];
  let month = dateArray[0];
  let year = dateArray[2];

  now = new Date();
  nowInLocalTime = now.toLocaleString();

  nowDateArray = nowInLocalTime.split(",")[0].split("/");
  let nowDay = nowDateArray[1];
  let nowMonth = nowDateArray[0];
  let nowYear = nowDateArray[2];

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
