import React, {useState} from 'react';
import { StyledRegistrationBox } from './index.styles';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {StyledLoginNavLink} from "../Login/index.styles";

/**
 * Страница регистрации пользователя
 * @constructor
 */
const Registration = () => {

    const [isShowSMSInput, setIsShowSMSInput] = useState(false);

    return (
        <StyledRegistrationBox>
            <Grid padding={2} justifyContent={'center'} container maxWidth={'sm'}>
                <Grid item xs={12} sm={8} display={'flex'} flexDirection={'column'} textAlign={'center'}>
                    <Typography variant={'h6'}>
                        Регистрация
                    </Typography>
                    <Typography variant={'h4'}>
                        WooThanks!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} marginTop={4} marginBottom={2}>
                    <TextField label={'Телефон'} variant={'outlined'} disabled={isShowSMSInput} fullWidth/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField label={'Email'} variant={'outlined'} disabled={isShowSMSInput} fullWidth/>
                </Grid>
                {isShowSMSInput &&
                    <Grid item xs={12} sm={8} marginTop={2}>
                      <TextField label={'Код'} variant={'outlined'} fullWidth/>
                    </Grid>
                }
                <Grid item xs={12} sm={8} marginTop={4} marginBottom={2}>
                    <Button onClick={setIsShowSMSInput.bind(null, !isShowSMSInput)} variant={'contained'} color={'primary'} size={'large'} fullWidth>
                        {!isShowSMSInput ? 'Получить СМС-код' : 'Зарегистрироваться'}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={8} textAlign={'end'}>
                    <Typography>
                        Уже есть учетная запись?
                        <StyledLoginNavLink to={'/login'} sx={{marginLeft: '4px'}}>
                            Войти
                        </StyledLoginNavLink>
                    </Typography>
                </Grid>
            </Grid>
        </StyledRegistrationBox>
    );
};

export default Registration;