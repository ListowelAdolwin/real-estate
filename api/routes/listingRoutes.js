const express = require('express')
const {
    createListing,
    getUserListing,
    getListing,
    deleteListing,
    updateListing
} = require('../controllers/listingControllers')
const {verifyToken} = require("../utils/verifyToken")

const listingRouter = express.Router()

listingRouter.post("/create", verifyToken, createListing)
listingRouter.delete("/delete/:id", verifyToken, deleteListing)
listingRouter.post("/update/:id", verifyToken, updateListing)
listingRouter.get("/user/:id", verifyToken, getUserListing)
listingRouter.get("/:id", getListing)


module.exports = listingRouter