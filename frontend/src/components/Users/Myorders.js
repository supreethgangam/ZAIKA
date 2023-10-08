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
import { Typography } from "@mui/material";

const Home = (props) => {

    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [menu, setMenu] = useState([]);
    const [value, setValue] = React.useState(0);
    const [itemrating, setItemrating] = useState([]);
    const [sold, setSold] = useState([]);
    const _id = localStorage.getItem('user_id');
    const idi = {
        id: _id
    }
    useEffect(() => {
        axios
            .post("http://localhost:4000/user/profile", idi)
            .then((response) => {
                setDetails(response.data);
            })
            .catch(function (error) {
            });
    }, []);




    useEffect(() => {
        const a = {
            name: _id
        }
        axios
            .post("http://localhost:4000/order/name", a)
            .then((response) => {
                setMenu(response.data)
            })
            .catch(function (error) {
            });
    });

    const onSubmit = (event, item) => {
        event.preventDefault();
        const idi = {
            id: item.id
        }
        axios.post("http://localhost:4000/menu/item", idi)
            .then((response) => {
                // alert(response.data.rating)
                var f = (((Number(response.data.sold)) * Number(response.data.rating)) / (Number(response.data.sold) + 1));
                // alert(f);
                const a = {
                    id: item.id,
                    rating: f.toString(10)
                }
                // alert(a.rating);
                axios.post("http://localhost:4000/menu/editrating", a);
            })
            .catch(function (error) {
                alert(error)
            });


        if (item.status == "READY FOR PICKUP") {
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

        axios
            .post("http://localhost:4000/order/edit", item)
            .then((response) => {
            })
            .catch((err) => {
                alert(err)
            });
        // if (item.sold != "1") {



        // alert(item.rating)
        // alert(item.sold)
        // const a = {
        //     id: item.id,
        //     rating: (((Number(item.sold)) * Number(item.rating)) / (Number(item.sold) + 1)).toString(10)
        // }
        // alert(a.rating);
        // axios.post("http://localhost:4000/menu/editrating", a);
        // }

    };

    const myfunction = (item) => {
        if (item.status == 'COMPLETED')
            return (
                <Rating
                    name="simple-controlled"
                    value={item.rating}
                    onChange={(event, newValue) => {
                        const idi = {
                            id: item.id
                        }
                        axios.post("http://localhost:4000/menu/item", idi)
                            .then((response) => {
                                // alert(response.data.rating)
                                var f = (((Number(response.data.sold)) * Number(response.data.rating) - Number(item.rating) + newValue) / Number(response.data.sold));
                                // alert(f);
                                const a = {
                                    id: item.id,
                                    rating: f.toString(10)
                                }
                                axios.post("http://localhost:4000/menu/editrating", a);
                            })
                            .catch(function (error) {
                                alert(error)
                            });
                        var difi = '0';
                        if (newValue == null) {
                            difi = '0'
                        }
                        else {
                            difi = newValue.toString(10);
                        }
                        const b = {
                            _id: item._id,
                            rating: difi
                        }
                        axios.post("http://localhost:4000/order/editrating", b);

                    }}
                />
            )
        else {
            return (<Rating name="disabled" disabled />)
        }
    }

    const sample = (item) => {

        if (item.status == "READY FOR PICKUP") {
            return (
                <Button variant="contained" color="success" onClick={(e) => onSubmit(e, item)}>
                    Picked Up
                </Button>
            )
        }
    }
    // var df = [];
    // useEffect(() => {
    //     axios
    //         .post("http://localhost:4000/order/name", details)
    //         .then((response) => {
    // alert(response.data.length)
    //             response.data.map((element, ind) => {
    //                 // alert("hi")
    //                 df.push(element.rating);
    //                 const idi = {
    //                     id: element.id
    //                 }
    //                 axios.post("http://localhost:4000/menu/item", idi)
    //                     .then((response) => {
    //                         var a = avgrating.push(response.data.rating);
    //                         setAvgrating(a);
    //                         var b = avgrating.push(response.data.sold);
    //                         setSold(b);
    //                     })
    //                     .catch(function (error) {
    //                     });

    //             })
    //             // alert(df[0])
    //             setItemrating(df);
    //         });

    // }, []);


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

                        <Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: { xs: 'center', md: 'flex-end' },
                                m: 3,
                                minWidth: { md: 350 },
                            }}>
                                <Chip label={item.status} color='error' variant='outlined' />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: { xs: 'center', md: 'flex-end' },
                                    m: 0,
                                    minWidth: { md: 350 },
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                {myfunction(item)}
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', md: 'flex-center' },
                            m: 3,
                            minWidth: { md: 200 },
                        }}>
                            <Grid item xs={12}>
                                {sample(item)}
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
