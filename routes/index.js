const express = require("express")
const router = express.Router()

//  @desc   Homepage
//  @route  GET     /
router.get("/", (req, res)=> {
    res.send("hi")
})

module.exports = router