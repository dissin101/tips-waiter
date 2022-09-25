import React, {useEffect} from 'react';
import {Box, Button, Divider, Paper, TextField, Typography} from "@mui/material";
import {useAppSelector} from "../../../../store/hooks";
import {
    useGetBalanceMutation,
    useIdentificationMutation,
    useTransferToCardMutation
} from "../../../../services/donate.service";
import {useFormik} from "formik";
import Loader from "../../../../components/Loader";

const Profile = () => {

    const {login, email, identified, token} = useAppSelector((state) => state.auth)
    const [getBalance, {isLoading, error, data}] = useGetBalanceMutation();
    const [transferToCard, {
        isLoading: isLoadingTransferToCard,
        error: transferToCardError,
        data: transferToCardData}] = useTransferToCardMutation();
    const [identification, {
        isLoading: isIdentificationLoading,
        error: identificationError,
        data: identificationData}] = useIdentificationMutation()

    useEffect(() => {
        getBalance({token: token.split(' ')[1]});
    }, []);

    useEffect(() => {
        if (transferToCardData){
            window.location.href = transferToCardData.frame_url;
        }
    }, [transferToCardData]);

    useEffect(() => {
        if (identificationData){
            window.location.href = identificationData.url;
        }
    }, [identificationData])

    const formik = useFormik({
        initialValues: {
            amount: 1000
        },
        onSubmit: ({amount}) => {
            if (identified){
                const form = {
                    token: token.split(' ')[1],
                    body: {
                        amount,
                        mobile_scripts: true
                    }
                }
                transferToCard(form);
            } else {
                const form = {
                    token: token.split(' ')[1],
                    body: {
                        phone: login
                    }
                };

                identification(form);
            }
        }
    });

    return (
        <Box display={'flex'} flexDirection={'column'} marginTop={2} justifyContent={'center'} alignItems={'center'}>
            {(isLoading || isLoadingTransferToCard || isIdentificationLoading) && <Loader/>}
            <Paper sx={{minWidth: '320px', maxWidth: '320px', marginTop: 2}}>
                <Box sx={{padding: '16px'}}>
                    <Typography fontSize={'16px'} sx={{fontWeight: 800}}>
                        Информация о пользователе
                    </Typography>
                    <Typography marginTop={2}>
                        Имя пользователя: Тестовый юзер
                    </Typography>
                    <Typography marginTop={1}>
                        Пользователь: {login}
                    </Typography>
                    <Typography marginTop={1}>
                        Email: {email}
                    </Typography>
                    <Typography marginTop={1}>
                        Статус: {identified ? "Идентифицированный" : "Не идентифицированный"}
                    </Typography>
                </Box>
                <Divider/>
                <Box sx={{padding: '16px'}}>
                    <Typography fontSize={'16px'} sx={{fontWeight: 800}}>
                        Вывод средств
                    </Typography>
                    <Typography marginTop={2}>
                        Доступные средства: {data && data.active}
                    </Typography>
                    <Typography marginTop={1}>
                        Средста находящиеся в блоке: {data && data.blocked}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        {
                            identified ?
                                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                    <TextField
                                        sx={{marginTop: 2}}
                                        label={'Введите сумму для вывода'}
                                        name={'amount'}
                                        onChange={formik.handleChange}
                                        value={formik.values.amount}
                                        disabled={isLoadingTransferToCard}
                                        fullWidth
                                    />
                                    <Button
                                        sx={{marginTop: 1}}
                                        variant={'contained'}
                                        color={'success'}
                                        disabled={isLoadingTransferToCard}
                                        type={'submit'}>Вывести</Button>
                                </Box> :
                                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                    <Typography marginTop={2}>
                                        Для вывода средств необходимо пройти идентификацию
                                    </Typography>
                                    <Button
                                        variant={'contained'}
                                        color={'success'}
                                        type={'submit'}
                                        sx={{marginTop: 2}}
                                    >
                                        Идентифицироваться
                                    </Button>
                                </Box>
                        }
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};

export default Profile;