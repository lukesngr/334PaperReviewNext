import {Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import {useRef, useState} from "react"
import axios from "axios"
import {NotSignedInNavbar} from '../components/navbar/NotSignedInNavbar'

export default function CreateAccount() {

    const formReference = useRef()
    const [userType, setUserType] = useState('0');

    async function createNewUser(){
        const { userEmail, userPassword} = formReference.current;
        const email = userEmail.value;
        const password = userPassword.value;
        const typeList = ["Conference Chair", "Reviewers", "Authors", "Admin"]
        const type = typeList[userType];

        try {
            const req = await axios.post("/api/createUserInDB", {email, password, type});
            if (req.status == 200) {
                console.log("Success")
            }else{
                console.log('Error occurred please contact lukesngr@gmail.com');
            }
        }catch (error) {
            console.log(error)
        }
        
    }


    const handleChange = (event) => { setUserType(event.target.value); console.log(event.target.value); };

    return (
        <>
            <NotSignedInNavbar></NotSignedInNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center', my: 10}} >
                <Box>
                    <form ref={formReference}>
                        <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                            <Typography color="secondary" variant="h2">Create account</Typography>
                            <TextField  sx={{width: 400}} name="userEmail" id="standard-basic" label="Email" variant="standard" />
                            <TextField  sx={{width: 400, mb: 2}} name="userPassword" id="standard-password-input" label="Password" type="password" variant="standard" />     
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel>User Type</InputLabel>
                                    <Select id="user-type" value={userType} name="userType"onChange={handleChange}>
                                        <MenuItem value={0}>Conference Chair</MenuItem>
                                        <MenuItem value={1}>Reviewers</MenuItem>
                                        <MenuItem value={2}>Authors</MenuItem>
                                        <MenuItem value={3}>Admin</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button sx={{width: 400}} variant="contained" color="secondary" onClick={()=> createNewUser()}>Create</Button>  
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
        
    );
}