import React from 'react';
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {StyledLoginBox, StyledLoginNavLink} from "./index.styles";

/**
 * Страница авторизации пользователя
 * @constructor
 */
const Login = () => {
    return (
        <StyledLoginBox>
            <Grid padding={2} justifyContent={'center'} container maxWidth={'sm'}>
                <Grid item xs={12} sm={8} display={'flex'} flexDirection={'column'} textAlign={'center'}>
                    <Typography variant={'h6'}>
                        Авторизация
                    </Typography>
                    <Typography variant={'h4'}>
                        WooThanks!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} marginTop={4} marginBottom={2}>
                    <TextField label={'Логин'} variant={'outlined'} fullWidth/>
                </Grid>
                <Grid item xs={12} sm={8} marginBottom={4}>
                    <TextField label={'Пароль'} variant={'outlined'} type={'password'} fullWidth/>
                </Grid>
                <Grid item xs={12} sm={8} marginBottom={2}>
                    <Button variant={'contained'} color={'primary'} size={'large'} fullWidth>Войти</Button>
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
    );
};

export default Login;