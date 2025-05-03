const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const { generateTokenAndSetCookie } = require('../utils/tokenUtils');

exports.signUp = async (req, res) => {
    try {
        const { email, password, role, phone, name } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const existing = await User.findOne({ email: email });
        if (existing) {
            return res.status(400).json({ error: "User Already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            role: role,
            phone: phone,
        });
        const savedUser = await user.save();
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json(savedUser);
    } catch (e) {
        console.log("error in signUp", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            generateTokenAndSetCookie(user._id, res);
            res.status(200).json({ message: "Login Successful" });
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (e) {
        console.log("error in Login", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.Logout = (req, res) => {
    try {
        res.clearCookie("jwt", { path: "/" });
        res.json({ message: "Logged out" });
    } catch (e) {
        console.log("Error in Logout", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (e) {
        console.log("error in getProfile", e.message);
        res.status(500).json({ error: "Profile Error`" });
    }
}
exports.editProfile = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const userId = req.userId;
        const user = await User.findByIdAndUpdate(userId, { name: name, phone: phone, email: email }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (e) {
        console.log("error in editProfile ", e.message);
        res.status(500).json({ error: "Can't edit profile" });
    }
}
