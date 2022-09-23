interface AuthInitialState {
    isAuth: boolean,
    login: string,
    token: string,
    email: string
}

export const authInitialState: AuthInitialState = {
    isAuth: false,
    login: '',
    token: '',
    email: ''
}