/*-------------------------------------------------------*
Accountability Telegram bot: 
https://github.com/HassanKanj/accountability-telegram-bot
*-------------------------------------------------------*/

require("dotenv").config();
const logger = require("./logger");
const utils = require("./utils");
const TelegramBot = require("node-telegram-bot-api");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(process.env.DB_FILE_NAME);
const db = low(adapter);
const LodashId = require("lodash-id");
db._.mixin(LodashId);

// set default value (in case the db json file is empty)
db.defaults({ tasks: [] }).write();

function getTodayTasks() {
  return getTasks("TODAY", "ALL");
}

function getTodayCompletedTasks() {
  return getTasks("TODAY", "DONE");
}

function getTodayPendingTasks() {
  return getTasks("TODAY", "PENDING");
}

function getAllTasks() {
  return getTasks("ALL", "ALL");
}

function getAllCompletedTasks() {
  return getTasks("ALL", "DONE");
}

function getAllPendingTasks() {
  return getTasks("ALL", "PENDING");
}

function getTodayTasksCount() {
  return getTodayTasks().length;
}

function getTodayCompletedTasksCount() {
  return getTodayCompletedTasks().length;
}

function getTodayPendingTasksCount() {
  return getTodayPendingTasks().length;
}

function getAllTasksCount() {
  return getAllTasks().length;
}

function getAllCompletedTasksCount() {
  return getAllCompletedTasks().length;
}

function getAllPendingTasksCount() {
  return getAllPendingTasks().length;
}

function allTodayTasksAreDone() {
  if (getTodayTasksCount() == getTodayCompletedTasksCount()) {
    return true;
  }
  return false;
}

function getDebugInfo() {
  let result = "";

  now = new Date();
  let nowDay = now.getDay();
  let nowMonth = now.getMonth();
  let nowYear = now.getYear();

  let allTasks = getAllTasks();
  for (i = 0; i < allTasks.length; i++) {
    allTasks[i].description = "[Hidden]";
    let _date = new Date(allTasks[i].created_at);
    let dateInLocalTime = _date.toLocaleString();
    let dateArray = dateInLocalTime.split(",")[0].split("/");
    let day = _date.getDay();
    let month = _date.getMonth();
    let year = _date.getYear();

    allTasks[i].day = day;
    allTasks[i].month = month;
    allTasks[i].year = year;
  }
  result += `<u>Data used for debug purposes:</u>
  nowDay:  ${nowDay}
  nowMonth:  ${nowMonth}
  nowYear:  ${nowYear}
  --------------------
  <u>All tasks in the DB:</u>
  ${utils.jsonToString(allTasks)}
    `;
  return result;
}

/*
getTasks()
timeRange values: TODAY, ALL
status values: DONE, PENDING, ALL
*/
function getTasks(timeRange, status) {
  db.read(); // read/refresh the data [to make sure you are getting the latest changes]
  let tasks;
  tasks = db
    .get("tasks")
    .filter((row) => {
      let filterCondition = true;
      if (timeRange == "TODAY") {
        filterCondition = filterCondition && utils.isToday(row.created_at);
      }
      if (status == "DONE") {
        filterCondition = filterCondition && row.is_done;
      } else if (status == "PENDING") {
        filterCondition = filterCondition && !row.is_done;
      }
      return filterCondition;
    })
    .value();
  return tasks;
}

function addTask(taskDescription) {
  let newId;
  const tasks = db.get("tasks");

  if (tasks.size().value() == 0) {
    newId = 1;
  } else {
    let highestId = tasks
      .maxBy(function (row) {
        return row.id;
      })
      .value().id;
    newId = highestId + 1;
  }

  try {
    logger.log(`Adding the task: ${taskDescription}`);
    const newTask = tasks
      .insert({
        id: newId,
        description: taskDescription,
        is_done: false,
        created_at: new Date().toISOString(),
      })
      .write();
    return newTask.id;
  } catch (exception) {
    return exception;
  }
}

// console.log(getTodayTasks());
// console.log(getTodayTasksCount());

// console.log(getTodayCompletedTasks());
// console.log(getTodayCompletedTasksCount());

// console.log(getTodayPendingTasks());
// console.log(getTodayPendingTasksCount());

// console.log(getAllTasks());
// console.log(getAllTasksCount());

// console.log(getAllCompletedTasks());
// console.log(getAllCompletedTasksCount());

// console.log(getAllPendingTasks());
// console.log(getAllPendingTasksCount());
function markTaskAsDone(id) {
  logger.log(`Marking the task with id = ${id} as done`);
  const tasks = db.get("tasks");
  let result = tasks.updateById(id, { is_done: true }).write();

  if (typeof result !== "undefined") {
    return true;
  } else {
    throw new Error(
      "Error while marking the task as done, are you sure you sent the correct id?"
    );
  }
}

function markTaskAsPending(id) {
  logger.log(`Marking the task with id = ${id} as pending`);
  const tasks = db.get("tasks");
  let result = tasks.updateById(id, { is_done: false }).write();
  if (typeof result !== "undefined") {
    return true;
  } else {
    throw new Error(
      "Error while marking the task as pending, are you sure you sent the correct id?"
    );
  }
}

function deleteTask(id) {
  logger.log(`Deleting the task with id = ${id}`);
  const tasks = db.get("tasks");
  let result = tasks.removeById(id).write();
  if (typeof result !== "undefined") {
    return true;
  } else {
    throw new Error(
      "Error while removing the task, are you sure you sent the correct id?"
    );
  }
}

function formatTasksList(tasks, title = "") {
  if (tasks.length == 0) {
    return "No tasks found (for today), check /help to learn how to add a new task.";
  }
  let result = "";
  if (title != "") {
    result = `<u><b>${title}</b></u>\n\n`;
  }

  for (let i = 0; i < tasks.length; i++) {
    let taskNumber = i + 1;
    result += formatTask(tasks[i], taskNumber);
  }

  return result;
}

function formatTask(task, taskNumber) {
  const { id, description, created_at, is_done } = task;
  let result = `${taskNumber} - ${description}`;
  if (is_done) {
    result = `<s>${result}</s>`;
  }
  result += "\n";
  if (is_done) {
    result += `/mark_as_pending_${id} - `;
  } else {
    result += `/mark_as_done_${id} - `;
  }
  result += `/delete_${id}`;
  result += "\n\n";
  return result;
}

module.exports = {
  getTodayTasks,
  getTodayTasksCount,
  getTodayCompletedTasks,
  getTodayCompletedTasksCount,
  getTodayPendingTasks,
  getTodayPendingTasksCount,
  getAllTasks,
  getAllTasksCount,
  getAllCompletedTasks,
  getAllCompletedTasksCount,
  getAllPendingTasks,
  getAllPendingTasksCount,
  markTaskAsDone,
  markTaskAsPending,
  addTask,
  deleteTask,
  formatTasksList,
  allTodayTasksAreDone,
  getDebugInfo,
};
