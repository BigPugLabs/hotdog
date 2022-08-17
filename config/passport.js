const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const passport = require("passport")
const User = require("../models/User")

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
            if (err) return done(err)
            if (!user) {
                return done(null, false, { msg: `email ${email} not found` })
            }
            if (!user.password) {
                return done(null, false, { msg: "no password here" })
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) return done(err)
                if (isMatch) return done(null, user)
                return done(null, false, { msg: "wrong email or password" })
            })
        })
    }))
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err,user)=> done(err, user))
})