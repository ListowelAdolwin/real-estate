const express = require('express')

const {updateUser, getAdolwin} = require("../controllers/userController")
const {verifyToken} = require('../utils/verifyToken')

const userRouter = express.Router()

console.log("User routes")
userRouter.get("/ado", getAdolwin)
userRouter.post("/update/:id", verifyToken, updateUser)


module.exports = userRouter