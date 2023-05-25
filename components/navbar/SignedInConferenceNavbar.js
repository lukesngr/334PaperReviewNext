import {React, useState} from 'react';
import { Grid, Link, AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut } from 'next-auth/react';

export function SignedInConferenceNavbar() {
    const [anchor, setAnchor] = useState(null);
    const isMenuOpen = Boolean(anchor);

    const handleMenuOpen = (event) => {
      setAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchor(null);
    };
    return (<AppBar color="primary" positon="static">
                <Toolbar sx={{pl:0 }}>
                    <Grid container spacing={1}>
                        <Grid item md={1} xs={1}><Link variant="h5" color="secondary" underline="none" href="/">Home</Link></Grid>
                        <Grid item md={2} xs={1}><Link variant="h5" color="secondary" underline="none" href="/viewpapers">View Papers</Link></Grid>
                        <Grid item md={2} onClick={handleMenuOpen}>
                            <IconButton color="secondary">
                                <AccountCircleIcon></AccountCircleIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Menu anchorEl={anchor} anchorOrigin={{vertical: 'top',horizontal: 'right'}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right'}} open={isMenuOpen} onClose={handleMenuClose}>
                  <MenuItem onClick={signOut}>Sign out</MenuItem>
                </Menu>
            </AppBar>)
}
