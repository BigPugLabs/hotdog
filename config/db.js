const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI + process.env.DB_NAME)
        console.log(`MongoDB connected to: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

const closeDB = async () => {
    await mongoose.disconnect()
}

module.exports = { connectDB, closeDB }