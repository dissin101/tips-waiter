import {Theme} from '@mui/material/styles';

export type DrawerType = {
    open: boolean;
    handleDrawerClose: () => void;
    theme: Theme
}