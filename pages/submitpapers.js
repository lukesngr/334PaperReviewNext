import { SignedInAuthNavbar } from "../components/navbar/SignedInAuthNavbar";
import { useSession } from 'next-auth/react';
import Router  from "next/router";
import axios from "axios";
import { Typography, Box, TextField, Button } from "@mui/material";
import { React, useRef } from "react";

export default function SubmitPapers() {
    const {data: session, status } = useSession();
    const formReference = useRef(null)
    const inputProps = { 'underline': 'primary' };

    async function createReport(){
        const {title, description} = formReference.current;
        const titleToBeSent = title.value;
        const descriptionToBeSent = description.value;
        try {
            const res = await axios.post('/api/submitPaper', {title: titleToBeSent, description: descriptionToBeSent, authorEmail: session.user.email});
            if(res.status == 200) {
                console.log('Success')
            }
        }catch (error) {
            console.log(error)
        }
        
        
        
        
    }
    
    if(status == "authenticated") {
        if(session.user.userCategory == "Authors") {
            return (<>
                        <SignedInAuthNavbar></SignedInAuthNavbar>
                        <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                            <Box>
                                <form ref={formReference}>
                                    <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                        <Typography color="secondary" variant="h2">Submit Paper</Typography>
                                        <TextField InputProps={inputProps} sx={{width: 400}} name="title" label="Title" variant="standard" />
                                        <TextField InputProps={inputProps} sx={{width: 400}}  name="description" label="Description" variant="standard" />          
                                        <Button variant="contained" color="secondary" onClick={()=> createReport()}>Submit</Button>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </>)
        }
    }else if(status == "loading") {
        return <Typography color="secondary" variant="h2">Loading</Typography>
    }else if(status =="unauthenticated") {
        Router.push('/');
    }
}