import { Button, TextField, Card, Box, Typography } from "@mui/material";
import {useRef} from "react";
import { signIn } from 'next-auth/react';
import {NotSignedInNavbar} from '../components/navbar/NotSignedInNavbar'
import { useSession } from 'next-auth/react'
import { AuthorHomePage } from "../components/homepages/AuthorHomePage";
import { signOut } from "next-auth/react";


export default function Login() {
    const formReference = useRef();
    const inputProps = { 'underline': 'primary' };
    const {data: session, status } = useSession()
    async function loginUser(){
        const {email, userPassword} = formReference.current;
        const emailToBeVerified = email.value;
        const userPasswordToBeVerified = userPassword.value;
        const res = await signIn('credentials', {
                email: emailToBeVerified,
                userPassword: userPasswordToBeVerified,
                callbackUrl: '/',
            });
        

        if(res?.error) {
            console.log(error);
        }
        
    }

    if(status == "authenticated") {
        if(session.user.userCategory == "Authors") {
            return <AuthorHomePage email={session.user.email}></AuthorHomePage>
        }else{
            return (<>
                        <Typography color="secondary" variant="h2">{session.user.userCategory}</Typography>
                        <Button variant="contained" onClick={signOut}>Yo</Button>
                    </>)
            
        } 
    }else if(status == "loading") {
        return <Typography color="secondary" variant="h2">Loading</Typography>
    }else if(status =="unauthenticated") {
        return (
            <>
                <NotSignedInNavbar></NotSignedInNavbar>
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                        <Box>
                            <form ref={formReference}>
                                <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                    <Typography color="secondary" variant="h2">Log in</Typography>
                                    <TextField InputProps={inputProps} sx={{width: 400}} name="email" label="Enter Your Email" variant="standard" />
                                    <TextField InputProps={inputProps} sx={{width: 400}}  name="userPassword" label="Password" type="password" variant="standard" />
                                    <Button variant="contained" color="secondary" onClick={()=> loginUser()}>Sign In</Button>
                                </Box>
                            </form>
                        </Box>
                </Box>
            </>
            
        );
    }

    

}