const Listing = require('../models/Listing');
const handleErrors = require('../utils/errors');

exports.createListing = async (req, res, next) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

exports.getUserListing = async (req, res, next) => {
  const userId = req.params.id;
  if (userId !== req.user.id) {
    return next(handleErrors(401, 'Forbidden!'));
  }
  try {
    const listings = await Listing.find({ author: userId });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

exports.getListing = async (req, res, next) => {
  const listingId = req.params.id;
  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.json({ msg: 'No Listing found!' });
    }
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

exports.deleteListing = async (req, res, next) => {
  const listingId = req.params.id;
  try {
    const listing = await Listing.findByIdAndDelete(listingId);
    if (!listing) {
      return res.json({ msg: 'No Listing found!' });
    }
    if (listing.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You can only delete your listings' });
    }
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

exports.updateListing = async (req, res, next) => {
  const listingId = req.params.id;
  const listing = await Listing.findById(listingId);

  if (!listing) {
    return res.status(404).json({ msg: 'No Listing found!' });
  }
  if (listing.author.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'You can only update your listings' });
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

exports.getListings = async (req, res, next) => {
  const searchTerm = req.query.searchTerm || '';
  const sortPattern = req.query.sort || 'createdAt';
  const sortOrder = req.query.order || 'desc';
  const limit = req.query.limit || 9;
  const startIndex = req.query.startIndex || 0;

  let offerQuery = req.query.offer;
  if (offerQuery == 'false' || offerQuery == undefined) {
    offerQuery = { $in: [true, false] };
  }

  let furnishedQuery = req.query.furnished;
  if (furnishedQuery == 'false' || furnishedQuery == undefined) {
    furnishedQuery = { $in: [true, false] };
  }

  let parkingQuery = req.query.parking;
  if (parkingQuery == 'false' || parkingQuery == undefined) {
    parkingQuery = { $in: [true, false] };
  }

  let typeQuery = req.query.type;
  if (!typeQuery || typeQuery === 'all') {
    typeQuery = { $in: ['rent', 'sale'] };
  }

  try {
    const listings = await Listing.find({
      name: {
        $regex: searchTerm,
        $options: 'i',
      },
      offer: offerQuery,
      parking: parkingQuery,
      furnished: furnishedQuery,
      type: typeQuery,
    })
      .sort({ [sortPattern]: sortOrder })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
