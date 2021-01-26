/*-------------------------------------------------------*
Accountability Telegram bot: 
https://github.com/HassanKanj/accountability-telegram-bot
*-------------------------------------------------------*/

const CronJob = require("cron").CronJob;
const bot = require("./bot");
const configs = require("./configs");

function activateJobs() {
  let greetingJob = new CronJob(
    `${configs.GREETING_TIME.second} ${configs.GREETING_TIME.minute} ${configs.GREETING_TIME.hour} * * *`,
    bot.sendGreeting,
    null,
    true,
    process.env.TZ
  );
  greetingJob.start();

  let addReapeatedTasksJob = new CronJob(
    `${configs.DAILY_REPEATED_TASKS_TIME.second} ${configs.DAILY_REPEATED_TASKS_TIME.minute} ${configs.DAILY_REPEATED_TASKS_TIME.hour} * * *`,
    bot.addDailyRepeatedTasks,
    null,
    true,
    process.env.TZ
  );
  addReapeatedTasksJob.start();

  let sendProgressMessageJob = new CronJob(
    `0 0 * * * *`,
    bot.sendProgressMessage,
    null,
    true,
    process.env.TZ
  );
  sendProgressMessageJob.start();
}

module.exports = {
  activateJobs,
};
