const Listing = require("../models/Listing")
const handleErrors = require("../utils/errors")

exports.createListing = async (req, res, next) => {
    try {
        const newListing = await Listing.create(req.body)
        res.status(201).json(newListing)
    } catch (error) {
        next(error)
    }
}

exports.getUserListing = async (req, res, next) => {
    const userId = req.params.id
    console.log("The user: ", req.user)
    if (userId !== req.user.id){
        return next(handleErrors(401, "Forbidden!"))
    }
    try {
        const listings = await Listing.find({author: userId})
        res.status(200).json(listings)
    } catch (error) {
        next(error)
    }

}