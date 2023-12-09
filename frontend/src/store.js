import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import listingReducer from './slices/listingSlice'
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        listing: listingReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})


export default store;