import axios from "axios"
import { useSession } from 'next-auth/react';
import {Card, Stack, Typography, Box, Button, FormControl, Select, InputLabel, MenuItem, TextField, Modal} from '@mui/material';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { SignedInReviewNavbar } from "../../components/navbar/SignedInReviewNavbar";
import { useRouter } from 'next/router';
import {useState} from 'react'

function CommentField(props) {
    const [commentText, setCommentText] = useState("Comment");

    async function createComment(id) {
        try {
            let result = await axios.post('/api/createComment', {comment: commentText, review: {connect: {id}}});

            if(result.status == 200) {
                console.log('Success');
            }
        }catch(error) {
            console.log(error);
        }
    }

    return (<>
        <TextField value={commentText} onChange={(event) => {setCommentText(event.target.value)}} multiline rows={4}></TextField>
        <Button width={400} variant="contained" color="secondary" onClick={() => createComment(props.id)}>Create Comment</Button>
        </>
    )
}
 
function ViewReviews(props) {
    
    const router = useRouter();
    
    let reviews = [];
    const { status: getStatus, error, data: reviewsData} = useQuery({
        queryKey: ['reviews'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getReviewsForPaper', {params: {paperID: router.query.paperID}}).then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        reviews = reviewsData;
    }else if(getStatus === "error") {
        console.log(error);
    }

    

    return (
        <>
            <SignedInReviewNavbar></SignedInReviewNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center'}} >
              <Stack direction="column" sx={{p: 5, my: 10}}>
                  {reviews.map(review => (
                  <>
                      <Stack direction="row">
                          <Box sx={{border: 1, borderColor: '#0FA597', width: 800, borderRadius: 5, p: 2}}>
                              <Typography variant="h5" color="secondary">{review.reviewText}</Typography>
                          </Box>
                          <Box sx={{border: 1, borderColor: '#0FA597', width: 400, borderRadius: 5, p: 2}}>
                              <Typography variant="h5" color="secondary">Rating: {review.rating}</Typography>
                          </Box>
                      </Stack>
                      <Box sx={{border: 1, borderColor: '#0FA597', width: 1200, borderRadius: 5, p: 2}}>
                        <Typography variant="h4" color="secondary">Comments: </Typography>
                        {review.Comment.map(comment=> (
                            <Typography variant="p">{comment.comment}</Typography>
                        ))}
                      </Box>
                      <CommentField id={review.id}></CommentField>   
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
            return <ViewReviews email={session.user.email}></ViewReviews>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}