const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["Mr", "Miss", "Mrs"],
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true

    },
    address: {
        street: String,
        city: String,
        pincode: String
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true }
)
module.exports = mongoose.model('User', userSchema)