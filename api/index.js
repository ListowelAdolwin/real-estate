const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

app.get("/", (req, res) => {
    console.log("heyy")
})

app.listen(3000, () => {
    connectDB()
    console.log("Server successfully started!")
})