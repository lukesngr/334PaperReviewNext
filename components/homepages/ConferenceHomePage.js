import { Typography, Box } from "@mui/material";
import { SignedInConferenceNavbar } from "../navbar/SignedInConferenceNavbar";

export function ConferenceHomePage(props) {
    return (
        <>
            <SignedInConferenceNavbar></SignedInConferenceNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                <Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                        <Typography variant="h3">Welcome {props.email},</Typography>
                        <Typography variant="h3">You are logged in as a Conference Chair</Typography>
                        <Typography variant="h5">Click on Allocate Papers item above to allocate papers</Typography>
                        <Typography variant="h5">Click on Decide on Paper item above to accept or deny papers</Typography>
                        <Typography variant="h5">Click on View Accepted Papers item above to view accepted papers</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}