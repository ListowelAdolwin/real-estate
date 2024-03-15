const express = require('express')

const {getListowel, getAdolwin} = require("../controllers/userController")

const router = express.Router()

router.get("/", getListowel)
router.get("/ado", getAdolwin)


module.exports = router