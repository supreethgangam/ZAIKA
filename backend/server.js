const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "neeraj"

// routes
var UserRouter = require("./routes/Users");
var VendorRouter = require("./routes/Vendors");
var MenuRouter = require("./routes/Menu");
var OrderRouter = require("./routes/Orders");
var OrderFavorite = require("./routes/Favorite");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var path = "mongodb+srv://plivo:1234@cluster0.tay5d.mongodb.net/?retryWrites=true&w=majority"

// var link = 'mongodb://127.0.0.1:27017/' + DB_NAME
// Connection to MongoDB

mongoose.connect(path, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully !");
})


// setup API endpoints
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);
app.use("/menu", MenuRouter);
app.use("/order", OrderRouter);
app.use("/favorite", OrderFavorite);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
