const Listing = require("../models/Listing")


exports.createListing = async (req, res, next) => {
    try {
        const newListing = await Listing.create(req.body)
        res.status(201).json(newListing)
    } catch (error) {
        next(error)
    }
}