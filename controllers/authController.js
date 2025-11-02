const { json } = require('express');
const db = require('../config/database');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


//register user
const registerUser = async (req,res)=> {
    try{
        console.log("inside reg user");
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "user already exists"});
        }

        //create user
        const user = await User.create({
            name,email,password
        })

        //create token
        const token = jwt.sign({
            id:user._id, role: user.role, email: user.email
        },process.env.JWT_SECRET_KEY,{expiresIn: '1d'});

        //set cookie
        res.cookie("token", token, {
            httpOnly: true,   // frontend JS cannot access
            secure: false,    // true only for HTTPS
            sameSite: "strict",
            maxAge: 60 * 60 * 1000 *24, // 1 day
        });


        res.status(200).json({message: "User registered sucessfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//user login
const userLogin = async (req,res) => {
    try{
    console.log("inside userLogin");
    const {name, email,password} = req.body;
    const user = await User.findOne({email}).select('+password');;
    //user not exists
    if(!user) return res.status(404).json({message:"user not found"});

    //user exists
    //check password
    const verifyPassword = await user.comparePassword(password);
    if(!verifyPassword){
        return res.status(401).json({message: "invalid credentials"});
    }

    //create token
        const token = jwt.sign({
            id:user._id, role: user.role, email: user.email
        },process.env.JWT_SECRET_KEY,{expiresIn: '1d'});

        //set cookie
        res.cookie("token", token, {
            httpOnly: true,   // frontend JS cannot access
            secure: false,    // true only for HTTPS
            sameSite: "strict",
            maxAge: 60 * 60 * 1000 *24, // 1 day
        });
    
    res.status(200).json({message:"user verified,log in succesfull",token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }

}

//user logout
const userLogout = (req,res) => {
    res.clearCookie("token");
    res.json({message: "logged out succesfully"});
}

module.exports = {registerUser, userLogin, userLogout}