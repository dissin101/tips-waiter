import React, {useEffect, useState} from 'react';
import {StyledRegistrationBox} from './index.styles';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {StyledLoginNavLink} from "../Login/index.styles";
import {useFormik} from "formik";
import {useCreateAccountMutation, useSetPasswordMutation} from "../../services/registration.service";
import Loader from "../../components/Loader";
import {useHistory} from "react-router-dom";

/**
 * Страница регистрации пользователя
 * @constructor
 */
const Registration = () => {

    const history = useHistory();
    const [isShowSMSInput, setIsShowSMSInput] = useState(false);

    const [createAccount, {
        isLoading: isCreateAccountLoading,
        error: createAccountError,
        data: createAccountData
    }] = useCreateAccountMutation();

    const [setPassword, {
        isLoading: isSetPasswordLoading,
        error: setPasswordError,
        data: setPasswordData
    }] = useSetPasswordMutation();

    useEffect(() => {
        if (createAccountError){
            console.log(createAccountError)
        }
    }, [createAccountError])

    useEffect(() => {
        if (setPasswordError){
            console.log(setPasswordError)
        }
    }, [setPasswordError])

    useEffect(() => {
        if (createAccountData === null){
            console.log(createAccountData)
            setIsShowSMSInput(true);
        }
    }, [createAccountData])

    useEffect(() => {
        if (setPasswordData){
            history.push('/login')
        }
    }, [setPasswordData])

    const formik = useFormik({
        initialValues: {
            login: '7',
            email: '',
            password: '',
            activation_code: ''
        },
        onSubmit: (values) => {
            if (!isShowSMSInput) {

                const form = {
                    login: values.login,
                    email: values.email
                }
                createAccount(form);
            } else {
                const form = {
                    login: values.login,
                    password: values.password,
                    activation_code: values.activation_code
                }
                setPassword(form);
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <StyledRegistrationBox>
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
                        {(isCreateAccountLoading || isSetPasswordLoading) ?
                            <Loader/> :
                            <>
                                <Typography variant={'h6'}>
                                    Регистрация
                                </Typography>
                                <Typography variant={'h4'}>
                                    WooThanks!
                                </Typography>
                            </>
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} marginTop={4} marginBottom={2}>
                        <TextField
                            label={'Телефон'}
                            variant={'outlined'}
                            disabled={isShowSMSInput}
                            name={'login'}
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            //mask="+# (###) ###-##-##"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label={'Email'}
                            variant={'outlined'}
                            disabled={isShowSMSInput}
                            name={'email'}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                    </Grid>
                    {isShowSMSInput &&
                    <>
                      <Grid item xs={12} sm={8} marginTop={2} marginBottom={2}>
                        <TextField
                          label={'Код'}
                          variant={'outlined'}
                          name={'activation_code'}
                          value={formik.values.activation_code}
                          onChange={formik.handleChange}
                          autoComplete={'one-time-code'}
                          type={'number'}
                          inputMode={'numeric'}
                          maxRows={6}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          label={'Пароль'}
                          variant={'outlined'}
                          name={'password'}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          type={'password'}
                          fullWidth
                        />
                      </Grid>
                    </>
                    }
                    <Grid item xs={12} sm={8} marginTop={4} marginBottom={2}>
                        <Button variant={'contained'}
                                color={'primary'}
                                size={'large'}
                                type={'submit'}
                                disabled={(isCreateAccountLoading || isSetPasswordLoading)}
                                fullWidth
                        >
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
        </form>
    );
};

export default Registration;