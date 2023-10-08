import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/Users/Home";
import Favourites from "./components/Users/Favourites";
import Login from "./components/Users/Login";
import Myorders from "./components/Users/Myorders";
import Register from "./components/Users/Register";
import Profile from "./components/Users/Profile";
import Vhome from "./components/Vendors/Home";
import Vlogin from "./components/Vendors/Login";
import Vregister from "./components/Vendors/Register";
import Vprofile from "./components/Vendors/Profile";
import Orders from "./components/Vendors/Orders";
import Statistics from "./components/Vendors/Statistics";
import Edit from "./components/Users/Edit";
import Vedit from "./components/Vendors/Edit";
import Menuadd from "./components/Vendors/Menuadd";
import Medit from "./components/Vendors/Medit";
import Marketing from "./components/Vendors/Marketing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="student" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="vregister" element={<Vregister />} />
        <Route path="profile" element={<Profile />} />
        <Route path="vprofile" element={<Vprofile />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="login" element={<Login />} />
        <Route path="myorders" element={<Myorders />} />
        <Route path="vendor" element={<Vhome />} />
        <Route path="vlogin" element={<Vlogin />} />
        <Route path="orders" element={<Orders />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="edit" element={<Edit />} />
        <Route path="vedit" element={<Vedit />} />
        <Route path="medit" element={<Medit />} />
        <Route path="menuadd" element={<Menuadd />} />
        <Route path="marketing" element={<Marketing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
