const admin = require('firebase-admin');
const path = require('path');

let initialized = false;

function initFirebase() {
    if (initialized || admin.apps.length > 0) {
        initialized = true;
        return;
    }
    try {
        const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
            || path.join(__dirname, '../config/firebase-service-account.json');

        admin.initializeApp({
            credential: admin.credential.cert(require(serviceAccountPath)),
        });
        initialized = true;
        console.log('✅ Firebase Admin initialized');
    } catch (e) {
        console.error('❌ Firebase Admin init error:', e.message);
        throw e;
    }
}

/**
 * Topic-based push notification — sabhi subscribed users ko
 */
async function sendTopicNotification(title, body, topic = 'all_users') {
    initFirebase();

    const message = {
        notification: { title, body },
        android: {
            notification: {
                sound: 'default',
                priority: 'high',
                channelId: 'deals_channel',
            },
        },
        apns: {
            payload: {
                aps: { sound: 'default', badge: 1 },
            },
        },
        topic,
    };

    const response = await admin.messaging().send(message);
    console.log(`✅ Notification sent! MessageId: ${response}`);
    return response;
}

module.exports = { sendTopicNotification };
