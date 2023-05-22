import React from 'react';
import { Grid, Link, AppBar, Toolbar } from "@mui/material";

export function NotSignedInNavbar() {
    return (<AppBar color="primary" positon="static">
                <Toolbar sx={{pl:0 }}>
                    <Grid container spacing={1}>
                        <Grid item md={1} xs={1}><Link variant="h5" color="secondary" underline="none" href="/">Home</Link></Grid>
                        <Grid item md={3} xs={1}><Link variant="h5" color="secondary" underline="none" href="/createaccount">Sign Up</Link></Grid>
                    </Grid>
                </Toolbar>
            </AppBar>)
}
