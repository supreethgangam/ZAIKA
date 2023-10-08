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
import emailjs from 'emailjs-com';
import { Checkbox } from '@mui/material';

const Home = (props) => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
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
            .post("http://localhost:4000/order/shop", details)
            .then((response) => {
                setMenu(response.data);
            })
            .catch(function (error) {
            });
    });

    useEffect(() => {
        axios
            .post("http://localhost:4000/order/count", details)
            .then((response) => {
                setCount(response.data.length)
            })
            .catch(function (error) {
            });
    });

    const onSubmit = (event, item) => {
        event.preventDefault();
        var phone_number = item.number;
        console.log(phone_number)
        

        if (item.status == "PLACED") {
            if (count < 10) {
                item.status = "ACCEPTED"
            }
            else {
                alert("COOKING LIMIT EXCEEDING!")
                return;
            }
        }

        else if (item.status == "ACCEPTED")
            item.status = "COOKING"
        else if (item.status == "COOKING") {
            item.status = "DELIVERY ON THE WAY"
        }
        else if (item.status == "DELIVERY ON THE WAY") {
            const idi = {
                id: item.id
            }

            item.status = "COMPLETED"
            axios
                .post("http://localhost:4000/menu/item", idi)
                .then((response) => {
                    // alert(response.data.sold)
                    var c = Number(response.data.sold);
                    c = c + 1;
                    const a = {
                        id: item.id,
                        sold: c.toString(10)
                    }
                    // alert(a.sold);
                    // alert(typeof (a.sold));
                    axios
                        .post("http://localhost:4000/menu/editi", a)
                        .then((response) => {
                        });
                });
        }

        const data = {
            from_number: '919999999999',
            destination_number: phone_number,
            message: "your order is " + item.status,
        };
        axios.post('http://localhost:4000/user/send_message', data)
            .then(response => {
                console.log('Message sent successfully');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });

        axios
            .post("http://localhost:4000/order/edit", item)
            .then((response) => {
            })
            .catch((err) => {
                alert(err)
            });

    };

    const onSubmiti = (event, item) => {
        event.preventDefault();
        var phone_number = item.number;
        const data = {
            from_number: '919999999999',
            destination_number: phone_number,
            message: "your order is Rejected",
        };
        axios.post('http://localhost:5000/send_message', data)
            .then(response => {
                console.log('Message sent successfully');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });

        if (item.status == "PLACED") {
            if (count < 10) {
                item.status = "ACCEPTED"
            }
            else {
                alert("COOKING LIMIT EXCEEDING!")
                return;
            }
        }
        item.status = "REJECTED"
        axios
            .post("http://localhost:4000/order/edit", item)
            .then((response) => {
            })
            .catch((err) => {
                alert(err)
            });
    };
    const song = (item) => {
        if (item.status == "PLACED" || item.status == "COOKING" || item.status == "ACCEPTED")
            return (
                <Button variant="contained" onClick={(e) => onSubmit(e, item)}>
                    Next Stage
                </Button>
            )
    }

    const sing = (item) => {
        if (item.status == "PLACED")
            return (
                <Button variant="contained" color="error" onClick={(e) => onSubmiti(e, item)}>
                    Reject
                </Button>
            )
    }

    // alert(menu[0].item)
    return (
        <div>
            <Navbar></Navbar>
            <br></br>
            <br></br>
            <br></br>
            {menu.map((item, ind) => (
                <div>
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
                            <Box component="span" sx={{ fontSize: 20, mt: 1, color: 'primary.main' }}>
                                Item: {item.item}
                            </Box>
                            {/* <Box component="span" sx={{ fontSize: 20, mt: 1, color: 'primary.main' }}>
                                Customer: {item.name}
                            </Box> */}
                            <Box component="span" sx={{ fontSize: 15 }}>
                                Time Placed: {item.time}
                            </Box>
                            <Box component="span" sx={{ fontSize: 15 }}>
                                Date Placed: {item.date}
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
                                QUANTITY: {item.quantity}
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
                            {item.addon.map((element, ind) => (
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
                                    ADDONS: {element}
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', md: 'flex-end' },
                            m: 3,
                            minWidth: { md: 350 },
                        }}>
                            <Chip label={item.status} color='error' variant='outlined' />
                            <br></br>
                            <Grid item xs={12}>
                                {song(item)}
                            </Grid>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', md: 'flex-center' },
                            m: 3,
                            minWidth: { md: 200 },
                        }}>
                            <Grid item xs={12}>
                                {sing(item)}
                            </Grid>
                        </Box>
                    </Box>
                </div>
            ))
            }
            <br></br>
            <br></br>
            <br></br>
        </div >

    );
};

export default Home;
