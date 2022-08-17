const passport = require("passport")
const validator = require("validator")
const User = require("../models/User")

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect("/hotdog")
    }
    res.render("login")
}

exports.getLogout = (req, res) => {
    req.logout((err) => {
        if (err) console.error("logout error")
        req.session.destroy((err) => {
            if (err) console.error("Failed to destroy session")
            req.user = null
            res.redirect("/")
        })
    })
}

exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect("/hotdog")
    }
    res.render("signup")
}

exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: "email invalid" })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: "password needs to be 8 chars" })
    if (req.body.password != req.body.confirmPassword) validationErrors.push({ msg: "passwords don't match" })

    if (validationErrors.length) {
        // TODO - send errors back to signup form
        console.error(validationErrors)
        return res.redirect("../signup")
    }

    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })

    User.findOne({
        $or: [
            { userName: req.body.userName },
            { email: req.body.email }
        ]
    }, (err, existingUser) => {
        if (err) return next(err)
        if (existingUser) {
            // TODO - send errors back to signup form
            console.error("errors", { msg: "Username or email already in use" })
            return res.redirect("../signup")
        }
        user.save((err) => {
            if (err) return next(err)
            req.login(user, (err) => {
                if (err) return next(err)
            })
            res.redirect("/hotdog")
        })
    })
}

exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: "Invalid email" })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: "Put in a password this time" })

    if (validationErrors.length) {
        console.error("errors", validationErrors)
        return res.redirect("../login")
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err)
        if (!user) {
            console.error("GET login errors", info)
            return res.redirect("../login")
        }
        req.login(user, (err) => {
            if (err) return next(err)
            res.redirect(req.session.returnTo || '/hotdog')
        })
    })(req, res, next)
}