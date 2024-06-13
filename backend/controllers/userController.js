require('dotenv').config();
const User = require('../models/userModel');
const UserOtpVerification = require('../models/userOtpVerificationModel');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Generate a random secret key
const generateSecret = () => {
    return speakeasy.generateSecret({ length: 20 }).base32;
};

//generate jwt token
const createToken = (email) => {
    return jwt.sign({email}, process.env.SECRETJWT, {expiresIn: '1d'});
}

//nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
    },
});

//testing success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready for messages");
        console.log(success);
    }
});

//signup
const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();

        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // User already exists
            return res.status(400).json({ message: 'User with the provided email already exists' });
        }

        // Password handling
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            verified: false
        });

        // Save new user
        await newUser.save();

        // Handle account verification
        await sendOtpVerification(newUser, res);

        // Create a token
        const token = createToken(email);
        res.status(200).json({ name, email, token });

    } catch (error) {
        res.status(400).json({ message: 'An error occurred while signing up' });
    }
};

const sendOtpVerification = async ({ email }, res) => {
    try {
        const secret = generateSecret();

        const otp = speakeasy.totp({
            secret: secret,
            step: 180,
        });

        //mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'BVICAM Library Signup',
            html: `<p><b>${otp}</b> is your otp to complete your Signup. This code <b>expires in 1 minutes</b></p>`,
        };

        //hash the otp
        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(otp, saltRounds);

        const newOtpverification = new UserOtpVerification({
            email: email,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 180000,
        });

        //save otp record
        await newOtpverification.save();
        await transporter.sendMail(mailOptions);

        return true;
    } catch (error) {
        return false;
    }
};

const verifyOtp = async (req, res) => {
    try {
        let { otp } = req.body;

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETJWT);
        const email = decoded.email;

        //user email doesn't exist
        const userOtpVerificationRecords = await UserOtpVerification.find({ email });
        const { expiresAt } = userOtpVerificationRecords[0];
        const hashedOtp = userOtpVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
            await UserOtpVerification.deleteMany({ email });
            throw new Error('1');
        }
        else {
            const validOtp = await bcrypt.compare(otp, hashedOtp);

            if (!validOtp) {
                throw new Error('2');
            }
            else {
                await User.updateOne({ email: email }, { verified: true });
                await UserOtpVerification.deleteMany({ email });
                res.status(200).json({ message: 'User email verified successfully' });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const resendOtpVerification = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETJWT);
        const email = decoded.email;

        await UserOtpVerification.deleteMany({ email });
        sendOtpVerification({ email: email }, res);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const signin = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect Email' });
        }

        const name = user.name;

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        const token = createToken(email);
        res.status(200).json({ name, email, token });
    } catch(error) {
        res.status(400).json({ message: 'An error occurred while signing in' });
    }
}

module.exports = {
    signup,
    verifyOtp,
    resendOtpVerification,
    signin
};