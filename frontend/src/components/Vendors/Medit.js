import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Box } from "@mui/material";


const Home = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [type, setType] = useState("");
    const [addon, setAddon] = useState([]);
    const [tag, setTag] = useState([]);
    const [currency, setCurrency] = useState('');

    const currencies = [
        {
            value: 'veg',
        },
        {
            value: 'non-veg',
        },
    ];


    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const onChangeItem = (event) => {
        setItem(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeRating = (event) => {
        setRating(event.target.value);
    };

    const onChangeType = (event) => {
        setType(event.target.value);
    };

    const onChangeAddonname = (event, ind) => {
        var s = addon;
        s[ind].name = event.target.value;
        setAddon(s);
    };

    const onChangeTagname = (event, ind) => {
        var s = tag;
        s[ind].name = event.target.value;
        setTag(s);
    };

    const onChangeAddonprice = (event, ind) => {
        addon[ind].price = event.target.price;
        setAddon(addon);
    };

    const _id = location.state.id;

    const idi = {
        id: _id
    }


    useEffect(() => {
        // alert(idi.id);
        axios
            .post("http://localhost:4000/menu/item", idi)
            .then((response) => {
                setItem(response.data.item);
                setPrice(response.data.price);
                setRating(response.data.rating);
                setType(response.data.type);
                setAddon(response.data.addon);
                setTag(response.data.tag);
                setCurrency(response.data.type);
            })
            .catch(function (error) {
                alert(_id)
            });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();

        // alert(addon[0].name)
        const newUser = {
            _id: _id,
            item: item,
            price: price,
            // rating, rating,
            tag: tag,
            type: currency,
            addon: addon
            // addon: addon,
        };

        axios
            .post("http://localhost:4000/menu/edit", newUser)
            .then((response) => {
                navigate('/vendor')
            })
            .catch((err) => alert(err))
    };

    return (
        <div>
            <Navbar></Navbar>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Item"
                        variant="outlined"
                        value={item}
                        onChange={onChangeItem}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={onChangePrice}
                        type="number"
                    />
                </Grid>

                {/* <Grid item xs={12}>
                    <TextField
                        label="Type"
                        variant="outlined"
                        value={type}
                        onChange={onChangeType}
                    />
                </Grid> */}

                <Grid item xs={12}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '19.5ch', height: '2' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Type"
                            value={currency}
                            onChange={handleChange}
                            size="large"
                        >
                            {currencies.map((option) => (
                                <MenuItem value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>


                    </Box>
                </Grid>
                {tag.map((element, ind) => (
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <TextField
                                label="Addon-name"
                                variant="outlined"
                                value={element.name}
                                onChange={(e) => onChangeTagname(e, ind)}
                            />
                        </Grid>
                        <br></br>
                    </Grid>
                ))}

                {addon.map((element, ind) => (
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <TextField
                                label="Addon-name"
                                variant="outlined"
                                value={element.name}
                                onChange={(e) => onChangeAddonname(e, ind)}
                            />
                        </Grid>
                        <br></br>
                        <Grid item xs={12}>
                            <TextField
                                label="Addon-price"
                                variant="outlined"
                                value={element.price}
                                onChange={(e) => onChangeAddonprice(e, ind)}
                                type="number"
                            />
                        </Grid>
                    </Grid>
                ))}


                < Grid item xs={12} >
                    <Button variant="contained" onClick={onSubmit}>
                        Save
                    </Button>
                </Grid>
            </Grid>

        </div >
    );
};

export default Home;
