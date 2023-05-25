import axios from "axios"
import { useSession } from 'next-auth/react';
import {Card, Stack, Typography, Box, Button, Modal, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { SignedInConferenceNavbar } from "../../components/navbar/SignedInConferenceNavbar";
import { useRouter } from 'next/router';
import { useState } from "react";
import { ViewReviews } from "../../components/ViewReviews";
 
function ViewDataForPaperConference(props) {
    
    const router = useRouter();
    
    let paperData = [];
    const { status: getStatus, error, data: papersData} = useQuery({
        queryKey: ['paperConference'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getPaperForConference', {params: {paperID: router.query.paperID}}).then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        paperData = papersData;
    }else if(getStatus === "error") {
        console.log(error);
    }


    async function allocatePaper(id) {
        try {
            let result = await axios.post('/api/allocatePaper', {reviewerEmail: props.email, paperID: id});

            if(result.status == 200) {
                console.log('Success');
            }
        }catch(error) {
            console.log(error);
        }
    }

    async function acceptPaper(id) {
        try {
            let result = await axios.post('/api/acceptPaper', {paperID: id});

            if(result.status == 200) {
                console.log('Success');
            }
        }catch(error) {
            console.log(error);
        }
    }

    async function rejectPaper(id) {
        try {
            let result = await axios.post('/api/rejectPaper', {paperID: id});

            if(result.status == 200) {
                console.log('Success');
            }
        }catch(error) {
            console.log(error);
        }
    }

    const [bidderToAllocate, setBidderToAllocate] = useState(1)
    const [open, setOpen] = useState(false);

    return (
        <>
            <SignedInConferenceNavbar></SignedInConferenceNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center'}} >
                <Stack direction="column" sx={{p: 5, my: 10}}>
                    {paperData.map(paper => (
                        <>
                            <Stack direction="row">
                                <Box sx={{border: 1, borderColor: '#0FA597', width: 400, borderRadius: 1, p: 2}}>
                                    <Typography variant="h5" color="secondary">{paper.title}</Typography>
                                </Box>
                                <Box sx={{border: 1, borderColor: '#0FA597', width: 400, borderRadius: 1, p: 2}}>
                                    <Stack direction="column">
                                        <Typography variant="h5" color="seconday">Authors</Typography>
                                        <Typography variant="p" color="#8192AA">{paper.authorEmail}</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                            <Box sx={{border: 1, borderColor: '#0FA597', width: 804, borderRadius: 1, p: 2}}>
                                <Typography variant="p" color="#8192AA">{paper.description}</Typography>
                            </Box>
                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                {paper.status == "Not Allocated" && <>
                                <FormControl color="secondary">
                                    <InputLabel>Rating</InputLabel>
                                    <Select id="user-type" value={bidderToAllocate}  sx={{borderColor: 'secondary'}} onChange={(event) => setBidderToAllocate(event.target.value)}>
                                        {paper.Bids.map(bid => (<MenuItem value={bid.id}>{bid.reviewerEmail}</MenuItem>))}
                                    </Select>
                                </FormControl>
                                <Button width={400} variant="contained" color="secondary" onClick={() => allocatePaper(paper.id)}>Allocate Paper</Button>
                                </>}
                                {paper.status == "Reviewed" &&
                                <>
                                    <Button width={400} variant="contained" color="secondary" onClick={() => acceptPaper(paper.id)}>Accept</Button>
                                    <Button width={400} variant="contained" color="secondary" onClick={() => rejectPaper(paper.id)}>Reject</Button>
                                    <Button width={400} variant="contained" color="secondary" onClick={() => setOpen(true)}>View Reviews</Button>
                                    <Modal open={open} onClose={() => setOpen(false)} sx={{position: 'absolute', top: '10%', left: '10%', width: 1800, height: 500, bgcolor: "white"}}>
                                        <Card>
                                            <ViewReviews paperID={paper.id}></ViewReviews>
                                        </Card>
                                    </Modal>
                                </>
                                }
                            </Box>
                        </>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default function viewDataForPaperConference() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        if(session.user.userCategory == "Conference Chair") {
            return <ViewDataForPaperConference email={session.user.email}></ViewDataForPaperConference>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}