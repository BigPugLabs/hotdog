const express = require("express")
const router = express.Router()
const hotdogController = require("../controllers/hotdog")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get("/", ensureAuth, hotdogController.getHotdogs)

module.exports = router