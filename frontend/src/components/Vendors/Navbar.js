import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" top = '0'>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/vendor")}
            >
              Canteen Vendor Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/orders")}>
              Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/statistics")}>
              Statistics
            </Button>
            <Button color="inherit" onClick={() => navigate("/marketing")}>
              Marketing
            </Button>
            <Button color="inherit" onClick={() => navigate("/vprofile")}>
              My Profile
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

  );
};

export default Navbar;
