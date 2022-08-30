const express = require("express")
const dotenv = require("dotenv").config()
const path = require("path")
const MongoStore = require("connect-mongo")
const { connectDB } = require("./config/db")
const session = require("express-session")
const passport = require("passport")

// globals

const PORT = process.env.PORT || 8080
const app = express()

require("./config/passport")(passport)

connectDB()

// templating
app.set("view engine", "ejs")

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// static folder
app.use(express.static(path.join(__dirname, "public")))

// auth
app.use(session({
    secret: 'superpug',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.use("/", require("./routes/index"))
app.use("/hotdog", require("./routes/hotdog"))

// module.exports = app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`)
// })

// app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`)
// })

module.exports = app