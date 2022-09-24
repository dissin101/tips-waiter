import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Cabinet = () => {
    const [isOpenAnchor, setIsOpenAnchor] = useState(false);

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={setIsOpenAnchor.bind(null, false)}
            onKeyDown={setIsOpenAnchor.bind(null, false)}
        >
            Меню курьера
        </Box>
    );

    return (
        <>
            {/*<Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={setIsOpenAnchor.bind(null, true)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Кабинет курьера
                        </Typography>
                        <Button color="inherit">Выйти</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <React.Fragment key={'anchor'}>
                <Drawer
                    anchor={'left'}
                    open={isOpenAnchor}
                    onClose={setIsOpenAnchor.bind(null, false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>*/}
        </>
    );
};

export default Cabinet;