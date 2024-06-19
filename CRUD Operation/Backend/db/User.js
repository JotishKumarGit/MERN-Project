
// Require mongoose
const mongoose = require('mongoose');

// Making user Schema for user
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// hare we export the module (Table name is User so dont write same thing )
module.exports = mongoose.model("users", userSchema);














