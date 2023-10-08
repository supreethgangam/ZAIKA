import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from "@mui/material";

const Register = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [shop, setShop] = useState("");
  const [ha, setHa] = useState("");
  const [ma, setMa] = useState("");
  const [hb, setHb] = useState("");
  const [mb, setMb] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(null);

  const [alignment, setAlignment] = useState('vendor');

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


  const onChangeShop = (event) => {
    var s = event.target.value.toUpperCase();
    setShop(s);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setNumber("");
    setShop("");
    setPassword("");
    setHa("");
    setHb("");
    setMa("");
    setMb("");
    setDate(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      number: number,
      shop: shop,
      password: password,
      ha: ha,
      hb: hb,
      ma: ma,
      mb: mb,
      date: Date.now(),
    };

    axios
      .post("http://localhost:4000/vendor/profilei", newUser)
      .then((response) => {
        if (response.data.length != 0) {
          alert("EMAIL ALREADY EXISTED");
        }
        if (response.data.length == 0) {
          axios
            .post("http://localhost:4000/vendor/register", newUser)
            .then((response) => {
              alert("Created\t" + response.data.name);
              navigate('/vlogin')
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
            label="Shop"
            variant="outlined"
            value={shop}
            onChange={onChangeShop}
          />
        </Grid>

        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '7ch', height: '2' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="hours"
              variant="outlined"
              value={ha}
              type="number"
              onChange={onChangeHa}
              helperText="Opening"

            />
            :
            <TextField
              label="minutes"
              variant="outlined"
              value={ma}
              type="number"
              onChange={onChangeMa}
              helperText="24hr_time"
            />
          </Box>
          to
        </Grid>
        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '7ch', height: '2' },
            }}
            noValidate
            autoComplete="off"
          >


            <TextField
              label="hours"
              variant="outlined"
              value={hb}
              type="number"
              onChange={onChangeHb}
              helperText="Closing"
            />
            :
            <TextField
              label="minutes"
              variant="outlined"
              value={mb}
              type="number"
              helperText="24hr_time"
              onChange={onChangeMb}
            />

          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => navigate('/vlogin')}>
            Login?
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
