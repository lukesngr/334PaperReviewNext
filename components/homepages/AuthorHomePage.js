import { Typography, Box } from "@mui/material";
import { SignedInAuthNavbar } from "../navbar/SignedInAuthNavbar";

export function AuthorHomePage(props) {
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
                    </Box>
                </Box>
            </Box>
        </>
    )
}