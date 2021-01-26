/*-------------------------------------------------------*
Accountability Telegram bot: 
https://github.com/HassanKanj/accountability-telegram-bot
*-------------------------------------------------------*/

// if MY_CHAT_ID (the user chat id on Telegram) is not set, ask the user to send a specific number as a message
// to their bot, in order to retreive the chat id

const TelegramBot = require("node-telegram-bot-api");

let randomNumber = Math.floor(Math.random() * 10000) + 10000;
console.log(
  `\n>>> Error: MY_CHAT_ID is not set, and this is necessary in order to know to whom we should send the messages, but don't worry, we can easily get it for you. all you have to do is go to your Telegram app and send this number to your bot: ${randomNumber}`
);

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

// handle received messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text == randomNumber) {
    console.log(
      `\n>>> Your chat ID is: ${chatId}, assign this value to MY_CHAT_ID in .env file, then restart this app\n`
    );
    bot
      .sendMessage(
        chatId,
        "We successfully received your chat id, check your node.js console window on how to proceed."
      )
      .then(() => {
        process.exit();
      });
  } else {
    if (msg.text != "/start") {
      bot.sendMessage(chatId, "Wrong code! Please try again.");
    }
  }
});
