const { raw } = require("body-parser");
var express = require("express");
var router = express.Router();

// Load User model
const Menu = require("../models/Menu");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Menu.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/item", function (req, res) {
    const id = req.body.id
    // console.log(id);
    Menu.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            // console.log(users)
            res.status(200).send(users);
        }
    })
});

router.post("/shop", function (req, res) {
    Menu.find({ shop: req.body.shop }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/add", (req, res) => {
    const newMenu = new Menu({
        sold: req.body.sold,
        item: req.body.item,
        price: req.body.price,
        rating: req.body.rating,
        type: req.body.type,
        addon: req.body.addon,
        shop: req.body.shop,
        tag: req.body.tag,
        ha: req.body.ha,
        hb: req.body.hb,
        ma: req.body.ma,
        mb: req.body.mb,
    });
    newMenu.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/delete", (req, res) => {
    // Find user by email
    Menu.findOneAndDelete({ _id: req.body._id }, function (err, docs) {
        if (err) {
            console.log(err)
            res.status(400);
        }
        else {
            res.status(200);
        }
    });
});


router.post("/editi", (req, res) => {
    // Find user by email
    Menu.findByIdAndUpdate(req.body.id, {
        "sold": req.body.sold
    },
        function (err, docs) {
            if (err) {
                console.log(err)
                res.status(400);
            }
            else {
                res.status(200).send("hello");
            }
        });
});

router.post("/editrating", (req, res) => {
    // Find user by email
    Menu.findByIdAndUpdate(req.body.id, {
        "rating": req.body.rating
    },
        function (err, docs) {
            if (err) {
                console.log(err)
                res.status(400);
            }
            else {
                res.status(200).send("hello");
            }
        });
});


router.post("/edittime", (req, res) => {
    // Find user by email
    Menu.findByIdAndUpdate(req.body._id, {
        "ha": req.body.ha,
        "hb": req.body.hb,
        "ma": req.body.ma,
        "mb": req.body.mb,
    },
        function (err, docs) {
            if (err) {
                console.log(err)
                res.status(400);
            }
            else {
                res.status(200).send("hello");
            }
        });
});

router.post("/edit", (req, res) => {
    // Find user by email
    Menu.findByIdAndUpdate(req.body._id, {
        "item": req.body.item,
        "price": req.body.price,
        "rating": req.body.rating,
        "type": req.body.type,
        "addon": req.body.addon
    },
        function (err, docs) {
            if (err) {
                console.log(err)
                res.status(400);
            }
            else {
                res.status(200).send("hello");
            }
        });
});

module.exports = router;

