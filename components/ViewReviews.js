import {React, useState} from 'react';
import { Grid, Link, AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Typography, Stack } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function ViewReviews(props) {
    let reviews = [];
    const { status: getStatus, error, data: papersData} = useQuery({
        queryKey: ['reviews'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getReviewsForPaper', {params: {paperID: props.paperID}}).then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        reviews = papersData;
    }else if(getStatus === "error") {
        console.log(error);
    }

    return (<Box sx={{display: 'flex', justifyContent: 'center'}} >
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
                      
                  </>
                  ))}
              </Stack>
          </Box>)
}
