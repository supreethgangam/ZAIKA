import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Box } from "@mui/material";

const Home = (props) => {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [currency, setCurrency] = useState('');


    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

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
    }, []);

    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("0");
    const [type, setType] = useState("");
    const [addon, setAddon] = useState("");
    const [addon_name, setAddon_name] = useState("");
    const [tag_name, setTag_name] = useState("");
    const [addon_price, setAddon_price] = useState("");
    const [addoni, setAddoni] = useState([]);
    const [tagi, setTagi] = useState([]);
    const [count, setCount] = useState(0);
    const [counti, setCounti] = useState(0);
    const addonii = [{ name: 'cheese', price: '20' }, { name: 'sauce', price: '20' }, { name: 'myonaise', price: '20' }];
    // addoni = addonii;
    const a = { name: 'cheese', price: '20' };
    const b = { name: 'sauce', price: '20' };
    const c = { name: 'myonaise', price: '20' };
    // addoni.push(a);

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

    const onChangeAddon_name = (event) => {

        setAddon_name(event.target.value);
    };

    const onChangeAddon_price = (event) => {
        setAddon_price(event.target.value);
    };

    const onChangeTag_name = (event) => {
        var c = event.target.value.toUpperCase();
        setTag_name(c);
    };



    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            item: item,
            sold: "0",
            price: price,
            rating, rating,
            type: currency,
            addon: addoni,
            tag: tagi,
            shop: details.shop,
            ha: details.ha,
            hb: details.hb,
            ma: details.ma,
            mb: details.mb
        };

        axios
            .post("http://localhost:4000/menu/add", newUser)
            .then((response) => {
                navigate('/vendor')
            });
        // .catch((err) => alert(err))
    };

    const onSubmittag = (event) => {
        event.preventDefault();
        // alert(count);

        const c = (counti + 1) % 2;
        setCounti(c);
        setTag_name("");
        // alert(count);
    };

    const onSubmittagi = (event) => {
        event.preventDefault();
        // alert(count);
        const snack = {
            name: tag_name,
        }
        if (tag_name != "")
            tagi.push(snack);
        setTag_name("");
        const c = (counti + 1) % 2;
        setCounti(c);
        // alert(count);
    };

    const onSubmitaddon = (event) => {
        event.preventDefault();
        // alert(count);

        const c = (count + 1) % 2;
        setCount(c);
        setAddon_name("");
        setAddon_price("");
        // alert(count);
    };

    const onSubmitaddoni = (event) => {
        event.preventDefault();
        // alert(count);
        const snack = {
            name: addon_name,
            price: addon_price
        }
        if (addon_name != "" && addon_price != "")
            addoni.push(snack);
        setAddon_name("");
        setAddon_price("");
        const c = (count + 1) % 2;
        setCount(c);
        // alert(count);
    };

    const currencies = [
        {
            value: 'veg',
        },
        {
            value: 'non-veg',
        },
    ];

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
                <Grid item xs={12} align="center">
                    {tagi.map((snack, ind) =>
                        <div align="center">
                            <Grid item xs={12}>
                                <TextField
                                    label="tag-name"
                                    id="outlined-disabled"
                                    variant="outlined"
                                    value={snack.name}
                                />
                            </Grid>
                            <br></br>
                        </div>
                    )}

                </Grid>
                <Grid item xs={12} align="center">
                    {addoni.map((snack, ind) =>
                        <div align="center">
                            <Grid item xs={12}>
                                <TextField
                                    label="addon-name"
                                    id="outlined-disabled"
                                    variant="outlined"
                                    value={snack.name}
                                />
                            </Grid>
                            <br></br>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-disabled"
                                    label="addon-price"
                                    variant="outlined"
                                    value={snack.price}
                                    type="number"
                                />
                            </Grid>
                            <br></br>
                        </div>
                    )}

                </Grid>

                <Grid item xs={12} align="center">
                    {[...Array(counti)].map(() =>
                        <div align="center">
                            <Grid item xs={12}>
                                <TextField
                                    label="Tag-name"
                                    variant="outlined"
                                    color="primary"
                                    value={tag_name}
                                    onChange={onChangeTag_name}
                                    focused
                                />
                            </Grid>
                            <br></br>
                        </div>
                    )}

                </Grid>
                <Grid item xs={12} align="center">
                    {[...Array(count)].map(() =>
                        <div align="center">
                            <Grid item xs={12}>
                                <TextField
                                    label="Addon-name"
                                    variant="outlined"
                                    color="primary"
                                    value={addon_name}
                                    onChange={onChangeAddon_name}
                                    focused
                                />
                            </Grid>
                            <br></br>
                            <Grid item xs={12}>
                                <TextField
                                    label="Addon-price"
                                    variant="outlined"
                                    color="primary"
                                    value={addon_price}
                                    onChange={onChangeAddon_price}
                                    type="number"
                                    focused
                                />
                            </Grid>
                        </div>
                    )}

                </Grid>

                {counti === 1 &&
                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={onSubmittagi} color="success" size="small">
                            SAVE TAG?
                        </Button>
                        <Button variant="outlined" onClick={onSubmittag} color="error" size="small">
                            NO-TAG?
                        </Button>
                    </Grid>
                }

                {counti === 0 &&
                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={onSubmittag} size="small">
                            ADD-TAG?
                        </Button>
                    </Grid>
                }

                {count === 1 &&
                    <Grid item xs={12}>

                        <Button variant="outlined" onClick={onSubmitaddoni} color="success" size="small">
                            SAVE ADDON?
                        </Button>
                        <Button variant="outlined" onClick={onSubmitaddon} color="error" size="small">
                            NO-ADDON?
                        </Button>

                    </Grid>
                }

                {count === 0 &&
                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={onSubmitaddon} size="small">
                            ADD-ADDONS?
                        </Button>
                    </Grid>
                }


                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Save
                    </Button>
                </Grid>
            </Grid>

        </div >
    );
};

export default Home;
