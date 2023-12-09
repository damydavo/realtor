import asyncHandler from 'express-async-handler';

import Listing from "../models/listingModel.js"

//@desc create listing
//@route  POST/api/listing
//@access  private

const createListing = asyncHandler(async (req, res) => {
    const { name, description, address, regularPrice, discountPrice, bathrooms, bedrooms, furnished, parking, type, offer, imageUrls } = req.body

    const createListing = await Listing.create({
        name,
        description,
        address,
        type,
        bedrooms,
        bathrooms,
        regularPrice,
        discountPrice,
        offer,
        parking,
        furnished,
        imageUrls,
        user: req.user._id
    })

    res.status(200).json(createListing)
})


const getListing = asyncHandler(async (req, res) => {
    const listing = await Listing.find({ user: req.user._id })
    if (!listing) {
        res.status(400)
        throw new Error("Listing not found")
    }
    res.status(200).json(listing)
})

//get all listings
const getListings = asyncHandler(async (req, res) => {
    const listing = await Listing.find({})
    if (!listing) {
        res.status(400)
        throw new Error("Listing not found")
    }
    res.status(200).json(listing)
})

//get a single listing
const getSingleListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        res.status(400)
        throw new Error("Lisitng not found")
    }
    res.status(200).json(listing)
})

// const updateListing = asyncHandler(async(req, res) => {
//     const updatedListing = await Listing.findOneAndUpdate({user:req.user._id}, req.body, { new: true })   
//     if(!updateListing) {
//         res.status(400)
//         throw new Error("Not Authorized")
//     }
//     res.status(200).json(updatedListing)

// })

const updateListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
        res.status(400)
        throw new Error("Not Authorized")
    }
    if (!req.user._id) {
        res.status(400)
        throw new Error("You can only update your listing")
    }

    const updateListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updateListing)
})

const deleteListing = asyncHandler(async (req, res) => {
    const deletedListing = await Listing.findById(req.params.id)

    if (!deletedListing) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await Listing.findByIdAndDelete(req.params.id)
})


export {
    createListing,
    getListing,
    getListings,
    updateListing,
    deleteListing,
    getSingleListing,
}



