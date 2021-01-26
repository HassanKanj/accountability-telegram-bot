/*-------------------------------------------------------*
Accountability Telegram bot: 
https://github.com/HassanKanj/accountability-telegram-bot
*-------------------------------------------------------*/

// This file is the entry point, it will do some checks before starting the bot.

require("dotenv").config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  require("./bot-token-is-not-set");
} else if (!process.env.MY_CHAT_ID) {
  require("./get-chat-id");
} else {
  const bot = require("./bot");
  const cron = require("./cron");

  bot.start();
  cron.activateJobs();
}
