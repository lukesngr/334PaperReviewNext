import {Box, Card, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material"

export default function CreateAccount() {
    return (
        <>
            <GlobalStyles styles={{body: { margin: 0 }}}/>
            <Box sx={{display: 'flex', justifyContent: 'center', my: 10}} >
                    <Card>
                        <Box>
                            <form ref={formReference}>
                                <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                    <Typography variant="h4">Create account</Typography>
                                    <TextField fullWidth="true" name="userEmail" id="standard-basic" label="Email" variant="standard" />
                                    <TextField fullWidth="true" name="userPassword" id="standard-password-input" label="Password" type="password" variant="standard" />     
                                    <Box>
                                                <FormControl fullWidth>
                                                <InputLabel id="service-category-label">User Type</InputLabel>
                                                <Select
                                                    id="user-type"
                                                    value={category}
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
                                    <Button fullWidth variant="contained" color="primary" onClick={()=> createNewAccount()}>Create</Button>  
                                </Box>
                            </form>
                        </Box>
                    </Card>
                </Box>
            </>
        
    );
}