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
import { Box } from "@mui/material";

const Profile = (props) => {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [shop, setShop] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState(null);
    const [ha, setHa] = useState("");
    const [ma, setMa] = useState("");
    const [hb, setHb] = useState("");
    const [mb, setMb] = useState("");
    const [menu, setMenu] = useState([]);




    const onChangeUsername = (event) => {
        setName(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangeNumber = (event) => {
        setNumber(event.target.value);
    };

    const onChangeShop = (event) => {
        var s = event.target.value.toUpperCase();
        setShop(s);
    };

    const onChangeHa = (event) => {
        if (Number(event.target.value) >= 0 && Number(event.target.value) <= 23)
            setHa(event.target.value);
    };


    const onChangeHb = (event) => {
        if (Number(event.target.value) >= 0 && Number(event.target.value) <= 23)
            setHb(event.target.value);
    };


    const onChangeMa = (event) => {
        if (Number(event.target.value) >= 0 && Number(event.target.value) <= 59)
            setMa(event.target.value);
    };


    const onChangeMb = (event) => {
        if (Number(event.target.value) >= 0 && Number(event.target.value) <= 59)
            setMb(event.target.value);
    };


    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const _id = localStorage.getItem('vendor_id');
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
        details.shop = shop
        setDetails(details);
    }, [shop]);

    useEffect(() => {
        details.ha = ha
        setDetails(details);
    }, [ha]);

    useEffect(() => {
        details.hb = hb
        setDetails(details);
    }, [hb]);

    useEffect(() => {
        details.ma = ma
        setDetails(details);
    }, [ma]);

    useEffect(() => {
        details.mb = mb
        setDetails(details);
    }, [mb]);

    useEffect(() => {
        details.password = password
        setDetails(details);
    }, [password]);

    useEffect(() => {
        axios
            .post("http://localhost:4000/vendor/profile", idi)
            .then((response) => {
                setDetails(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setNumber(response.data.number);
                setShop(response.data.shop);
                setPassword(response.data.password);
                setHa(response.data.ha);
                setHb(response.data.hb);
                setMa(response.data.ma);
                setMb(response.data.mb);

                const a = {
                    shop: response.data.shop
                }
                axios
                    .post("http://localhost:4000/menu/shop", a)
                    .then((response) => {
                        setMenu(response.data);
                    })
                    .catch(function (error) {
                    });
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
            .post("http://localhost:4000/vendor/edit", details)
            .then((response) => {
                navigate('/vprofile');
                console.log(response.data);
            })
            .catch((err) => {
                alert("adf")
            });

        menu.map((item) => {
            const a = {
                _id: item._id,
                ha: details.ha,
                hb: details.hb,
                ma: details.ma,
                mb: details.mb,
            }
            axios
                .post("http://localhost:4000/menu/edittime", a)
                .then((response) => {
                    navigate('/vprofile');
                    console.log(response.data);
                })
                .catch((err) => {
                    alert("adf")
                });

        })


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
                                <TableCell>Shop</TableCell>
                                <TableCell>
                                    <Grid item xs={12}>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            value={shop}
                                            onChange={onChangeShop}
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
                                <TableCell>Timings (24 hrs)</TableCell>
                                <TableCell>

                                    <Grid item xs={12}>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': { m: 1, width: '8ch', height: '2' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                value={ha}
                                                onChange={onChangeHa}
                                                type="number"
                                            />
                                            :
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                value={ma}
                                                onChange={onChangeMa}
                                                type="number"
                                            />
                                            to
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                value={hb}
                                                onChange={onChangeHb}
                                                type="number"
                                            />
                                            :
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                value={mb}
                                                onChange={onChangeMb}
                                                type="number"
                                            />
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
