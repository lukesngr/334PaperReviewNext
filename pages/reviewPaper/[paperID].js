import axios from "axios"
import { useSession } from 'next-auth/react';
import {Card, Stack, Typography, Box, Button, FormControl, Select, InputLabel, MenuItem, TextField, Modal} from '@mui/material';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { SignedInConferenceNavbar } from "../../components/navbar/SignedInConferenceNavbar";
import { useRouter } from 'next/router';
import {useState} from 'react'
import { ViewReviews } from "../../components/ViewReviews";
 
function ViewDataForPaperReview(props) {
    
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

    const [rating, setRating] = useState(0)
    const [reviewDescription, setReviewDescription] = useState("");
    const [open, setOpen] = useState(false);

    async function createReview(id) {
        try {
            let result = await axios.post('/api/createReview', {reviewText: reviewDescription, rating: rating, paper: {connect: {id}}});

            if(result.status == 200) {
                console.log('Success');
            }
        }catch(error) {
            console.log(error);
        }
    }

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
                                <FormControl color="secondary">
                                    <InputLabel>Rating</InputLabel>
                                    <Select id="user-type" value={rating}  sx={{borderColor: 'secondary'}} name="userType"onChange={(event) => setRating(event.target.value)}>
                                        <MenuItem value={-3}>Strong Reject (-3)</MenuItem>
                                        <MenuItem value={-2}>Reject (-2)</MenuItem>
                                        <MenuItem value={-1}>Weak Reject (-1)</MenuItem>
                                        <MenuItem value={0}>Borderline(0)</MenuItem>
                                        <MenuItem value={1}>Weak Accept(1)</MenuItem>
                                        <MenuItem value={2}>Accept(2)</MenuItem>
                                        <MenuItem value={3}>Strong Accept(3)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Box sx={{border: 1, borderColor: '#0FA597', width: 804, borderRadius: 1, p: 2}}>
                                <Typography variant="p" color="#8192AA">{paper.description}</Typography>
                            </Box>
                            <TextField value={reviewDescription} onChange={(event) => {setReviewDescription(event.target.value)}} multiline rows={4}></TextField>
                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                <Button width={400} variant="contained" color="secondary" onClick={() => createReview(paper.id)}>Submit Review</Button>
                                <Button width={400} variant="contained" color="secondary" onClick={() => {Router.push("/viewReviews/"+paper.id)}}>View Reviews</Button>
                                <Modal open={open} onClose={() => setOpen(false)} sx={{position: 'absolute', top: '10%', left: '10%', width: 1800, height: 500, bgcolor: "white"}}>
                                    <Card>
                                        <ViewReviews paperID={paper.id}></ViewReviews>
                                    </Card>
                                </Modal>
                            </Box>
                        </>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default function viewDataForPaperReview() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        if(session.user.userCategory == "Reviewers") {
            return <ViewDataForPaperReview email={session.user.email}></ViewDataForPaperReview>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}