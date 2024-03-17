const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(3000, () => {
    connectDB()
    console.log("Server successfully started!")
})

// Used to send error messages to the client side. 
app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const message = err.message || "Unidentified error"
    return res.status(statusCode).json({
        success: "false",
        message,
        statusCode
    })
})