import React, {useEffect, useState} from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {Drawer, DrawerHeader} from "./index.styles"
import DrawerContent from "./components/DrawerContent";
import Header from "./components/Header";
import {useHistory, useLocation} from "react-router-dom";
import QRPage from "./pages/QR";

const Cabinet = () => {
    const theme = useTheme();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [directory, setDirectory] = useState<any>("")

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const separatedLocation = location.pathname.split('/');
        setDirectory(separatedLocation[separatedLocation.length - 1])
    }, [location]);

    const Content = () => {
        switch (directory){
            case 'profile':
                return <div>Profile</div>
            case 'transactions':
                return <div>Transactions</div>
            case 'qrcode':
                return <QRPage/>
            default:
                return <div>Default</div>
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header
                open={open}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Drawer variant="permanent" open={open}>
                <DrawerContent
                    open={open}
                    theme={theme}
                    handleDrawerClose={handleDrawerClose}
                />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Content/>
            </Box>
        </Box>
    );
};

export default Cabinet;