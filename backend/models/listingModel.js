import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true
      }, 
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true
    }
  
},
    {
        timestamps: true
    }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing
