import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {Drawer, DrawerHeader} from "./index.styles"
import DrawerContent from "./components/DrawerContent";
import Header from "./components/Header";

const Cabinet = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                Контент
            </Box>
        </Box>
    );
};

export default Cabinet;