const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8702553327:AAF_8ojR5vN8_SOlfUnxN8XMe4GAmGB5jDo";

// Polling true — commands ke liye
const bot = new TelegramBot(TOKEN, { polling: true });

// 👉 /start COMMAND
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `
👋 *Welcome to DealBridge!* 🔥

🛍 *Best Deals Daily*  
💰 *Save Money on Shopping*  

👇 *Explore Now:*
https://t.me/dealbridge_deals

🔔 Latest deals seedha channel pe milti hain!
  `, { parse_mode: 'Markdown' });
});

// 👉 /chatid COMMAND — channel ID nikalne ke liye
bot.onText(/\/chatid/, (msg) => {
    bot.sendMessage(msg.chat.id, `🆔 Your Chat ID: \`${msg.chat.id}\``, { parse_mode: 'Markdown' });
});

console.log("🤖 DealBridge Bot Started...");