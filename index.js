const express = require("express")
const dotenv = require("dotenv").config()
const path = require("path")
const MongoStore = require("connect-mongo")
const db = require("./config/db")

// globals

const PORT = process.env.PORT || 8080
const app = express()

db.connectDB()

// templating
app.set("view engine", "ejs")

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// static folder
app.use(express.static(path.join(__dirname, "public")))

// ROUTES
app.use("/", require("./routes/index"))

module.exports = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})