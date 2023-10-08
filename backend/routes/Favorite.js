const { raw } = require("body-parser");
var express = require("express");
var router = express.Router();

// Load User model
const Favorite = require("../models/Favorite");

router.get("/", function (req, res) {
    Favorite.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/name", function (req, res) {
    Favorite.find({ name: req.body.name }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            // console.log(users);
            res.status(200).json(users);
        }
    })
});

router.post("/find", function (req, res) {
    Favorite.find({ id: req.body.id }, { name: req.body.name }, function (err, users) {
        if (err) {
            console.log(err);
        } else {

            res.status(200).json(users);
        }
    })
});

router.post("/add", (req, res) => {
    const newFavorite = new Favorite({
        name: req.body.name,
        id: req.body.id,
        item: req.body.item,
        price: req.body.price,
        rating: req.body.rating,
        type: req.body.type,
        addon: req.body.addon,
        shop: req.body.shop,
    });
    newFavorite.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;