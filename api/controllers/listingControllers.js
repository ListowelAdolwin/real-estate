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

exports.getListing = async (req, res, next) => {
    const listingId = req.params.id
    try{
        const listing = await Listing.findById(listingId)
        
        if (!listing){
            return res.json({msg: "No Listing found!"})
        }
        res.status(200).json(listing)
    }catch(err) {
        next(err)
    }
}

exports.deleteListing = async (req, res, next) => {
    const listingId = req.params.id
    try{
        const listing = await Listing.findByIdAndDelete(listingId)
        if (!listing){
            return res.json({msg: "No Listing found!"})
        }
        if (listing.author.toString() !== req.user.id){
            return res.status(401).json({msg: "You can only delete your listings"})
        }
        res.status(200).json(listing)
    }catch(err) {
        next(err)
    }
}

exports.updateListing = async (req, res, next) => {
    const listingId = req.params.id
    const listing = await Listing.findById(listingId)

    if (!listing){
        return res.status(404).json({msg: "No Listing found!"})
    }
    if (listing.author.toString() !== req.user.id){
        return res.status(401).json({msg: "You can only update your listings"})
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(listingId, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}