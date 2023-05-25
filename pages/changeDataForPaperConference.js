import {Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import {useRef, useState} from "react"
import axios from "axios"
import { useSession } from 'next-auth/react';
import {Card, Stack} from '@mui/material';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { SignedInReviewNavbar } from "../components/navbar/SignedInReviewNavbar";

function BidPapers(props) {
    
    let papers = [];
    //const inputProps = { 'underline': 'primary' };
    
    const { status: getStatus, error, data: papersData} = useQuery({
        queryKey: ['paperReviewers'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getPapersForReviewers', {params: {email: props.email}}).then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        papers = papersData;
    }else if(getStatus === "error") {
        console.log(error);
    }

    async function bidForPaper(id) {
        try {
            let result = await axios.post('/api/bidForPaper', {paper: {connect: {id: id}}, reviewerEmail: props.email});

            if(result.status == 200) {
                console.log('Success');
            }
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <SignedInReviewNavbar></SignedInReviewNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center'}} >
                <Card sx={{p: 5, my: 10}}>
                    <Typography variant="h5">Available Papers</Typography>
                    <Stack direction="column">
                        {papers.map(paper => (
                            <Stack direction="row">
                                <Box sx={{border: 1, borderColor: '#0FA597', width: 400}}>
                                    <Typography variant="h5">{paper.title} by {paper.authorEmail}</Typography>
                                    <Typography variant="h5">{paper.description}</Typography>
                                </Box>
                                <Box sx={{border: 1, borderColor: '#0FA597'}}>
                                    <Button variant="contained" onClick={() => bidForPaper(paper.id)} sx={{m: 3}}>Bid</Button>
                                </Box>  
                            </Stack>
                        ))}
                    </Stack>
                </Card>
            </Box>
        </>
    )
}

export default function bidPapers() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        if(session.user.userCategory == "Reviewers") {
            return <BidPapers email={session.user.email}></BidPapers>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}