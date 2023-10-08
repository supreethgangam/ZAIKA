import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Chip } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
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
  });

  // alert(details.wallet)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" top="0">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/student")}
          >
            SWIGATTO
          </Typography>
          <Box sx={{ flexGrow: 1.3 }} />
          <Chip icon={<AccountBalanceWalletIcon />} label={details.wallet} color = "warning" />
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/myorders")}>
            My Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/favourites")}>
            Favourites
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
