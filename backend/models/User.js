const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: false
    }
});

module.exports = User = mongoose.model('RegisterUser', UserSchema);
