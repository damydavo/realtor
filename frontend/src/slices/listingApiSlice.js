import { apiSlice } from "./apiSlice";

const LISTING_API = 'api/listing'

export const listingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createListing: builder.mutation({
            query: (data) => ({
                url: `${LISTING_API}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Listing'],

        }),
        getListing: builder.query({
            query: () => ({
                url: `${LISTING_API}`,
                method: 'GET',
            }),
            invalidatesTags: ['Listing'],

        }),
        getListings: builder.query({
            query: () => ({
                url: `${LISTING_API}/all`,
                method: 'GET',
            }),
            invalidatesTags: ['Listing'],

        }),
        getSingleListing: builder.query({
            query: ({ listingId, ...rest }) => ({
                url: `/api/listing/${listingId}`,
                method: 'GET',
                body: rest
            }),
            invalidatesTags: ['Listing'],

        }),

        updateListing: builder.mutation({
            query: ({ listingId, ...data }) => ({
                url: `/api/listing/${listingId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Listing'],

        }),

        deleteListing: builder.mutation({
            query: (listingId) => ({
                url: `/api/listing/${listingId}`,
                method: 'DELETE',
            }),
        }),
    }),
})



export const { useCreateListingMutation, useGetListingQuery, useUpdateListingMutation, useGetSingleListingQuery, useDeleteListingMutation, useGetListingsQuery } = listingApiSlice
