import {Box, Card, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import {useRef, useState} from "react"
import axios from "axios"

export default function CreateAccount() {

    async function createNewUser(){
        const { userEmail, userPassword} = formReference.current;
        const email = userEmail.value;
        const password = userPassword.value;
        const type = userType;

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

    const formReference = useRef()
    const [userType, setUserType] = useState('1');
    const handleChange = (event) => { setUserType(event.target.value); console.log(event.target.value); };

    return (
        <>
            <GlobalStyles styles={{body: { margin: 0 }}}/>
            <Box sx={{display: 'flex', justifyContent: 'center', my: 10}} >
                    <Card>
                        <Box>
                            <form ref={formReference}>
                                <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                    <Typography variant="h4">Create account</Typography>
                                    <TextField fullWidth={true} name="userEmail" id="standard-basic" label="Email" variant="standard" />
                                    <TextField fullWidth={true} name="userPassword" id="standard-password-input" label="Password" type="password" variant="standard" />     
                                    <Box>
                                                <FormControl fullWidth>
                                                <InputLabel>User Type</InputLabel>
                                                <Select
                                                    id="user-type"
                                                    value={userType}
                                                    name="userType"
                                                    onChange={handleChange}
                                                    >
                                                    <MenuItem value={1}>Conference Chair</MenuItem>
                                                    <MenuItem value={2}>Reviewers</MenuItem>
                                                    <MenuItem value={3}>Authors</MenuItem>
                                                    <MenuItem value={4}>Admin</MenuItem>
                                                </Select>
                                                </FormControl>
                                            </Box>
                                    <Button fullWidth={true} variant="contained" color="primary" onClick={()=> createNewUser()}>Create</Button>  
                                </Box>
                            </form>
                        </Box>
                    </Card>
                </Box>
            </>
        
    );
}