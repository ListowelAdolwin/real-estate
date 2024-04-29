const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/db')

const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const listingRouter = require("./routes/listingRoutes")

connectDB()

const app = express()

app.use(
	  cors({
		origin: [
		  'https://dream-home.onrender.com',
		  'http://127.0.0.1:5173/',
		  'https://127.0.0.1:5173/',
		  'http://127.0.0.1:5173',
		  'https://dream-home.onrender.com',
		  'https://dream-home.onrender.com/',
		  'http://dream-home.onrender.com',
		  'http://dream-home.onrender.com/'
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true
	  })
	)

app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/listings", listingRouter)


mongoose.connection.once('open', () => {
    console.log('DB connected')
    app.listen(3000, () => {
    console.log("App started")
})
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