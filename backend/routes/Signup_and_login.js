const express = require('express');
const router = require ("express").Router();
const user = require("../models/Personal_details.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Secret = process.env.SECRET
const {check_login}= require("../middlewares/token_verify.js")

// constants importing
const {check} = require('../constants.js')

// authentication
// field -> rollNo , password  , email , age , name
router.post('/Signup', async (req, res) => {
    try {
        const { name, email, password, rollNo } = req.body;

        if (!name || !email || !password || !rollNo) {
            return res.status(400).send("All fields are required");
        }

        const emailParts = email.split("@");
        const socname = emailParts[0];
        const domain = emailParts[1];

        if (domain !== "iiita.ac.in") {
            return res.status(400).send("Signup with college email id please");
        }

        let type = "member";
        if (check(socname)) {
            type = "society";
        }

        const existingUser = await user.findOne({ rollNo });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        // console.log(hashedPassword);

        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            rollNo,
            type
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: "Signup successful" }); 
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error"); 
    }
});

// Login route
router.post('/Login', async (req, res) => {
    try {
        const { rollNo, password } = req.body;

        if (!rollNo || !password) {
            return res.status(400).send("All fields are required");
        }

        // Find the user
        const registeredUser = await user.findOne({ rollNo });
        if (!registeredUser) {
            return res.status(400).send("Invalid credentials");
        }

        // Compare the password
        const isPasswordValid = await bcryptjs.compare(password, registeredUser.password);
        // console.log(password , registeredUser.password)
        if (!isPasswordValid) {
            return res.status(400).send("Invalid credentials");
        }

        // Create a token
        const authClaims = {
            name: registeredUser.name,
            role: registeredUser.type,
            email: registeredUser.email,
            rollNo: registeredUser.rollNo,
        };
        const token = jwt.sign(authClaims, Secret, { expiresIn: "30d" });

        return res.status(200).json({ id: registeredUser._id, email: registeredUser.email, role: registeredUser.type, token }); // Return statement added here
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

// Get user info route
router.get("/get-user-info", check_login, async (req, res) => {
    try {
        return res.json(req.user); 
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});


module.exports = router;