const colors = require("colors");

// this will print the logs to the console, and also save the logs to the database
function log(message) {
  timestamp = new Date().toISOString();
  console.log(`${">>>".grey} ${timestamp.green}: ${message}`);
} // log()

module.exports = {
  log,
};
