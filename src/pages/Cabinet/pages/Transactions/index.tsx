import React, {useEffect} from 'react';
import {usePaymentHistoryMutation} from "../../../../services/donate.service";
import {useAppSelector} from "../../../../store/hooks";
import {
    Alert,
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Loader from "../../../../components/Loader";
import {useHistory} from "react-router-dom";
import moment from "moment";

const Transactions = () => {

    const history = useHistory();
    const {token, identified} = useAppSelector((state) => state.auth)
    const [paymentHistory, {isLoading, error, data}] = usePaymentHistoryMutation()

    useEffect(() => {
        paymentHistory({token: token.split(' ')[1]})
    }, [])

    const OPERATION_STATUSES = {
        "11": "Новая",
        "12": "На рассмотрении",
        "14": "Проведена",
        "17": "Отменена",
        "19": "Ожидает проведения",
        "20": "Удалена"
    }

    return (
        <>
            {isLoading ?
                <Box display={'flex'} justifyContent={'center'}>
                    <Loader/>
                </Box> :
                <>
                    {identified ? <Button
                                    onClick={() => history.push('/cabinet/profile')}
                                    sx={{marginBottom: 2}}
                                    variant="contained"
                                    color="success"
                                  >Вывести средства</Button> :
                        <Alert sx={{marginBottom: 2}} severity="warning">
                            Для вывода средств на карту требуется идентификация
                        </Alert>
                    }
                    {data && data.length > 0 ?
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID платежа</TableCell>
                                        <TableCell>Дата создания</TableCell>
                                        <TableCell align="right">Сумма</TableCell>
                                        <TableCell align="right">Название</TableCell>
                                        <TableCell align="right">Номер плательщика</TableCell>
                                        <TableCell align="right">Статус операции</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row: any) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell align="right">{moment(row.donned_at).format('DD.MM.YYYY')}</TableCell>
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="right">{row.title}</TableCell>
                                            <TableCell align="right">{row.account}</TableCell>
                                            {/*@ts-ignore*/}
                                            <TableCell align="right">{OPERATION_STATUSES[row.status]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <div>Список пуст</div>
                    }
                </>
            }
        </>
    );
};

export default Transactions;