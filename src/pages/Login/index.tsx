import React, {useEffect} from 'react';
import {Button, CircularProgress, Grid, Paper, TextField, Typography} from "@mui/material";
import {StyledLoginBox, StyledLoginNavLink} from "./index.styles";
import {useFormik} from "formik";
import {useAuthMutation} from "../../services/auth.service";
import Loader from "../../components/Loader";
import {useAppDispatch} from "../../store/hooks";
import {loginUser} from "../../store/auth/auth.slice";
import {useHistory} from "react-router-dom";

/**
 * Страница авторизации пользователя
 * @constructor
 */
const Login = () => {

    const dispatch = useAppDispatch();
    const history = useHistory();
    const [auth, {isLoading, error, data}] = useAuthMutation();

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        onSubmit: (values) => {
            auth(values)
        }
    });

    useEffect(() => {
        if (error){
            /*todo Add Snackbar*/
            console.log(error)
        }
    }, [error])

    useEffect(() => {
        if (data){
            dispatch(loginUser(data));
            history.push('/cabinet');
        }
    }, [data])

    return (
        <form onSubmit={formik.handleSubmit}>
            <StyledLoginBox>
                <Grid padding={2} justifyContent={'center'} container maxWidth={'sm'}>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        display={'flex'}
                        minHeight={'70px'}
                        flexDirection={'column'}
                        textAlign={'center'}
                        alignItems={'center'}
                    >
                        {isLoading ?
                            <Loader/> :
                            <>
                                <Typography variant={'h6'}>
                                    Авторизация
                                </Typography>
                                <Typography variant={'h4'}>
                                    WooThanks!
                                </Typography>
                            </>
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} marginTop={4} marginBottom={2}>
                        <TextField
                            label={'Логин'}
                            variant={'outlined'}
                            name={'login'}
                            onChange={formik.handleChange}
                            value={formik.values.login}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} marginBottom={4}>
                        <TextField
                            label={'Пароль'}
                            variant={'outlined'}
                            name={'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            type={'password'}
                            disabled={isLoading}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} marginBottom={2}>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            size={'large'}
                            type={'submit'}
                            disabled={isLoading}
                            fullWidth
                        >Войти</Button>
                    </Grid>
                    <Grid item xs={12} sm={8} textAlign={'end'}>
                        <Typography>
                            <StyledLoginNavLink to={'/registration'}>
                                Регистрация
                            </StyledLoginNavLink>
                        </Typography>
                    </Grid>
                </Grid>
            </StyledLoginBox>
        </form>
    );
};

export default Login;