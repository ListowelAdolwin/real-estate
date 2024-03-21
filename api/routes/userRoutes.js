const express = require('express')

const {updateUser, deleteUser, getUser, sendEmail} = require("../controllers/userController")
const {verifyToken} = require('../utils/verifyToken')

const userRouter = express.Router()

userRouter.post("/update/:id", verifyToken, updateUser)
userRouter.delete("/delete/:id", verifyToken, deleteUser)
userRouter.get("/:id", getUser)
userRouter.post("/send-email", verifyToken, sendEmail)


module.exports = userRouter