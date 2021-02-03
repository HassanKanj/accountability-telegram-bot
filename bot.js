/*-------------------------------------------------------*
Accountability Telegram bot: 
https://github.com/HassanKanj/accountability-telegram-bot
*-------------------------------------------------------*/

require("dotenv").config();
const logger = require("./logger");
const utils = require("./utils");
const TelegramBot = require("node-telegram-bot-api");
const TasksHelper = require("./tasks-helper");
const configs = require("./configs");

// create a bot that uses 'polling' to fetch new updates
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

function addDailyRepeatedTasks() {
  const dailyRepeatedTasks = configs.DAILY_REPEATED_TASKS;

  if (dailyRepeatedTasks.length == 0) {
    logger.log("No daily repeated tasks to add..");
    return;
  }

  for (let i = 0; i < dailyRepeatedTasks.length; i++) {
    try {
      let taskId = TasksHelper.addTask(dailyRepeatedTasks[i]);
      sendMessage(
        `The daily repeated task:

<pre>${dailyRepeatedTasks[i]}</pre>

was added successfully (ID: ${taskId})\n[/list] [/help]`
      );
    } catch (exception) {
      let errorMessage = exception.message;
      logger.log(errorMessage);
      sendMessage(errorMessage);
    }
  }
}

function sendGreeting() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let day = days[now.getDay()];

  sendMessage(`Hello ${configs.MY_NAME},

Today is <u>${day} ${now.getDate()}\/${
    now.getMonth() + 1
  }\/${now.getFullYear()}</u>, I hope you get some good night sleep, so tell me, what are you going to work on today?

You can add new tasks using the /add command

[/help for more details]`);
}

function start() {
  logger.log("Starting the bot...");

  telegramBot.on("message", (message) => {
    let senderId = message.chat.id;
    logger.log(`Message received:\n${utils.jsonToString(message)}`);

    // only enable interaction with the registered chat id in the .env file
    if (senderId != process.env.MY_CHAT_ID) {
      logger.log(
        `The sender id '${senderId}' doesn't match the defined chat id '${process.env.MY_CHAT_ID}'`
      );
      return;
    }
    handleAddTask(message);
    handleDeleteTask(message);
    handleListTasks(message);
    handleHelp(message);
    handleMarkTaskAsDone(message);
    handleMarkTaskAsPending(message);
    handleOtherCases(message);
    handleDebug(message);
  });
}

function handleDebug(message) {
  const regex = /^\/debug$/;
  const matches = message.text.match(regex);

  if (matches) {
    const message = TasksHelper.getDebugInfo();
    sendMessage(message);
  }
}

function handleHelp(message) {
  const regex = /^\/help$|^\/start$|^\/h$/;
  const matches = message.text.match(regex);

  if (matches) {
    showHelp();
  }
}

function handleListTasks(message) {
  const regex = /^\/list$|^\/l$/;
  const matches = message.text.match(regex);

  if (matches) {
    const tasks = TasksHelper.getTodayTasks();

    let { doneRatio, donePercentage } = getProgress();
    doneRatio = `<b>${doneRatio}</b>`;
    donePercentage = `<b>${donePercentage}</b>`;
    let title = `Tasks (Today):\nDone: ${doneRatio} (${donePercentage})`;
    let message = TasksHelper.formatTasksList(tasks, title);
    sendMessage(message);
  }
}

function handleAddTask(message) {
  const regex = /^\/add (.+)|^\/a (.+)/;
  const matches = message.text.match(regex);

  if (matches) {
    let taskDescription =
      typeof matches[1] == "undefined" ? matches[2] : matches[1];
    try {
      let taskId = TasksHelper.addTask(taskDescription);
      sendMessage(`Task added successfully (ID: ${taskId})\n[/list] [/help]`);
    } catch (exception) {
      let errorMessage = exception.message;
      logger.log(errorMessage);
      sendMessage(errorMessage);
    }
  }
}

function handleDeleteTask(message) {
  const regex = /^\/delete_(.+)/;
  const matches = message.text.match(regex);

  if (matches) {
    let id = matches[1];
    try {
      TasksHelper.deleteTask(id);
      sendMessage(`Task removed successfully (ID: ${id})\n[/list] [/help]`);
    } catch (exception) {
      let errorMessage = exception.message;
      logger.log(errorMessage);
      sendMessage(errorMessage);
    }
  }
}

function handleMarkTaskAsDone(message) {
  const regex = /^\/mark_as_done_(.+)/;
  const matches = message.text.match(regex);

  if (matches) {
    let id = matches[1];
    try {
      TasksHelper.markTaskAsDone(id);
      sendMessage(`Task marked as done (ID: ${id})\n[/list] [/help]`);
      if (TasksHelper.allTodayTasksAreDone()) {
        sendMessage(
          `Good job ${configs.MY_NAME}! you've finished all your tasks for today, you can /add more tasks if you want or just relax and get some rest.`
        );
      } else {
        let { doneRatio, donePercentage } = getProgress();
        doneRatio = `<b>${doneRatio}</b>`;
        donePercentage = `<b>${donePercentage}</b>`;
        sendMessage(`tasks done so far: ${doneRatio} (${donePercentage})`);
      }
    } catch (exception) {
      let errorMessage = exception.message;
      logger.log(errorMessage);
      sendMessage(errorMessage);
    }
  }
}

function handleMarkTaskAsPending(message) {
  const regex = /^\/mark_as_pending_(.+)/;
  const matches = message.text.match(regex);

  if (matches) {
    let id = matches[1];
    try {
      TasksHelper.markTaskAsPending(id);
      sendMessage(`Task marked as pending (ID: ${id})\n[/list] [/help]`);
    } catch (exception) {
      let errorMessage = exception.message;
      logger.log(errorMessage);
      sendMessage(errorMessage);
    }
  }
}

function handleOtherCases(message) {
  let regex = /^\/add$|^\/a$/;
  let matches = message.text.match(regex);

  if (matches) {
    sendMessage(`<u>Adding a task:</u>

To add a task, type /add or /a followed by the task, for example:
    
<pre>/add exercise for an hour</pre>`);
  }

  // a command to debug/test stuff (mainly used in development only)
  regex = /^\/test$|^\/t$/;
  matches = message.text.match(regex);

  if (matches) {
    sendProgressMessage();
  }
}

function sendMessage(message) {
  telegramBot.sendMessage(process.env.MY_CHAT_ID, message, {
    parse_mode: "HTML",
  });
  logger.log(`Message sent to Telegram [msg: ${message}]`);
}

function showHelp() {
  let message = `Hello ${configs.MY_NAME},

I am the accountability bot, I will manage your daily tasks and send you messages regarding your progress.

<u><b>Available commands:</b></u>

<u>Adding a task:</u>

To add a task, type /add or /a followed by the task, for example:

<pre>/add exercise for an hour</pre>

<u>Listing tasks:</u>

To list your tasks, simply use the command /list or /l

- Please note that this will only list the tasks of today and it won't show any tasks from the past.

<u>Notes:</u>

- When listing tasks, you will have the option to mark them as done or to delete them, Deleting a task may affect the reporting/statistics feature, when you finish a task just mark it as done instead of deleting it.

-  Send /help or /h whenever you want to see this help section.`;

  sendMessage(message);
}

function sendProgressMessage() {
  if (TasksHelper.allTodayTasksAreDone()) {
    return;
  }
  let { doneRatio, donePercentage } = getProgress();
  doneRatio = `<b>${doneRatio}</b>`;
  donePercentage = `<b>${donePercentage}</b>`;
  let messages = [
    `Hi ${configs.MY_NAME}, you've finished ${doneRatio} of your tasks for today, that's ${donePercentage} of work done so far.`,
    `Hello ${configs.MY_NAME}, tasks done so far: ${doneRatio} (${donePercentage})`,
    `Hello ${configs.MY_NAME}, just a reminder to finish all your tasks for today, (${doneRatio} or ${donePercentage} done so far).`,
  ];
  let randomIndex = Math.floor(Math.random() * 1000) % messages.length;
  sendMessage(messages[randomIndex]);
}

function getProgress() {
  let doneRatio = `${TasksHelper.getTodayCompletedTasksCount()}/${TasksHelper.getTodayTasksCount()}`;
  let donePercentage =
    (
      (TasksHelper.getTodayCompletedTasksCount() /
        TasksHelper.getTodayTasksCount()) *
      100
    ).toFixed(2) + "%";
  return { doneRatio: doneRatio, donePercentage: donePercentage };
}

module.exports = {
  start,
  sendMessage,
  sendGreeting,
  addDailyRepeatedTasks,
  sendProgressMessage,
};
