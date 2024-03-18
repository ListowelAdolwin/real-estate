const express = require('express')

const {updateUser, deleteUser} = require("../controllers/userController")
const {verifyToken} = require('../utils/verifyToken')

const userRouter = express.Router()

userRouter.post("/update/:id", verifyToken, updateUser)
userRouter.delete("/delete/:id", verifyToken, deleteUser)


module.exports = userRouter