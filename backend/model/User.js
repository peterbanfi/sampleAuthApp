//4. Betöltjük a függőségeket.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//5. User schema létrehozása.
const User = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: false,
        unique: false
    }
}, {
    timestamps: true
});

User.plugin(passportLocalMongoose, {
    maxAttempts: 3,
});

module.exports = mongoose.model('User', User);