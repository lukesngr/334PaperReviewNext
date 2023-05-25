import {Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import {useRef, useState} from "react"
import Fakerator from 'fakerator'

import axios from "axios"

export default function GenerateData() {

    async function generateData(){
        const emails = ["conference@gmail.com", "reviewer@gmail.com", "author@gmail.com"]
        const passwords = ["conference", "reviewer", "author"]
        const typeList = ["Conference Chair", "Reviewers", "Authors"]
        const fakerator = Fakerator();
        
        for(var i = 0; i < 3; i++) {

            try {
                const req = await axios.post("/api/createUserInDB", {email: emails[i], password: passwords[i], type: typeList[i]});
                if (req.status == 200) {
                    console.log("Success")
                }else{
                    console.log('Error occurred please contact lukesngr@gmail.com');
                }
            }catch (error) {
                console.log(error)
            }
        }

        for(var i = 0; i < 21; i++) {
            var title = fakerator.lorem.sentence();
            var description = fakerator.lorem.paragraph();
            var authorEmail = "author@gmail.com";
            try {
                const res = await axios.post('/api/submitPaper', {title, description, authorEmail});
                if(res.status == 200) {
                    console.log('Success')
                }
            }catch (error) {
                console.log(error)
            }
        }
        
    }

    return (
        <>
            <Button sx={{width: 400}} variant="contained" color="secondary" onClick={()=> generateData()}>Generate</Button>  
                        
        </>
        
    );
}