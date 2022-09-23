import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const loginApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.yii2-stage.test.wooppay.com/v1/' }),
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (body) => ({
                url: `auth`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const {useLoginMutation} = loginApi;