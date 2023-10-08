const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
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
	age: {
		type: String,
		required: true
	},
	batch: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: false
	},
	wallet: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = User = mongoose.model("Users", UserSchema, "users");
