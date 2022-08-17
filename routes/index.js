const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")

//  @desc   Homepage
//  @route  GET     /
router.get("/", (req, res) => {
    res.render("index")
})

//  @desc   Signup page
//  @route  GET     /signup
router.get("/signup", authController.getSignup)

//  @desc   Login page
//  @route  GET     /login
router.get("/login", authController.getLogin)

//  @desc   Logout action
//  @route  GET     /logout
router.get("/logout", authController.getLogout)

//  @desc   Login page
//  @route  POST     /login
router.post("/login", authController.postLogin)

//  @desc   Signup page
//  @route  POST     /signup
router.post("/signup", authController.postSignup)

module.exports = router