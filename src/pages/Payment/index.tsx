import React, {useEffect, useState} from 'react';
import {useQuery} from "../../helpers/query";
import {useFormik} from "formik";
import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {StyledAmountBox, StyledIframe} from "./index.styles";
import {
    useNewTransferMutation,
    usePayCardMutation,
    usePseudoAuthMutation,
    useServiceMutation
} from "../../services/donate.service";
import {useHistory} from "react-router-dom";
import Loader from "../../components/Loader";

const Payment = () => {
    const query = useQuery();
    const waiterAuthToken = query.get("data");
    const [currentForm, setCurrentForm] = useState('paymentAmount');
    const [clientToken, setClientToken] = useState('');
    const [operationId, setOperationId] = useState('');
    const [iFrameUrl, setIframeUrl] = useState(null)

    const [service, {isLoading: isServiceLoading, error: serviceError, data: serviceData}] = useServiceMutation();
    const [pseudoAuth, {isLoading: isPseudoAuthLoading, error: pseudoAuthError, data: pseudoAuthData }] = usePseudoAuthMutation()
    const [newTransfer, {isLoading: isNewTransferLoading, error: newTransferError, data: newTransferData}] = useNewTransferMutation();
    const [payCard, {isLoading: isPayCardLoading, error: payCardError, data: payCardData }] = usePayCardMutation();

    const formik = useFormik({
        initialValues: {
            amount: '',
            service_name: '',
            login: '',
        },
        onSubmit: ({amount, service_name, login}) => {
            let form = {}
            switch (currentForm) {
                case 'paymentAmount':
                    form = {
                        token: waiterAuthToken,
                        body: {
                            fields: {
                                amount
                            },
                            name: 'Чаевые'
                        }
                    }
                    service(form);
                    break;
                case 'auth':
                    form = {
                        login
                    }
                    pseudoAuth(form);
                    break;
                /*default:
                    console.log(amount, service_name)
                    break;*/
            }
        }
    })

    useEffect(() => {
        if (serviceData) {
            formik.setValues({...formik.values, service_name: serviceData.service_name});
            setCurrentForm('auth');
        }
    }, [serviceData]);

    useEffect(() => {
        if (pseudoAuthData) {
            setClientToken(pseudoAuthData.token);
            const form = {
                token: pseudoAuthData.token,
                body: {
                    service_name: formik.values.service_name,
                    fields: {
                        amount: formik.values.amount
                    }
                }
            }
            newTransfer(form)
        }
    }, [pseudoAuthData]);

    useEffect(() => {
        if (newTransferData){
            const form = {
                token: clientToken,
                body: {
                    operation_id: newTransferData.operation.id
                }
            }
            payCard(form)
        }
    }, [newTransferData]);

    useEffect(() => {
        if (payCardData){
            window.location.href = payCardData.frame_url;
            //setIframeUrl(payCardData.frame_url)
        }
    }, [payCardData])

    return (
        <Container maxWidth="xl"
                   sx={{
                       minHeight: '100vh',
                       padding: 0,
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
            {(isNewTransferLoading || isPayCardLoading || isPseudoAuthLoading || isServiceLoading) && <Loader/>}
            {iFrameUrl ? <StyledIframe src={iFrameUrl}/> :
                <StyledAmountBox>
                    <form onSubmit={formik.handleSubmit}>
                        {currentForm === 'paymentAmount' &&
                        <>
                          <Typography variant={'h5'} marginBottom={2}>Введите сумму чаевых</Typography>
                          <TextField
                            name={'amount'}
                            type={'number'}
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            disabled={isNewTransferLoading || isPayCardLoading || isPseudoAuthLoading || isServiceLoading}
                            fullWidth
                          />
                        </>
                        }
                        {currentForm === 'auth' &&
                        <>
                          <Typography variant={'h5'} marginBottom={2}>Введите Ваш номер телефона</Typography>
                          <TextField
                            name={'login'}
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            disabled={isNewTransferLoading || isPayCardLoading || isPseudoAuthLoading || isServiceLoading}
                            fullWidth
                          />
                        </>
                        }
                        <Box display={'flex'} justifyContent={'center'} marginTop={2}>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                disabled={isNewTransferLoading || isPayCardLoading || isPseudoAuthLoading || isServiceLoading}
                            >Отправить</Button>
                        </Box>
                    </form>
                </StyledAmountBox>
            }
        </Container>
    );
};

export default Payment;