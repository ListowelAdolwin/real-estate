const express = require('express')

const authRouter = express.Router()

const {Register, Login} = require("../controllers/authControllers")

authRouter.post("/register", Register)
authRouter.post("/login", Login)

module.exports = authRouter