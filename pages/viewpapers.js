import axios from "axios"
import { useSession } from 'next-auth/react';
import { Typography, Box, Stack } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { SignedInConferenceNavbar } from "../components/navbar/SignedInConferenceNavbar";

function ViewPapers(props) {
    
    let papers = [];
    const { status: getStatus, error, data: papersData} = useQuery({
        queryKey: ['paperAllocators'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getPapersForConference').then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        papers = papersData;
    }else if(getStatus === "error") {
        console.log(error);
    }

    return (
        <>
            <SignedInConferenceNavbar></SignedInConferenceNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center'}} >
                <Stack direction="column" sx={{p: 5, my: 10}}>
                    {papers.map(paper => (
                    <>
                        <Stack direction="row">
                            <Box sx={{border: 1, borderColor: '#0FA597', width: 800, borderRadius: 5, p: 2}}>
                                <Typography variant="h5" color="secondary">{paper.title}</Typography>
                                <Typography variant="p" color="#8192AA">{paper.description}</Typography>
                            </Box>
                            <Box sx={{border: 1, borderColor: '#0FA597', width: 400, borderRadius: 5, p: 2}}>
                                <Typography variant="h5" color="secondary">Status: {paper.status}</Typography>
                            </Box>
                        </Stack>
                        
                    </>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default function viewPapers() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        if(session.user.userCategory == "Conference Chair") {
            return <ViewPapers email={session.user.email}></ViewPapers>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}