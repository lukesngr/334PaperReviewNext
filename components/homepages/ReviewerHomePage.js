import { Typography, Box } from "@mui/material";
import { SignedInReviewNavbar } from "../navbar/SignedInReviewNavbar";

export function ReviewerHomePage(props) {
    return (
        <>
            <SignedInReviewNavbar></SignedInReviewNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                <Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                        <Typography variant="h3">Welcome {props.email},</Typography>
                        <Typography variant="h3">You are logged in as an Reviewer</Typography>
                        <Typography variant="h5">Click on Bid on Papers item above to bid on papers papers</Typography>
                        <Typography variant="h5">Click on Review Papers item above to review papers</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}