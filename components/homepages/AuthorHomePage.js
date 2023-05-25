import { Typography, Box, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { SignedInAuthNavbar } from "../navbar/SignedInAuthNavbar";
import { useState } from "react";
import axios from "axios";

export function AuthorHomePage(props) {
    const [numberOfPapers, setNumberOfPapers] = useState(2);

    async function setPreferredPages(preferredNumberOfPapers) {
        setNumberOfPapers(preferredNumberOfPapers);
        try {
            let result = await axios.post('/api/changePreferNumbers', {preferredNumber: preferredNumberOfPapers, authorEmail: props.email});

            if(result.status == 200) {
                console.log('Success');
            }
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <SignedInAuthNavbar></SignedInAuthNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                <Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                        <Typography variant="h3">Welcome {props.email},</Typography>
                        <Typography variant="h3">You are logged in as an Author</Typography>
                        <Typography variant="h5">Click on Submitted Papers navbar item above to view papers</Typography>
                        <Typography variant="h5">Click on Submit Papers navbar item above to submit papers</Typography>
                        <Box>
                                <FormControl color="secondary">
                                    <InputLabel>Preferred Number Of Pages</InputLabel>
                                    <Select id="user-type" value={numberOfPapers}  sx={{borderColor: 'secondary'}} name="userType"onChange={(event) => setPreferredPages(event.target.value)}>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}