const TelegramBot = require('node-telegram-bot-api');

const token = "8702553327:AAF_8ojR5vN8_SOlfUnxN8XMe4GAmGB5jDo"; // 👈 new token use karo
const bot = new TelegramBot(token, { polling: true });

// 👉 START COMMAND
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `
👋 Welcome to DealBridge 🔥

🛍 Best Deals Daily  
💰 Save Money on Shopping  

👇 Explore Now:
https://your-website-link.com
  `);
});

console.log("🤖 Bot Started...");