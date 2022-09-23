import {Box, Container, styled} from "@mui/material";
import {NavLink} from "react-router-dom";

export const StyledLoginBox = styled(Box)(({theme}) => ({
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

export const StyledLoginNavLink = styled(NavLink)(({theme}) => ({
    color: theme.palette.primary.light,
}))