import React, {useEffect} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {AppBar} from "../../index.styles";
import {HeaderType} from "./index.types";
import {useGetBalanceMutation} from "../../../../services/donate.service";
import {useAppSelector} from "../../../../store/hooks";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {Box} from "@mui/material";


const Header: React.FC<HeaderType> = ({open, handleDrawerOpen}) => {

    const {token} = useAppSelector((state) => state.auth)
    const [getBalance, {isLoading, error, data}] = useGetBalanceMutation()

    useEffect(() => {
        getBalance({token: token.split(' ')[1]});
    }, []);

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Личный кабинет официанта
                </Typography>
                {data &&
                    <Box sx={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
                      <AccountBalanceWalletIcon/>
                      <Typography sx={{marginLeft: '4px', fontWeight: '800'}} variant="h6" component="div">
                          {data.active}
                      </Typography>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;