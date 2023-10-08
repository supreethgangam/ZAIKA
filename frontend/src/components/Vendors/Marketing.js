import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Navbar from "./Navbar";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import { List, ListItem } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { isUnitless } from "@mui/material/styles/cssUtils";

const Marketing = (props) => {
    const [msg, setMsg] = useState("");
    const [details, setDetails] = useState([]);
    const [url, setUrl] = useState("");

    useEffect(() => {
        axios
        .post("http://localhost:4000/user/numbers",details)
        .then((response) => {
            var arr = []
            for (let i = 0; i < response.data.length; i++) {
                arr.push(response.data[i].number)
            }
            setDetails(arr)
        })
        .catch(function (error) {
        });
    }, []);

    const onSubmit = (event) => {
        // var plivo = require('plivo');

        var from_number = "9999999999";
        var to_number = "";
        //add all numbers fro details to to_number with a delimiter > 
        for(let i=0;i<details.length;i++){
            to_number = to_number + details[i] + "<";
        }
        var body = msg;

        //remove last delimiter
        to_number = to_number.substring(0, to_number.length - 1);

        console.log(to_number);

        const data = {
            from_number: from_number,
            destination_number: to_number,
            message: msg,
        };

        console.log(data);

        axios.post('http://localhost:4000/user/send_message', data)
            .then(response => {
                console.log('Message sent successfully');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
        
        const data1 = {
            from_number: from_number,
            to_number: to_number,
            answer_url: url,
            answer_method: "GET",
        };

        axios.post('http://localhost:4000/user/send_call', data1)
            .then(response => {
                console.log('Message sent successfully');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }



    return (
        <div>
        <Navbar></Navbar>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Grid container spacing={4} justifyContent="center">
            <h1>Marketing Section</h1>
            <Grid item xs={12} align="center">
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={10}
                    defaultValue=""
                    variant="outlined"
                    onChange={(e) => setMsg(e.target.value)}
                    style = {{width: '50%'}}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <TextField 
                    id="outlined-basic"
                    label="URL"
                    variant="outlined"
                    onChange={(e) => setUrl(e.target.value)}
                    style = {{width: '50%'}}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button style = {{width:'10%'}} variant="contained" onClick={(e) => onSubmit(e)}>
                    Send
                </Button>
            </Grid>
        </Grid>
        </div >

    );
};

export default Marketing;
