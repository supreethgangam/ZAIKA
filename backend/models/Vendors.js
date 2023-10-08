const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ha: {
        type: String,
        required: true
    },
    ma: {
        type: String,
        required: true
    },
    hb: {
        type: String,
        required: true
    },
    mb: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },

});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema, "vendors");
