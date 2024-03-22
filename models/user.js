const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    job: String
});

module.exports = mongoose.model('User', userSchema);