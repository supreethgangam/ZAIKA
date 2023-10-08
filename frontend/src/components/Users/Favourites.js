import { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { Rating } from "@mui/material";
import { alpha } from "@mui/material";
import Navbar from "./Navbar";
import { Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";

const UsersList = (props) => {
  const [menu, setMenu] = useState([]);

  const id = localStorage.getItem('user_id');
  const idi = {
    name: id
  }

  useEffect(() => {
    axios
      .post("http://localhost:4000/favorite/name", idi)
      .then((response) => {
        // alert("hi")
        // alert(response.data.length)
        setMenu(response.data);

        // alert(menu.length)
      })
      .catch((error) => {
        console.log(error);
      });
    // alert(menu.length)
  });


  return (
    <div>
      <Navbar></Navbar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Grid>
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
                  {item.item}
                </Box>
                <Box component="span" sx={{ fontSize: 15 }}>
                  PRICE: {item.price}RS
                </Box>
                <Box component="span" sx={{ fontSize: 15 }}>
                  <Rating name="read-only" value={item.rating} readOnly />
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

                <Box>
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
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        fontSize: 12,
                        alignItems: 'center',
                        '& svg': {
                          fontSize: 21,
                          mr: 0.5,
                        },
                      }}
                    >
                      ADDON-{ind}: {element.name}
                    </Box>
                  ))}
                </Box>

              </Box>
            </Box>

          </div>
        ))
        }
      </Grid>
      <br></br>
      <br></br>
      <br></br>
    </div >

  );
};

export default UsersList;
