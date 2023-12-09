import express from 'express'

import { createListing, deleteListing, getListing, getListings, getSingleListing, updateListing } from '../controllers/listingController.js'

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route("/").get(protect, getListing).post(protect, createListing)
router.route("/all").get(getListings)
router.route("/:id").put(protect, updateListing).delete(protect, deleteListing).get(getSingleListing)

export default router 