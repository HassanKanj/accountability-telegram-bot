const configs = {
  // add your name here (used by the bot)
  MY_NAME: "YOUR_NAME_HERE",
  // Repeated daily tasks (these tasks will be automatically added each day)
  // an example of the syntax:
  /*
   DAILY_REPEATED_TASKS: ["finsh project 1","finish project 2"]
  */
  DAILY_REPEATED_TASKS: [""],

  // When you want to be greeted by the bot (to start your day)
  GREETING_TIME: {
    hour: 8,
    minute: 30,
    second: 00,
  },
  //When you want to add the DAILY_REPEATED_TASKS (if any)
  DAILY_REPEATED_TASKS_TIME: {
    hour: 8,
    minute: 00,
    second: 00,
  },
};

module.exports = configs;
