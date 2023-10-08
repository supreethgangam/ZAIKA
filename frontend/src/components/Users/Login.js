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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState(null);

    const [alignment, setAlignment] = useState('buyer');

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null)
            setAlignment(newAlignment);
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

    const resetInputs = () => {
        setName("");
        setEmail("");
        setNumber("");
        setAge("");
        setBatch("");
        setPassword("");
        setDate(null);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            email: email,
            number: number,
            age: age,
            batch: batch,
            password: password,
            date: Date.now(),
        };
        // alert("hello");
        axios
            .post("http://localhost:4000/user/login", newUser)
            .then((response) => {
                localStorage.setItem('user_id', response.data._id);
                navigate('/student');
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
                    <Button variant="outlined" onClick={() => navigate('/register')}>
                        Register?
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Register;
