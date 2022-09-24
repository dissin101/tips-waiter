import { configureStore } from '@reduxjs/toolkit'
import {authApi} from "../services/auth.service";
import {authSlice} from "./auth/auth.slice";
import {registrationApi} from "../services/registration.service";
// ...

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [registrationApi.reducerPath]: registrationApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            registrationApi.middleware
        ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch