import React from 'react';
import {QRCodeSVG} from 'qrcode.react';
import {Box} from "@mui/material";
import {useAppSelector} from "../../../../store/hooks";

const QRPage = () => {
    const {token} = useAppSelector((state) => state.auth)
    return (
        <Box display={'flex'} justifyContent={'center'}>
            <QRCodeSVG size={256} value={window.location.origin + "/payment?data=" + token.split(' ')[1]} />
        </Box>
    );
};

export default QRPage;