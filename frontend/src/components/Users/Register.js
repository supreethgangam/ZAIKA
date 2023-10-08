import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import { Box } from "@mui/material";

const Register = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(null);
  const [currency, setCurrency] = useState('');
  const [alignment, setAlignment] = useState('buyer');

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
    setCurrency("");
    setDate(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      number: number,
      age: age,
      batch: currency,
      password: password,
      wallet: "1000",
      date: Date.now(),
    };

    var length = 0;
    axios
      .post("http://localhost:4000/user/profilei", newUser)
      .then((response) => {
        if (response.data.length != 0) {
          alert("EMAIL ALREADY EXISTED");
        }
        if (response.data.length == 0) {
          axios
            .post("http://localhost:4000/user/register", newUser)
            .then((response) => {
              alert("Created\t" + response.data.name);
              navigate('/login')
            });
        }
      })

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
          <ToggleButton value="buyer" onClick={() => navigate('/register')}>CUSTOMER</ToggleButton>
          <ToggleButton value="vendor" onClick={() => navigate('/vregister')}>RESTAURANT</ToggleButton>
        </ToggleButtonGroup>
        <br></br>
        <br></br>
      </div>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Number"
            variant="outlined"
            value={number}
            onChange={onChangeNumber}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
            type="number"
          />
        </Grid>
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
              label="Batch"
              value={currency}
              onChange={handleChangei}
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
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => navigate('/login')}>
            Login?
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
