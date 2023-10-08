import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/material";
import { Rating } from "@mui/material";
import { alpha } from "@mui/material";

// import { InputAdornment } from "@mui/material";
import Navbar from "./Navbar";

const UsersList = (props) => {
    const [count, setCount] = useState(0);
    const [details, setDetails] = useState([]);
    const [counti, setCounti] = useState(0);
    const [countii, setCountii] = useState(0);
    const [menu, setMenu] = useState([]);

    const _id = localStorage.getItem('vendor_id');
    const idi = {
        id: _id
    }

    useEffect(() => {
        axios
            .post("http://localhost:4000/vendor/profile", idi)
            .then((response) => {
                setDetails(response.data);
            })
            .catch(function (error) {
            });
    }, []);

    useEffect(() => {
        axios
            .post("http://localhost:4000/menu/shop", details)
            .then((response) => {
                // setMenu(response.data);
                const a = response.data.sort((f, b) => (Number(b.sold) - Number(f.sold)));
                setMenu(a);
            })
            .catch(function (error) {
            });
        // const a = menu.sort((a, b) => (Number(a.sold) - Number(b.sold)));
        // setMenu(a);

    });

    // useEffect(() => {
    //     const a = menu.sort((f, b) => (Number(f.sold) - Number(b.sold)));
    //     setMenu(a);
    // }, []);

    useEffect(() => {
        axios
            .get("http://localhost:4000/order/countii")
            .then((response) => {
                setCounti(response.data.length)
            });
    });

    useEffect(() => {
        axios
            .get("http://localhost:4000/order/countiii")
            .then((response) => {
                setCountii(response.data.length)
            });
    });


    useEffect(() => {
        axios
            .get("http://localhost:4000/order/counti")
            .then((response) => {
                setCount(response.data.length)
            });
    });

    return (
        <div>
            <Navbar></Navbar>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div align="center">
                {/* <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'blue',
                    alignItems: { xs: 'center', md: 'flex-center' },
                    m: 0,
                    minWidth: { md: 50 },
                }}> */}
                <p>Placed Orders : {countii}</p>
                {/* </Box> */}
                <p>Pending Orders : {count}</p>
                <p>Completed Orders : {counti}</p>
            </div>
            <Grid>
                <br></br>
                <br></br>
                <div align="center">
                    TOP 5 COMPLETED ORDERS
                </div>
                {menu.map((item, ind) => {
                    if (ind < 5)
                        return (
                            <div >
                                <br></br>
                                <br></br>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignItems: 'center',
                                        bgcolor: 'background.paper',
                                        overflow: 'hidden',
                                        borderRadius: '20px',
                                        boxShadow: 20,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 233,
                                            width: 350,
                                            maxHeight: { xs: 233, md: 198 },
                                            maxWidth: { xs: 350, md: 300 },
                                        }}
                                        alt="The house from the offer."
                                        src="https://hips.hearstapps.com/hmg-prod/images/delish-crack-noodles-wide-2-1525355094.jpg?crop=1.00xw%3A1.00xh%3B0%2C0&resize=480%3A270"
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: { xs: 'center', md: 'flex-start' },
                                            m: 3,
                                            minWidth: { md: 350 },
                                        }}
                                    >
                                        <Box>
                                            SOLD: {item.sold}
                                        </Box>
                                        <Box component="span" sx={{ fontSize: 20, mt: 1, color: 'primary.main' }}>
                                            {item.item}
                                        </Box>
                                        <Box component="span" sx={{ fontSize: 15 }}>
                                            PRICE: {item.price}RS
                                        </Box>
                                        <Box component="span" sx={{ fontSize: 15 }}>
                                            <Rating name="read-only" value={item.rating} readOnly />
                                        </Box>

                                        <Box
                                            sx={{
                                                mt: 1.5,
                                                p: 0.5,
                                                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                                borderRadius: '5px',
                                                color: 'primary.main',
                                                fontWeight: 'medium',
                                                display: 'flex',
                                                fontSize: 12,
                                                alignItems: 'center',
                                                '& svg': {
                                                    fontSize: 21,
                                                    mr: 0.5,
                                                },
                                            }}
                                        >
                                            VEG/NON-VEG: {item.type}
                                        </Box>

                                    </Box>
                                </Box>

                            </div>
                        )
                })
                }
                <br></br>
                <br></br>
                <br></br>
            </Grid>
        </div>
    );
};

export default UsersList;
