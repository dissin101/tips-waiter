import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const donateApi = createApi({
    reducerPath: 'donateApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.yii2-stage.test.wooppay.com/v1/' }),
    endpoints: (builder) => ({
        service: builder.mutation({
            query: ({token, body}) => ({
                url: `service/donate`,
                method: 'POST',
                headers: {
                    Authorization: token
                },
                body
            }),
        }),
        pseudoAuth: builder.mutation({
            query: (body) => ({
                url: `auth/pseudo`,
                method: 'POST',
                body
            }),
        }),
        newTransfer: builder.mutation({
            query: ({token, body}) => ({
                url: `payment/transfer-new`,
                method: 'POST',
                headers: {
                    Authorization: token
                },
                body
            }),
        }),
        payCard: builder.mutation({
            query: ({token, body}) => ({
                url: `payment/pay-from-card`,
                method: 'POST',
                headers: {
                    Authorization: token
                },
                body
            }),
        }),
        paymentHistory: builder.mutation({
            query: ({token}) => ({
                url: `history`,
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }),
        }),
        getBalance: builder.mutation({
            query: ({token}) => ({
                url: `balance`,
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }),
        }),
    }),
})

export const {
    useServiceMutation,
    usePseudoAuthMutation,
    useNewTransferMutation,
    usePayCardMutation,
    usePaymentHistoryMutation,
    useGetBalanceMutation
} = donateApi;