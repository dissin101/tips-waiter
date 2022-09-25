import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authInitialState} from "./auth.initialState";

interface IAuthPayload {
    login: string,
    email: string,
    token: string,
    identified: number
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        loginUser: (state,{ payload }: PayloadAction<IAuthPayload>) => {
            state.isAuth = true;
            state.login = payload.login;
            state.email = payload.email;
            state.token = payload.token;
            state.identified = payload.identified;
        }
    }
})

export const {loginUser} = authSlice.actions