const express = require('express')
const {createListing, getUserListing} = require('../controllers/listingControllers')
const {verifyToken} = require("../utils/verifyToken")

const listingRouter = express.Router()
console.log("In listing routes")
listingRouter.post("/create", verifyToken, createListing)
listingRouter.get("/:id", verifyToken, getUserListing)


module.exports = listingRouter