import React from 'react';
import {QRCodeSVG} from 'qrcode.react';
import {Box, Button} from "@mui/material";
import {useAppSelector} from "../../../../store/hooks";

const QRPage = () => {
    const {token} = useAppSelector((state) => state.auth)
    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <QRCodeSVG size={256} value={window.location.origin + "/payment?data=" + token.split(' ')[1]} />
            <Button sx={{marginTop: 2, width: '120px'}} onClick={() => window.print()} variant={'contained'}>Печать</Button>
        </Box>
    );
};

export default QRPage;