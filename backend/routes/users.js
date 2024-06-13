const express = require('express');

const {
    signup,
    verifyOtp,
    resendOtpVerification,
    signin
} = require('../controllers/userController');

const router = express.Router();

//signup route
router.post('/signup', signup);

//verify otp
router.post('/verifyOtp', verifyOtp);

//resend otp
router.post('/resendOtpVerification', resendOtpVerification);

//signin route
router.post('/signin', signin);

module.exports = router;