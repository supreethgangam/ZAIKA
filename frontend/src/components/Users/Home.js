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
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { List, ListItem } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Divider from "@mui/material/Divider";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Checkbox } from '@mui/material';
import Slider from '@mui/material/Slider';
import { ListItemText } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Switch } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

var minDistance = 1;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function valuetext(value) {
  return `${value}₹`;
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Home = (props) => {

  const [details, setDetails] = useState([]);
  const [menu, setMenu] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [personNamei, setPersonNamei] = useState([]);
  const [personNameii, setPersonNameii] = useState([]);
  const [dict, setDict] = useState([]);
  const [dictiii, setDictiii] = useState([]);
  const [quandict, setQuandict] = useState([]);
  const [count, setCount] = useState(0);
  const [quan, setQuan] = useState(0);
  const [vegchecked, setVegchecked] = useState(false);
  const [nonvegchecked, setNonvegchecked] = useState(false);
  const [temp, setTemp] = useState(0);
  const [maxdistance, setMaxdistance] = useState(150);
  const [value2, setValue2] = React.useState([0, 150]);
  const [shoparr, setShoparr] = useState([]);
  const [tagarr, setTagarr] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [sort, setSort] = useState(1);
  const [on, setOn] = useState(0);
  const [favcount, setFavcount] = useState(0);
  const [addi, setAddi] = useState([]);

  const slider = (event, newValue, activeThumb) => {
    setTemp(temp + 1)
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxdistance - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  const handleChange = (id, event, addon) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );

    let val = event.target.value;
    const dicti = {
      keys: id,
      values: val
    };

    var price = 0;

    val.map((item) => {
      addon.map((element) => {
        if (item == element.name) {
          price = price + Number(element.price);
        }
      })
    })
    // alert(price);
    const dictiiii = {
      keys: id,
      values: price
    };

    var count = 0;
    dict.map((item, ind) => {
      if (item.keys == id) {
        dict[ind].values = value;
        setDict(dict);
        dictiii[ind].values = price;
        setDictiii(dictiii);
        count = 1;
      }
    })
    if (count == 0) {
      dict.push(dicti);
      setDict(dict)
      dictiii.push(dictiiii);
      setDictiii(dictiii);
    }
  };

  const handleChangeii = (event) => {

    const {
      target: { value },
    } = event;
    setPersonNamei(
      typeof value === 'string' ? value.split(',') : value,
    );

    setTemp(temp + 1);
  };


  const handleChangeiii = (event) => {

    const {
      target: { value },
    } = event;
    setPersonNameii(
      typeof value === 'string' ? value.split(',') : value,
    );

    setTemp(temp + 1);
  };

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
  }, []);


  const idii = {
    name: _id
  }




  useEffect(() => {
    axios
      .get("http://localhost:4000/menu/")
      .then((response) => {
        setSearchData(response.data);
      })
      .catch(function (error) {
      });
    // alert("hi")
    setFavcount(favcount + 1);

  }, []);



  useEffect(() => {
    axios
      .get("http://localhost:4000/menu/")
      .then((response) => {
        // menu = response.data;
        setMenu(response.data);
        // alert(menu.length)
      })
      .catch(function (error) {
      });
  });
  // var count = 0;

  useEffect(() => {
    if (menu.length > 0) {
      if (count == 0) {
        var s = shoparr;
        var m = tagarr;
        searchData.map((item) => {
          if (maxdistance < Number(item.price)) {
            // var a = 100;
            // setMaxdistance(a);
            // alert(maxdistance + "adfs" + item.price)
            setMaxdistance(Number(item.price));
            // alert(maxdistance)
            var v = [0, Number(item.price)]
            setValue2(v);
          }
          if (s.includes(item.shop)) {

          }
          else {
            s.push(item.shop);
          }

          item.tag.map((tag) => {
            if (m.includes(tag.name)) {

            }
            else {
              m.push(tag.name);
            }
          })

        })

        // alert(shoparr.length);
        menu.map((item) => {
          const a = [];
          var b = 0;

          const dictiiii = {
            keys: item._id,
            values: b
          };
          dictiii.push(dictiiii);
          setDictiii(dictiii);

          const dicti = {
            keys: item._id,
            values: a
          };
          dict.push(dicti);
          setDict(dict);

          const dictii = {
            keys: item._id,
            quantity: 1
          };
          quandict.push(dictii);
          setQuan(quandict);
        });
        setCount(1)
      }
    }
  });

  useEffect(() => {

    const c = menu.filter(task => {
      var type = 0;
      var shop = 0;
      var price = 0;
      var search = 0;
      var tag = 0;

      var rate = Number(task.price);

      if ((vegchecked == false && nonvegchecked == false) || (task.type == 'veg' && vegchecked == true) || (task.type == 'non-veg' && nonvegchecked == true)) {
        type = 1;
      }

      if (rate >= value2[0] && rate <= value2[1])
        price = 1;

      if (personNamei.includes(task.shop) || personNamei.length == 0) {
        shop = 1;
      }

      if (personNameii.length == 0) {
        tag = 1;
      }
      else {
        task.tag.map((tagi) => {
          if (personNameii.includes(tagi.name)) {
            tag = 1;
          }
        })
      }

      if (searchtext == '' || task.item.toLowerCase().indexOf(searchtext) !== -1) {
        search = 1;
      }

      return (
        type * shop * price * search * tag
      );
    });

    setSearchData(c);
    // alert(sort)

    // var d = searchData;
    // d.price = Number(d.price);
    // d.rating = Number(d.rating);
    if (on == 1) {
      if (sort == 1) {
        const a = c.sort((f, b) => Number(f.price) - Number(b.price));
        setSearchData(a);
      }
      else if (sort == 2) {
        const a = c.sort((f, b) => Number(b.price) - Number(f.price));
        setSearchData(a);
      }
      else if (sort == 3) {
        const a = c.sort((f, b) => Number(f.rating) - Number(b.rating));
        setSearchData(a);
      }
      else if (sort == 4) {
        const a = c.sort((f, b) => Number(b.rating) - Number(f.rating));
        setSearchData(a);
      }
    }

  }, [temp]);


  const simple = (id, addon) => {
    var i = 0;

    var counti = 0;
    if (quandict.length != 0) {
      quandict.map((item, ind) => {
        if (item.keys === id) {
          i = ind;
          counti = counti + 1;
        }
      })

      if (counti == 0) {
        const dictii = {
          keys: id,
          quantity: 0
        };
        i = quandict.length;
        quandict.push(dictii);
        setQuandict(quandict);
      }

      return (
        <div>
          <Badge color="secondary" badgeContent={quandict[i].quantity}>
            {/* <ProductionQuantityLimitsIcon /> */}
            <AddShoppingCartIcon />
          </Badge>
          <p></p>
          <ButtonGroup>
            <Button
              aria-label="reduce"
              onClick={() => {
                var c = Math.max(quandict[i].quantity - 1, 1);
                quandict[i].quantity = c;
                setQuandict(quandict);
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button
              aria-label="increase"
              onClick={() => {
                var c = Math.max(quandict[i].quantity + 1, 0);
                quandict[i].quantity = c;
                setQuandict(quandict);
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>

        </div>
      );
    }

  };
  const sample = (id, addon) => {
    var i = 0;
    // alert(id)
    var counti = 0;
    if (dict.length != 0) {
      // alert(dict.length)
      // alert("hel")
      // alert("helli")s

      dict.map((item, ind) => {
        if (item.keys === id) {
          i = ind;
          // alert(id)
          counti = counti + 1;
        }
      })
      // alert("hel")
      if (counti == 0) {
        const a = [];
        const dicti = {
          keys: id,
          values: a
        };
        i = dict.length;
        dict.push(dicti);
        setDict(dict);
      }

      return (
        <FormControl sx={{ m: 1, width: 120 }}>
          <InputLabel id="demo-multiple-chip-label">Addons</InputLabel>

          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={dict[i].values}
            onChange={(e) => handleChange(id, e, addon)}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {addon.map((name) => (
              <MenuItem
                key={name.name}
                value={name.name}
                style={getStyles(name.name, personName, theme)}
              >
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
  };

  const onSearch = (event) => {
    event.preventDefault();
    var text = event.target.value;
    text = text.toLowerCase();
    setSearchtext(text);
    setTemp(temp + 1);

    // if (!text) {
    //   setSearchData(menu);
    //   return;
    // }

    // const finalResult = [];
    // menu.forEach((items) => {
    //   if (
    //     items.item.toLowerCase().indexOf(text) !== -1
    //   ) {
    //     finalResult.push(items);
    //   }
    // });
    // setSearchData(finalResult);
  };

  const buy = (item) => {
    var instant = new Date();
    var time = instant.getHours() + ':' + instant.getMinutes() + ':' + instant.getSeconds();
    var date = instant.getDate() + ':' + instant.getMonth() + 1 + ':' + instant.getFullYear();
    var hours = instant.getHours();
    var minutes = instant.getMinutes();
    hours = hours + minutes / 100;
    var ta = Number(item.ha) + Number(item.ma) / 100;
    var tb = Number(item.hb) + Number(item.mb) / 100;

    if (hours >= ta && hours <= tb) {
      // alert(hours + "-" + ta + "-" + tb)
      return (
        <Chip icon={<AddIcon />} label="BUY" onClick={(e) => onSubmit(e, item)} />
      );
    }
    else {

      return (
        <Chip label="UNAVAILABLE" />
      );
    }
    // alert(ta)
    // alert(hours);
    // alert(typeof(hours));


  }



  const onSubmit = (event, menui) => {
    event.preventDefault();

    var i = 0;
    quandict.map((item, ind) => {
      if (item.keys === menui._id) {
        i = ind;
      }
    })

    var j = 0;
    dictiii.map((item, ind) => {
      if (item.keys === menui._id) {
        j = ind;
      }
    })

    // alert(dictiii[j].values);
    // alert(quandict[i].quantity);
    if (Number(details.wallet) - (Number(menui.price) * Number(quandict[i].quantity) - dictiii[j].values) <= 0) {
      alert("NOT ENOUGH MONEY");
      return;
    }
    var result = Number(details.wallet) - Number(menui.price) * Number(quandict[i].quantity) - dictiii[j].values;

    details.wallet = result.toString(10);

    axios.post("http://localhost:4000/user/edit", details);

    var i = 0;
    dict.map((item, ind) => {
      if (item.keys === menui._id) {
        i = ind;
      }
    })

    var j = 0;
    quandict.map((item, ind) => {
      if (item.keys === menui._id) {
        j = ind;
      }
    })
    var quanti = quandict[j].quantity.toString(10);
    var instant = new Date();
    var time = instant.getHours() + ':' + instant.getMinutes() + ':' + instant.getSeconds();
    var date = instant.getDate() + ':' + instant.getMonth() + 1 + ':' + instant.getFullYear();
    const item = {
      name: _id,
      id: menui._id,
      item: menui.item,
      price: menui.price,
      number: details.number,
      rating: '0',
      type: menui.type,
      addon: dict[i].values,
      shop: menui.shop,
      time: time,
      quantity: quanti,
      date: date,
      status: "PLACED"
    }
    // alert(item.number);

    axios
      .post("http://localhost:4000/order/add", item)
      .then((response) => {
      })
      .catch((err) => {
        alert(err)
      });

  };



  // alert(menu[0].item)
  return (
    <div>
      <Navbar></Navbar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid container >
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField id="standard-basic" label="Search" fullWidth={true} InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
              onChange={onSearch}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>

        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <Divider />
            <ListItem>

              <Grid item xs={12}>

                <Grid >
                  VEG
                  <Checkbox checked={vegchecked} color="success" onChange={() => {
                    if (vegchecked == false)
                      setVegchecked(true);
                    else
                      setVegchecked(false);
                    setTemp(temp + 1);
                  }} />
                </Grid>

                <Grid >
                  NON-VEG
                  <Checkbox checked={nonvegchecked} color="secondary" onChange={() => {
                    if (nonvegchecked == false)
                      setNonvegchecked(true);
                    else
                      setNonvegchecked(false);
                    setTemp(temp + 1);
                  }} />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid item xs={22} md={100} lg={10} align="center">
                <Grid item xs={20} align="center">
                  <br></br>
                  PRICE FILTER
                  <Slider
                    min={0}
                    max={maxdistance}
                    getAriaLabel={() => 'Minimum distance shift'}
                    color="warning"
                    value={value2}
                    onChange={slider}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                  />
                </Grid>
                <br></br>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid item xs={22} md={100} lg={10} align="center">
                <FormControl sx={{ m: 0, width: 330 }}>
                  <InputLabel id="demo-multiple-chip-label">Select Shops</InputLabel>

                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personNamei}
                    onChange={(e) => handleChangeii(e)}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {shoparr.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personNamei, theme)}
                      >
                        <Checkbox checked={personNamei.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>
              </Grid>
            </ListItem>
            <Divider />

            <ListItem>
              <Grid item xs={22} md={100} lg={10} align="center">
                <FormControl sx={{ m: 0, width: 330 }}>
                  <InputLabel id="demo-multiple-chip-label">Select Tags</InputLabel>

                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personNameii}
                    onChange={(e) => handleChangeiii(e)}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {tagarr.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personNameii, theme)}
                      >
                        <Checkbox checked={personNameii.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>
              </Grid>
            </ListItem>
            <Divider />

            <ListItem>
              <Grid item xs={22} md={100} lg={10} align="center">
                {/* <Switch onClick={setOn((on + 1) % 2)} /> */}
                {/* <FormGroup> */}

                {/* <FormControlLabel disabled control={<Switch />} label="Disabled" /> */}
                {/* </FormGroup> */}
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Sortings</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="price-asce"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="price-asce" disabled={!on} control={<Radio />} label="price-asce" onClick={() => { setSort(1); setTemp(temp + 1) }} />
                    <FormControlLabel value="price-desc" disabled={!on} control={<Radio />} label="price-desc" onClick={() => { setSort(2); setTemp(temp + 1) }} />
                    <FormControlLabel value="rating-asce" disabled={!on} control={<Radio />} label="rating-asce" onClick={() => { setSort(3); setTemp(temp + 1) }} />
                    <FormControlLabel value="rating-desc" disabled={!on} control={<Radio />} label="rating-desc" onClick={() => { setSort(4); setTemp(temp + 1) }} />
                  </RadioGroup>
                </FormControl>
                <FormControlLabel control={<Switch defaultUnchecked />} label="On/Off" onClick={() => { setOn((on + 1) % 2); setTemp(temp + 1) }} />
              </Grid>
            </ListItem>
            <Divider />
          </List>

        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          {searchData.map((item, ind) => (
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
                    maxHeight: { xs: 233, md: 350 },
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
                    <Rating name="read-only" value={item.rating} precision={0.5} readOnly />
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
                    SHOP: {item.shop}
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
                        fontSize: 12,
                        alignItems: 'center',
                        '& svg': {
                          fontSize: 21,
                          mr: 0.5,
                        },
                      }}
                    >
                      ADDON-{ind}: {element.name}, {element.price}RS
                    </Box>
                  ))}
                  {item.tag.map((element, ind) => (
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
                      TAGS-{ind}: {element.name}
                    </Box>
                  ))}
                </Box>
                <Box>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    m: 1.5,
                    minWidth: { md: 250 },
                  }}>
                    {/* {simple(item._id, item.addon)} */}
                    {simple(item._id, item.addon)}
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    m: 0.5,
                    minWidth: { md: 250 },
                  }}>
                    {sample(item._id, item.addon)}
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  m: 0,
                  minWidth: { md: 250 },
                }}>
                  {buy(item)}
                  {/* <Chip icon={<AddIcon />} label="BUY" onClick={(e) => onSubmit(e, item)} /> */}
                  <br></br>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    m: 2,
                    minWidth: { md: 250 },
                  }}>
                    <FavoriteIcon color="disabled" onClick={() => {

                      const a = {
                        name: details._id,
                        id: item._id,
                        item: item.item,
                        price: item.price,
                        rating: item.rating,
                        type: item.type,
                        addon: item.addon,
                        shop: item.shop
                      }

                      axios
                        .post("http://localhost:4000/favorite/find", a)
                        .then((response) => {

                          if (response.data.length == 0) {
                            axios
                              .post("http://localhost:4000/favorite/add", a)
                              .then((response) => {
                                alert("ADDED")
                                var c = addi;
                                c.push(item.id)
                                setAddi(c);
                              })
                              .catch((err) => {
                                alert("INVAILD USER")
                              });
                          }
                          else {
                            alert("ALREADY ADDED")
                          }
                        })


                      setFavcount(favcount + 1)


                    }} />
                  </Box>
                </Box>
              </Box>

            </div>
          ))
          }
        </Grid>
      </Grid>
      <br></br>
      <br></br>
      <br></br>
    </div >

  );
};

export default Home;
