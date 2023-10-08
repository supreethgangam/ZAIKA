const { raw } = require("body-parser");
var express = require("express");
var router = express.Router();

// Load User model
const Order = require("../models/Orders");
const { rawListeners } = require("../models/Vendors");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Order.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/name", function (req, res) {
    Order.find({ name: req.body.name }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/shop", function (req, res) {
    Order.find({ shop: req.body.shop }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/count", function (req, res) {
    Order.find({ status: { $in: ['ACCEPTED', 'COOKING'] } }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.get("/counti", function (req, res) {
    Order.find({ status: { $in: ['ACCEPTED', 'COOKING', 'READY FOR PICKUP', 'PLACED'] } }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.get("/countii", function (req, res) {
    Order.find({ status: { $in: ['COMPLETED'] } }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.get("/countiii", function (req, res) {
    Order.find({ status: { $in: ['PLACED', 'ACCEPTED', 'COOKING', 'READY FOR PICKUP', 'REJECTED', 'COMPLETED'] } }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/add", (req, res) => {
    const newOrder = new Order({
        id: req.body.id,
        name: req.body.name,
        item: req.body.item,
        price: req.body.price,
        number: req.body.number,
        rating: req.body.rating,
        type: req.body.type,
        addon: req.body.addon,
        shop: req.body.shop,
        time: req.body.time,
        quantity: req.body.quantity,
        date: req.body.date,
        status: req.body.status
    });
    newOrder.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login

router.post("/edit", (req, res) => {
    // Find user by email
    Order.findByIdAndUpdate(req.body._id, {
        "status": req.body.status
    },
        function (err, docs) {
            if (err) {
                console.log(err)
                res.status(400);
            }
            else {
                res.status(200).json(docs);
            }
        });
});

router.post("/editrating", (req, res) => {
    // Find user by email
    Order.findByIdAndUpdate(req.body._id, {
        "rating": req.body.rating
    },
        function (err, docs) {
            if (err) {
                console.log(err)
                res.status(400);
            }
            else {
                res.status(200).json(docs);
            }
        });
});

module.exports = router;

