const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MenuSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    tag: {
        type: [{ name: { type: String, required: true } }],
        required: true
    },
    addon: {
        type: [{ name: { type: String, required: true }, price: { type: String, required: true } }],
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    sold: {
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

});

module.exports = Menu = mongoose.model("Menu", MenuSchema, "menu");
