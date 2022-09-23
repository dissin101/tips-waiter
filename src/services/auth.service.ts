import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.yii2-stage.test.wooppay.com/v1/' }),
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: (body) => ({
                url: `auth`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const {useAuthMutation} = authApi;