import axios from "axios"
import { useSession } from 'next-auth/react';
import {Card, Stack, Typography, Box, Button} from '@mui/material';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { SignedInConferenceNavbar } from "../../components/navbar/SignedInConferenceNavbar";
import { useRouter } from 'next/router';
 
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
                                {paper.status == "Not Allocated" && <Button width={400} variant="contained" color="secondary" onClick={() => allocatePaper(paper.id)}>Allocate Paper</Button>}
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