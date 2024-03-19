const express = require('express')
const {createListing} = require('../controllers/listingControllers')

const listingRouter = express.Router()

listingRouter.post("/create", createListing)


module.exports = listingRouter