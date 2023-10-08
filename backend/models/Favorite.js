const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FavoriteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
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
    addon: {
        type: [{ name: { type: String, required: true }, price: { type: String, required: true } }],
        required: true
    },
    shop: {
        type: String,
        required: true
    }

});

module.exports = Favorite = mongoose.model("Favorite", FavoriteSchema, "favorite");
