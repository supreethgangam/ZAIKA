var express = require("express");
var router = express.Router();
var plivo = require("plivo");

// Load User model
const User = require("../models/Users");
var PLIVO_AUTH_ID = 'MAOTHIODFMOWUTZMFLZS';
var PLIVO_AUTH_TOKEN = 'MTEzMjI5Y2EtNTkxOS00ZDBjLWE2YjItNTM3MGYy';

var client = new plivo.Client(PLIVO_AUTH_ID, PLIVO_AUTH_TOKEN);

router.post("/send_message", function (req,res) {
    console.log(req.body)
    
    res = client.messages.create(
        src = req.body.from_number,
        dst = req.body.destination_number,
        text = req.body.message,
    )

    return "Message sent successfully";
});

router.post("/send_call", function (req,res) {
    console.log(req.body)
    
    res = client.calls.create(
        req.body.from_number,
        req.body.to_number,
        req.body.answer_url,
        {answer_method: req.body.answer_method},
    )

    return "Message sent successfully";
});

router.post("/numbers", function (req, res) {
    //find user named w
    User.find({}, function (err, users) {
        if (err) {
            console.log(err)
            res.status(400).send('failure');
        } else {
            res.status(200).json(users);
        }
    })

});

// GET request 
// Getting all the users
router.post("/profile", function (req, res) {
    const _id = req.body.id

    User.findOne({ _id }).then(user => {
        if (!user) {
            console.log(err);
            res.status(400).send("failure");
        } else {
            res.json(user);
        }
    })
});

router.post("/profilei", function (req, res) {
    User.find({ email: req.body.email }, function (err, users) {
        if (err) {
            console.log(err)
            res.status(400).send('failure');
        } else {
            res.status(200).json(users);
        }
    })
});




router.post("/edit", (req, res) => {

    // console.log(req.body._id)
    User.findByIdAndUpdate(req.body._id, {

        "name": req.body.name,
        "email": req.body.email,
        "number": req.body.number,
        "batch": req.body.batch,
        "age": req.body.age,
        "wallet": req.body.wallet,
        "password": req.body.password,

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

router.get("/profile", function (req, res) {
    User.find(function (err, users) {
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
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        number: req.body.number,
        batch: req.body.batch,
        password: req.body.password,
        wallet: req.body.wallet,
        date: req.body.date
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            // console.log(user.password)
            if (req.body.password == user.password) {
                res.status(200).send(user);
            }
            else {
                // return res.status(404).json({
                //     error: "WRONG PASSWORD",
                // });
                return res.status(404).send("WRONG PASSWORD")
            }
            return user;
        }
    });
});

module.exports = router;

