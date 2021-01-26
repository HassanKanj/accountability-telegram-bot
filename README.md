# Accountability Telegram bot

A Telegram bot that will manage your daily tasks and send you messages regarding your progress.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/main-image.jpg)

You can use this bot to manage your daily tasks (adding new tasks, deleting tasks, marking tasks as done,..) and the bot will hold you accountable by sending
you random messages during the day to inform you about your progress (progress ratio and percentage).

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/notification.jpg)

At the start of each day (the time is configurable in configs.js), the bot will send you a greeting message asking you what you want to work on during the day,
and you can specify the tasks using the **/add** command

**Some of the bot features include:**

- Add a new task
- Remove a task
- Mark task as done
- Mark task as pending
- List your daily tasks
- Add a list of daily repeated tasks (the bot will automatically add them to the tasks list each day).

## Usage

**Note**: Before you proceed, make sure that `node` and `npm` are installed on your machine.

1- Clone (or download) this repository: `git clone https://github.com/HassanKanj/accountability-telegram-bot`

2- go to the project path and run `npm install`

3- Rename the file **configs.sample.js** to **configs.js**

4- modify the values inside **configs.js** as you see suitable

5- Rename the file **env.sample** to **.env**

6- Set these variables in your **.env** file:

- **TELEGRAM_BOT_TOKEN**: This is your bot access token [[check this section for more details on how to create a new Telegram bot and get its token](#steps-to-create-a-bot-using-the-telegram-app)].

- **TZ**: This is your timezone, the default value is Asia/Beirut

- **MY_CHAT_ID**: This is your unique chat id on the Telegram app, it is needed so your bot knows to whom it should send the notifications/messages.

Before you get the "chat id", make sure you set the values for **TELEGRAM_BOT_TOKEN** and that you saved the **.env** file.

Now to get the "chat id", simply run the app using this command: `npm run prod`, and since **MY_CHAT_ID** is not set, the app will provide you with a number, and it will ask you to message your bot, so all you have to do is go to your Telegram app, and message your bot with that number, then check your console, you will get your chat id, copy the id and assign it to **MY_CHAT_ID** in the **.env** file then save the file.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/get-chat-id-1.jpg)

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/send-code.jpg)

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/get-chat-id-2.jpg)

5- After you successfully set all these values, you are now ready to start the app, simply type: `npm run prod`, and you should see a screen similar to this one:

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/app-is-running.jpg)

## Available commands

### Adding a task:

To add a task, type **/add** or **/a** followed by the task, for example:

`/add exercise for an hour`

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/add-tasks.jpg)

### Listing tasks:

To list your tasks, simply use the command **/list** or **/l**

Note: this will only list the tasks of today and it won't show any tasks from the past.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/list-tasks.jpg)

### Mark task as done:

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/images/mark-as-done.jpg)

**Notes:**

- When listing tasks, you will have the option to mark them as done or to delete them, Deleting a task will affect the reporting/statistics feature, when you finish a task just mark it as done instead of deleting it.

- When listing your tasks you will have the options to mark them as done or pending (based on their current status), and to delete them.

## Steps to create a bot using the Telegram app

1- Open Telegram app, then start a new message and  
search for **BotFather**.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/1.jpg)

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/2.jpg)

2- Tap **Start** to begin your interaction with **BotFather**,  
after doing so, the bot will send you a list of commands  
you can use, tap on **/newbot**.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/3.jpg)

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/4.jpg)

3- Now enter your bot name, this is its display name, it  
may contain spaces and it doesn't have to be unique.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/5.jpg)

4- Now you will have to enter your bot username, this  
username should be unique (you will get an error if  
it wasn't), and it should end with the word **bot**.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/6.jpg)

5- If everything went well, you should receive a message  
similar to the one below, and it will include your bot  
access token (**This token should be a secret, and it  
shouldn't be shared**), and in case someone was able  
to get your token, you can revoke it and get a new one  
using **botFather**.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/7.jpg)

6- Congratulation, you have created a bot! now let's  
message the new bot, simply start a new message, and  
search for your bot username.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/8.jpg)

Tap **Start**, and now you can interact with your bot.

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/9.jpg)

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/10.jpg)

![image](https://github.com/HassanKanj/accountability-telegram-bot/blob/main/documentation/create-telegram-bot/11.jpg)

## About the author

My name is Hassan Kanj, I am an independent programmer (Freelancer), a maker, and a 3D printing enthusiast.

In case you want to know more about my skills or if you would like to hire me, feel free to check my website for more details: https://www.hassankanj.com.

And here's my LinkedIn profile as well: https://www.linkedin.com/in/hassankanj

## License

MIT License

Copyright (c) 2020 Hassan Kanj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
