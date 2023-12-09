import { apiSlice } from "./apiSlice";

const USER_URL = 'api/users'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            }),
        }),
        deleteProfile: builder.mutation({
            query: () => ({
                url: `${USER_URL}/profile`,
                method: 'DELETE',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST'
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUpdateProfileMutation, useDeleteProfileMutation } = userApiSlice;
