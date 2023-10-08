var express = require("express");
var router = express.Router();

// Load User model
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/edit", (req, res) => {

    // console.log(req.body._id)
    Vendor.findByIdAndUpdate(req.body._id, {

        "name": req.body.name,
        "email": req.body.email,
        "number": req.body.number,
        "shop": req.body.shop,
        "password": req.body.password,
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

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        email: req.body.email,
        shop: req.body.shop,
        number: req.body.number,
        password: req.body.password,
        ha: req.body.ha,
        hb: req.body.hb,
        ma: req.body.ma,
        mb: req.body.mb,
        date: req.body.date
    });

    newVendor.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/profile", function (req, res) {
    const _id = req.body.id
    // console.log(_id)
    Vendor.findOne({ _id }).then(user => {
        if (!user) {
            console.log(err);
            res.status(400).send("failure");
        } else {
            res.json(user);
        }
    })
});

router.post("/profilei", function (req, res) {
    Vendor.find({ email: req.body.email }, function (err, users) {
        if (err) {
            console.log(err)
            res.status(400).send('failure');
        } else {
            res.status(200).json(users);
        }
    })
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            if (req.body.password == user.password) {

                res.status(200).send(user);
            }
            else {
                return res.status(404).json({
                    error: "Email not found",
                });
            }
            return user;
        }
    });
});

module.exports = router;

