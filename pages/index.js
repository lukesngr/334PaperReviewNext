import { Button, TextField, Card, Box, Typography } from "@mui/material";
import {useRef} from "react";
import { signIn } from 'next-auth/react';


export default function Login() {
    const formReference = useRef();
    async function loginUser(){
        const {userName, userPassword} = formReference.current;
        const userNameToBeVerified = userName.value;
        const userPasswordToBeVerified = userPassword.value;
        const res = await signIn('credentials', {
                userName: userNameToBeVerified,
                userPassword: userPasswordToBeVerified,
                callbackUrl: '/',
            });
        

        if(res?.error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                    <Card>
                        <Box>
                            <form ref={formReference}>
                            <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                <Typography variant="h4">Login</Typography>
                                <TextField fullWidth="true" name="userName" label="Username" variant="standard" />
                                <TextField fullWidth="true" name="userPassword" label="Password" type="password" variant="standard" />
                                <Button variant="contained" color="primary" onClick={()=> loginUser()}>Sign In</Button>
                            </Box>
                            </form>
                        </Box>
                    </Card>
            </Box>
        </>
        
    );

}