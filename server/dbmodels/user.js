const mongoose = require('mongoose');



// User Schema
const UserSchema = mongoose.Schema({
  name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    addresses: {
        firstname: { type: String, default: '' },
        lastname: { type: String, default: '' },
        address: { type: String, default: '' },
        city: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
    }
});

const User = module.exports = mongoose.model('User', UserSchema);