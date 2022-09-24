import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registrationApi = createApi({
    reducerPath: 'registrationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.yii2-stage.test.wooppay.com/v1/' }),
    endpoints: (builder) => ({
        createAccount: builder.mutation({
            query: (body) => ({
                url: `registration/create-account`,
                method: 'POST',
                body,
            }),
        }),
        setPassword: builder.mutation({
            query: (body) => ({
                url: `registration/set-password`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const {useCreateAccountMutation, useSetPasswordMutation} = registrationApi;