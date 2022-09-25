import {Box, styled} from "@mui/material";

export const StyledAmountBox = styled(Box)(({theme}) => ({
    //border: `1px solid ${theme.palette.grey["200"]}`,
    textAlign: 'center',
    borderRadius: '4px',
    padding: '16px 32px',
    width: '320px',
    marginTop: 2
}))

export const StyledIframe = styled("iframe")(({theme}) => ({
    border: 'none',
    width: '400px',
    height: '500px'
}));