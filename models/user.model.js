const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    password: {
        type: String,
        required: true
    },
    orders: {
        type: Array,
        required: false
    },
    cart: {
        type: Array,
        required: false
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;