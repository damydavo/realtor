import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listing: [],
    listings: {},
}

const listingSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.listing = action.payload;
        },
        setListing: (state, action) => {
            state.listings = action.payload
        }
    }
})

export const { setCredentials, setListing } = listingSlice.actions

export default listingSlice.reducer