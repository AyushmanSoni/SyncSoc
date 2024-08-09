const express = require('express');
const router = require ("express").Router();
const user = require("../models/Personal_details.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Secret = "Do you want to know my secret?"

// constants importing
const {check} = require('../constants.js')

// authentication
// field -> rollNo , password  , email , age , name
router.post('/Signup', async(req, res) =>{
    const roll = req.body.rollNo  
    const password = req.body.password
    const email = req.body.email
    const name = req.body.name
    const age = req.body.age
    let type = "member"
    const socname = email.split("@")[0] 
    const domain = email.split("@")[1]


    if(!roll || !password || !email || !name || !age ){
        return res.status(400).send("All fields are required");
    }
    
    if(roll.length <= 2){
        return res.status(400).send("Invalid roll number");
    }
    if(domain !== "iiita.ac.in"){
        return res.status(400).send("Signup with email id please ");
    }

    if( check(socname) ){
        type = "society"
    }

    console.log(roll , password , socname )  
    

    const newuser = new user({name:name , email: email , password: password , rollNo : roll , age : age , type : type });
    const temp = await newuser.save();

    return res.status(200).send(roll);

})


// field rollNo , password 
router.post('/Login', async(req, res) =>{
    const roll = req.body.rollNo  
    const password = req.body.password

    if(!roll || !password){
        return res.status(400).send("All fields are required");
    }

    const registered_user = await user.findOne({rollNo : roll , password : password});
    if(!registered_user){
        return res.status(400).send("Invalid credentials");
    }

    const authClaims= {
        name: registered_user.name,
        role: registered_user.type,
        email : registered_user.email,
        rollNo : registered_user.rollNo,
    }
    const token = jwt.sign(authClaims,Secret,{
        expiresIn:"30d",
    })

    res.status(200).json({id: registered_user._id, email : registered_user.email , role: registered_user.type,token:token});

})

module.exports = router;