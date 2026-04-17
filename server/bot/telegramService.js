const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8702553327:AAF_8ojR5vN8_SOlfUnxN8XMe4GAmGB5jDo";
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || "@bestdealsfind";

// Polling false rakhein kyunki ye sirf sender hai
const bot = new TelegramBot(TOKEN, { polling: false });

/**
 * Product ka Telegram message format banata hai
 */
function formatProductMessage(product) {
    const discount = product.mrp && product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : null;

    const discountLine = discount && discount > 0
        ? `\n🏷️ *${discount}% OFF* (MRP: ~~₹${product.mrp}~~)`
        : '';

    const linksText = product.links && product.links.length > 0
        ? product.links.map(l => `🔗 [${l.platform}](${l.url})`).join('\n')
        : '';

    const categoryLine = product.category ? `\n📂 Category: ${product.category}` : '';
    const descLine = product.description
        ? `\n\n📝 ${product.description.slice(0, 200)}${product.description.length > 200 ? '...' : ''}`
        : '';

    return `🔥 *${product.title}*${discountLine}

💰 *Price: ₹${product.price}*${discountLine ? '' : ''}${categoryLine}${descLine}

${linksText}

🛍️ *DealBridge — Best Deals Daily!*
📲 Join: https://t.me/dealbridge_deals`;
}

/**
 * Naye product ko Telegram channel pe post karta hai
 * Image ke saath ya bina image ke
 */
async function postProductToTelegram(product) {
    try {
        const message = formatProductMessage(product);
        const options = {
            parse_mode: 'Markdown',
            disable_web_page_preview: false,
        };

        if (product.image && product.image.startsWith('http')) {
            // Image ke saath post
            await bot.sendPhoto(CHANNEL_ID, product.image, {
                caption: message,
                parse_mode: 'Markdown',
            });
            console.log(`✅ Telegram pe image post ho gai: ${product.title}`);
        } else {
            // Sirf text post
            await bot.sendMessage(CHANNEL_ID, message, options);
            console.log(`✅ Telegram pe text post ho gaya: ${product.title}`);
        }

        return { success: true };
    } catch (err) {
        console.error(`❌ Telegram post error:`, err.message);
        return { success: false, error: err.message };
    }
}

/**
 * Custom text message post karta hai (announcements ke liye)
 */
async function postCustomMessage(text) {
    try {
        await bot.sendMessage(CHANNEL_ID, text, { parse_mode: 'Markdown' });
        console.log('✅ Custom message post ho gaya');
        return { success: true };
    } catch (err) {
        console.error('❌ Custom message error:', err.message);
        return { success: false, error: err.message };
    }
}

/**
 * Multiple products ek saath post karta hai (bulk post)
 */
async function bulkPostProducts(products, delayMs = 2000) {
    const results = [];
    for (const product of products) {
        const result = await postProductToTelegram(product);
        results.push({ title: product.title, ...result });
        // Rate limit se bachne ke liye delay
        if (products.indexOf(product) < products.length - 1) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    return results;
}

module.exports = {
    bot,
    postProductToTelegram,
    postCustomMessage,
    bulkPostProducts,
};
