const express = require('express')

const authRouter = express.Router()

const {Register, Login, googleAuth} = require("../controllers/authControllers")

authRouter.post("/register", Register)
authRouter.post("/login", Login)
authRouter.post("/google", googleAuth)

module.exports = authRouter