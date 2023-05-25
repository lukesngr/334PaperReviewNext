import axios from "axios"
import { useSession } from 'next-auth/react';
import {Card, Stack} from '@mui/material';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { SignedInConferenceNavbar } from "../../components/navbar/SignedInConferenceNavbar";
import { useRouter } from 'next/router';
 
export default function Page() {
  
  return <p>Post: {}</p>;
}

function viewDataForPaperConference(props) {
    
    const router = useRouter();
    router.query.paperID
    let papers = [];
    const { status: getStatus, error, data: papersData} = useQuery({
        queryKey: ['paperAllocators'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getBidsForConference').then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        papers = papersData;
    }else if(getStatus === "error") {
        console.log(error);
    }

    async function allocatePapers(id, reviewerEmail) {
        try {
            let result = await axios.post('/api/allocatePaper', {reviewerEmail: reviewerEmail, paperID: id});

            if(result.status == 200) {
                console.log('Success');
            }
        }catch(error) {
            console.log(error);
        }
    }
    console.log(papers)

    return (
        <>
            <SignedInConferenceNavbar></SignedInConferenceNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center'}} >
                <Card sx={{p: 5, my: 10}}>
                    <Typography variant="h4">Papers to Allocate</Typography>
                    <Stack direction="column">
                        {papers.map(paper => (
                        <>
                            <Stack direction="row">
                                <Box sx={{border: 1, borderColor: '#0FA597', width: 400, p: 2}}>
                                    <Typography variant="h5">{paper.title} by {paper.authorEmail}</Typography>
                                    <Typography variant="h5">{paper.description}</Typography>
                                </Box>
                            </Stack>
                            <Box sx={{border: 1, borderColor: '#0FA597', width: 400, display: 'flex', flexDirection: 'row', p: 2}}>
                                {paper.Bids.map(bid => (
                                    <>
                                        <Typography variant="h6">Bidder: {bid.reviewerEmail} with preferred number of papers: {bid.preferredNumbers}</Typography>
                                        <Button variant="contained" onClick={() => allocatePapers(paper.id, bid.reviewerEmail)}>Allocate</Button>
                                    </>
                                ))} 
                            </Box>
                        </>
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
        if(session.user.userCategory == "Conference Chair") {
            return <AllocatePapers email={session.user.email}></AllocatePapers>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}