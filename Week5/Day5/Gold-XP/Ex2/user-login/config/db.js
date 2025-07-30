const mongoose = require('mongoose')
require('dotenv').config()
const chalk = require('chalk')

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(chalk.green('✅ MongoDB connected successfully'));

    } catch (error) {
        console.error(chalk.red('❌ MongoDB connection error:', error));
        process.exit(1);

    }
}

module.exports = ConnectDB