const cron = require('node-cron');
const mongoose = require('mongoose');
const Product = require('../models/product_model');
const { postProductToTelegram, postCustomMessage } = require('./telegramService');

let schedulerRunning = false;

// DB ready hai check karne ke liye helper
function isDbReady() {
    return mongoose.connection.readyState === 1; // 1 = connected
}

/**
 * Aaj add hue products ko track karne ke liye
 * (already posted products dobara post na hon)
 */
const postedProductIds = new Set();

/**
 * Latest products fetch karke post karta hai jo abhi tak post nahi hue
 */
async function postLatestProducts() {
    if (!isDbReady()) {
        console.log('⏳ DB still connecting, skipping scheduler run...');
        return;
    }
    try {
        // Last 1 ghante mein add hue products fetch karo
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const newProducts = await Product.find({
            createdAt: { $gte: oneHourAgo }
        }).sort({ createdAt: -1 }).limit(5);

        if (newProducts.length === 0) {
            console.log('📭 Koi naya product nahi mila');
            return;
        }

        for (const product of newProducts) {
            const idStr = product._id.toString();
            if (!postedProductIds.has(idStr)) {
                const result = await postProductToTelegram(product);
                if (result.success) {
                    postedProductIds.add(idStr);
                }
                // Rate limit ke liye 2 second wait
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    } catch (err) {
        console.error('❌ Scheduler error:', err.message);
    }
}

/**
 * Subah 9 baje daily deal announcement
 */
async function postMorningDeals() {
    try {
        // Top 3 latest products fetch karo
        const topDeals = await Product.find({})
            .sort({ createdAt: -1 })
            .limit(3);

        if (topDeals.length === 0) return;

        await postCustomMessage(`🌅 *Good Morning! Aaj ke Top Deals* 🔥\n\n_Checkout karo aaj ke best deals on DealBridge!_`);
        await new Promise(r => setTimeout(r, 1500));

        for (const product of topDeals) {
            await postProductToTelegram(product);
            await new Promise(r => setTimeout(r, 2500));
        }
    } catch (err) {
        console.error('❌ Morning deals error:', err.message);
    }
}

/**
 * Sham 6 baje evening deals reminder
 */
async function postEveningDeals() {
    try {
        const topDeals = await Product.find({})
            .sort({ createdAt: -1 })
            .limit(2);

        if (topDeals.length === 0) return;

        await postCustomMessage(`🌆 *Sham Ke Best Deals!* 💰\n\n_Miss mat karo — limited time offers!_`);
        await new Promise(r => setTimeout(r, 1500));

        for (const product of topDeals) {
            await postProductToTelegram(product);
            await new Promise(r => setTimeout(r, 2500));
        }
    } catch (err) {
        console.error('❌ Evening deals error:', err.message);
    }
}

/**
 * Scheduler start karta hai
 */
function startScheduler() {
    if (schedulerRunning) {
        console.log('⚠️ Scheduler pehle se chal raha hai');
        return;
    }

    console.log('🕐 Auto-Post Scheduler Start...');

    // ✅ Har 1 ghante mein naye products check karo
    cron.schedule('0 * * * *', () => {
        console.log('🔄 Checking new products...');
        postLatestProducts();
    });

    // ✅ Subah 9 baje morning deals (IST = UTC+5:30 → 3:30 UTC)
    cron.schedule('30 3 * * *', () => {
        console.log('🌅 Morning deals posting...');
        postMorningDeals();
    });

    // ✅ Sham 6 baje evening deals (IST → 12:30 UTC)
    cron.schedule('30 12 * * *', () => {
        console.log('🌆 Evening deals posting...');
        postEveningDeals();
    });

    schedulerRunning = true;
    console.log('✅ Scheduler ready: Hourly check | 9AM | 6PM IST');
}

function stopScheduler() {
    schedulerRunning = false;
    console.log('🛑 Scheduler stopped');
}

module.exports = { startScheduler, stopScheduler, postLatestProducts };
