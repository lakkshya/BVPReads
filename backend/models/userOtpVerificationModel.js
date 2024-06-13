const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userOtpVerificationSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }
});

module.exports = mongoose.model('UserOtpVerification', userOtpVerificationSchema);