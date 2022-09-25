interface AuthInitialState {
    isAuth: boolean,
    login: string,
    token: string,
    email: string
    identified: number
}

export const authInitialState: AuthInitialState = {
    isAuth: false,
    login: '',
    token: '',
    email: '',
    identified: 0
}