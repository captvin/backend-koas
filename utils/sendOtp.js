const axios = require('axios');

require('dotenv').config()
var { BOT_TOKEN } = process.env

// Use your bot's token and the Telegram API URL
const botToken = BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${botToken}/sendMessage`;

async function sendOtp(chatId, otp) {
    const message = `Your OTP code is: ${otp}`;

    try {
        await axios.post(TELEGRAM_API_URL, {
            chat_id: chatId,
            text: message,
        });
        console.log(`OTP sent to Telegram ID: ${chatId}`);
    } catch (error) {
        console.error('Error sending OTP via Telegram:', error);
    }
}

module.exports = sendOtp