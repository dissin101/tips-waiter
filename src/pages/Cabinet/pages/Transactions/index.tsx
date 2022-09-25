import React, {useEffect} from 'react';
import {usePaymentHistoryMutation} from "../../../../services/donate.service";
import {useAppSelector} from "../../../../store/hooks";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Loader from "../../../../components/Loader";

const Transactions = () => {

    const {token} = useAppSelector((state) => state.auth)
    const [paymentHistory, {isLoading, error, data}] = usePaymentHistoryMutation()

    useEffect(() => {
        paymentHistory({token: token.split(' ')[1]})
    }, [])

    console.log(isLoading, error, data)

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
                    {data && data.length > 0 ?
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID платежа</TableCell>
                                        <TableCell align="right">Сумма</TableCell>
                                        <TableCell align="right">Название</TableCell>
                                        <TableCell align="right">Номер плательщика</TableCell>
                                        <TableCell align="right">Статус операции</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row: any) => (
                                        <TableRow>
                                            <TableCell>{row.id}</TableCell>
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