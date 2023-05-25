import {Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Modal, Slider} from "@mui/material"
import {useRef, useState} from "react"
import axios from "axios"
import { useSession } from 'next-auth/react';
import {Card, Stack} from '@mui/material';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { SignedInReviewNavbar } from "../components/navbar/SignedInReviewNavbar";
import AddIcon from '@mui/icons-material/Add';

function BidPapers(props) {
    
    let papers = [];
    const { status: getStatus, error, data: papersData} = useQuery({
        queryKey: ['paperReviewers'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getPapersToReview').then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        papers = papersData;
    }else if(getStatus === "error") {
        console.log(error);
    }

    const [areReviewsHere, setAreReviewsHere] = useState(papers.Review != undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const marksList = [{
        value: 0,
        label: 'Strong Reject (-3)'
    },
    {
        value: 16,
        label: 'Reject (-2)'
    },
    {
        value: 33,
        label: 'Weak Reject (-1)'
    },
    {
        value: 50,
        label: 'Borderline(0)'
    },
    {
        value: 67,
        label: 'Weak Accept(1)'
    },
    {
        value: 83,
        label: 'Accept(2)'
    },
    {
        value: 100,
        label: 'Strong Accept(3)'
    }]

    return (
        <>
            <SignedInReviewNavbar></SignedInReviewNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center'}} >
                <Card sx={{p: 5, my: 10}}>
                    <Typography variant="h4">Papers to Review</Typography>
                    <Stack direction="column" sx={{mt: 5}}>
                        {papers.map(paper => (
                            <Stack direction="row">
                                <Box>
                                    <Typography variant="h4">Paper title: {paper.title} by {paper.authorEmail}</Typography>
                                    <Typography variant="h5">Description: {paper.description}</Typography>
                                    <Box sx={{border: 1, borderColor: '#0FA597', width: '90%', p: 3, borderRadius: 1}}>
                                        <Box display="flex" justifyContent="flex-end"><Button color="secondary" onClick={handleOpen}><AddIcon /></Button></Box>
                                        <Modal open={modalOpen} onClose={handleClose}>
                                            <Card sx={{width: 1000, bgcolor: 'primary', position: 'absolute', top: '25%', left: '25%', p: 5}}>
                                                <Typography variant="h4">Post review</Typography>
                                                <TextField label="Review text" multiline rows={4}/>
                                            <Slider
                                                defaultValue={0}
                                                step={null}
                                                valueLabelDisplay="auto"
                                                marks={marksList}
                                                sx={{width: 600}}
                                            />
                                            </Card>
                                        </Modal>
                                        {areReviewsHere && papers.Review.map(review => (
                                            <Stack direction="row">
                                                <Typography variant="h5">{review.reviewText}</Typography>
                                                <Rating value={review.rating} readOnly/>  
                                            </Stack>
                                        ))}
                                        {!areReviewsHere && <Typography variant="h4">No reviews here</Typography>}
                                    </Box>
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