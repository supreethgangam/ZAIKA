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
import { List, ListItem } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { isUnitless } from "@mui/material/styles/cssUtils";

const Home = (props) => {

  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [menu, setMenu] = useState([]);

  const _id = localStorage.getItem('vendor_id');
  const idi = {
    id: _id
  }

  useEffect(() => {
    axios
      .post("http://localhost:4000/vendor/profile", idi)
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/menu/shop", details)
      .then((response) => {
        setMenu(response.data);
      })
      .catch(function (error) {
      });
  });

  const onSubmit = (event, item) => {
    event.preventDefault();

    axios
      .post("http://localhost:4000/menu/delete", item)
      .then((response) => {
      })
      .catch((err) => {
        alert(err)
      });

  };

  const onSearch = (event) => {
    event.preventDefault();

  }

  // alert(menu[0].item)
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
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={() => navigate('/menuadd')}>
            Add
          </Button>
        </Grid>
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
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-end' },
                m: 3,
                minWidth: { md: 350 },
              }}>
                <Chip icon={<DeleteIcon />} label="Delete" onClick={(e) => onSubmit(e, item)} />
                <br></br>
                <Chip icon={<EditIcon />} label="Edit" onClick={() => { localStorage.setItem('item_id', item._id); navigate('/medit', { state: { id: item._id } }) }} />
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

export default Home;
