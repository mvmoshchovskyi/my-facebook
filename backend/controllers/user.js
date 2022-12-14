const {validateEmail, validateLength, validateUsername} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {generateToken} = require("../helpers/tokens");
const {sendVerificationEmail} = require("../helpers/mailer");

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            password,
            email,
            dYear,
            dMonth,
            dDay,
            gender,
        } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({message: 'not valid email'})
        }

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'this email already exists'})
        }

        if (!validateLength(first_name, 3, 30)) {
            return res.status(400).json({message: 'first_name must be between 3 and 30 characters'})
        }

        if (!validateLength(last_name, 3, 30)) {
            return res.status(400).json({message: 'last_name must be between 3 and 30 characters'})
        }

        if (!validateLength(password, 5, 30)) {
            return res.status(400).json({message: 'password must be at least 6 characters'})
        }

        const cryptedPassword = await bcrypt.hash(password, 8)
        let tempUsername = first_name + last_name
        let newUsername = await validateUsername(tempUsername)
        const user = await new User({
            first_name,
            last_name,
            username: newUsername,
            password: cryptedPassword,
            email,
            dYear,
            dMonth,
            dDay,
            gender,
        }).save();

        const emailVerificationToken = generateToken({id: user._id.toString()}, '1d')

        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        sendVerificationEmail(user.email, user.first_name, url);
        const token = generateToken({id: user._id.toString()}, '7d')
        res.send({
            id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            picture: user.picture,
            token: token,
            verified: user.verified,
            message: " Register success! Please activate your email"
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.activateAccount = async (req, res) => {
    try {
        const {token} = req.body;
        const user = jwt.verify(token, process.env.TOKEN_SECRET)
        const check = await User.findById(user.id)
        if (check.verified === true) {
            return res.status(200).json({message: 'this email is already activated'})
        } else {
            await User.findByIdAndUpdate(user.id, {verified: true})
        }
        return res.status(200).json({message: 'account has been activated successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email })
        if (!user){
            return res.status(400).json({message: 'the email you entered is not connected to account'})
        }

        const check = await bcrypt.compare(password, user.password);
        if (!check){
            return res.status(400).json({message: 'invalid credentials. Please try again'});
        }

        const token = generateToken({id:user._id.toString()}, "7d");
        res.send({
            id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            picture: user.picture,
            token: token,
            verified: user.verified,
            message: " Register success! Please activate your email"
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

