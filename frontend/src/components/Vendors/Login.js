import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [alignment, setAlignment] = useState('vendor');

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null)
            setAlignment(newAlignment);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };
        // alert("hello");
        axios
            .post("http://localhost:4000/vendor/login", newUser)
            .then((response) => {
                localStorage.setItem('vendor_id', response.data._id);
                navigate('/vendor');
            })
            .catch((err) => {
                alert("WRONG CREDENTIALS")
            });

        resetInputs();
    };

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div align='center'>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="buyer" onClick={() => navigate('/login')}>CUSTOMER</ToggleButton>
                    <ToggleButton value="vendor" onClick={() => navigate('/vlogin')}>RESTAURANT</ToggleButton>
                </ToggleButtonGroup>
                <br></br>
                <br></br>
            </div>
            <Grid container align={"center"} spacing={2}>

                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </Grid>



                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Login
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => navigate('/vregister')}>
                        Register?
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Register;
