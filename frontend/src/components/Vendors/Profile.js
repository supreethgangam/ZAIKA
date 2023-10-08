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
import { Chip } from "@mui/material";

const Profile = (props) => {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const _id = localStorage.getItem('vendor_id');
    const idi = {
        id: _id
    }
    // alert(_id)
    useEffect(() => {
        axios
            .post("http://localhost:4000/vendor/profile", idi)
            .then((response) => {
                setDetails(response.data);
            })
            .catch(function (error) {
            });
    });
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
                                <TableCell size="medium">Name</TableCell>
                                <TableCell><Chip label={details.name} color="primary" /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size="medium">Email</TableCell>
                                <TableCell><Chip label={details.email} color="primary" /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size="medium">Number</TableCell>
                                <TableCell><Chip label={details.number} color="primary" /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size="medium">Shop</TableCell>
                                <TableCell><Chip label={details.shop} color="primary" /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size="medium">Timings</TableCell>
                                <TableCell><Chip label={details.ha + ":" + details.ma + " to " + details.hb + ":" + details.mb} color="primary" /></TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                </Paper>
            </Grid>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Grid item xs={12}>
                <Button variant="contained" onClick={() => navigate('/vedit')}>
                    Edit
                </Button>
            </Grid>
            <br></br>
            <Grid item xs={12}>
                <Button variant="contained" onClick={() => navigate('/vlogin')}>
                    Log Out
                </Button>
            </Grid>
        </div>



    </div>);
};

export default Profile;
