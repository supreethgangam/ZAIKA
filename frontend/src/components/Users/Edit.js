import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Box } from "@mui/material";

const Profile = (props) => {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState(null);
    const [currency, setCurrency] = useState('');

    const currencies = [
        {
            value: 'UG1',
        },
        {
            value: 'UG2',
        },
        {
            value: 'UG3',
        },
        {
            value: 'UG4',
        },
        {
            value: 'UG5',
        },
    ];

    const handleChangei = (event) => {
        setCurrency(event.target.value);
    };


    const onChangeUsername = (event) => {
        setName(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangeNumber = (event) => {
        setNumber(event.target.value);
    };

    const onChangeAge = (event) => {
        setAge(event.target.value);
    };

    const onChangeBatch = (event) => {
        setBatch(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const _id = localStorage.getItem('user_id');
    const idi = {
        id: _id
    }

    useEffect(() => {
        details.name = name
        setDetails(details);
    }, [name]);

    useEffect(() => {
        details.email = email
        setDetails(details);
    }, [email]);

    useEffect(() => {
        details.number = number
        setDetails(details);
    }, [number]);

    useEffect(() => {
        details.age = age
        setDetails(details);
    }, [age]);

    useEffect(() => {
        details.batch = currency
        setDetails(details);
    }, [currency]);

    useEffect(() => {
        details.password = password
        setDetails(details);
    }, [password]);

    useEffect(() => {
        axios
            .post("http://localhost:4000/user/profile", idi)
            .then((response) => {
                setDetails(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setNumber(response.data.number);
                setAge(response.data.age);
                setPassword(response.data.password);
                setBatch(response.data.batch);
                setCurrency(response.data.batch)
            })
            .catch(function (error) {

            });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();

        // const newUser = {
        //     _id: details._id,
        //     name: details.name,
        //     email: details.email,
        //     number: details.number,
        //     age: details.age,
        //     batch: details.batch,
        //     password: password,
        //     date: Date.now(),
        // };

        axios
            .post("http://localhost:4000/user/edit", details)
            .then((response) => {
                navigate('/profile');
                console.log(response.data);
            })
            .catch((err) => {
                alert("adf")
            });

    };

    return (<div>
        <Navbar></Navbar>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div align="center">
            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Table size="small">


                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>
                                    <Grid item xs={12}>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            value={name}
                                            onChange={onChangeUsername}
                                        />
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>
                                    <Grid item xs={12}>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            value={email}
                                            onChange={onChangeEmail}
                                        />
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Password</TableCell>
                                <TableCell>
                                    <Grid item xs={12}>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            value={password}
                                            onChange={onChangePassword}
                                        />
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Number</TableCell>
                                <TableCell>
                                    <Grid item xs={12}>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            value={number}
                                            onChange={onChangeNumber}
                                            type="number"
                                        />
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Age</TableCell>
                                <TableCell>
                                    <Grid item xs={12}>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            value={age}
                                            onChange={onChangeAge}
                                            type="number"
                                        />
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Batch</TableCell>
                                <TableCell>
                                    {/* <Grid item xs={12}>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            value={batch}
                                            onChange={onChangeBatch}
                                        />
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': { m: 0, width: '25ch', height: '2' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                id="outlined-select-currency"
                                                select
                                                value={currency}
                                                onChange={handleChangei}
                                                size="small"
                                            >
                                                {currencies.map((option) => (
                                                    <MenuItem value={option.value}>
                                                        {option.value}
                                                    </MenuItem>
                                                ))}
                                            </TextField>


                                        </Box>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                </Paper>
            </Grid>
            <br></br>
            <br></br>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Save
                </Button>
            </Grid>
        </div>



    </div>);
};

export default Profile;
