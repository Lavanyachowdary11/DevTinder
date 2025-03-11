const express = require("express");
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user")
const validator = require('validator')

const bcrypt = require("bcrypt")

const authRouter = express.Router();

authRouter.post("/signup", async (req,res) => {
    try {
        //validation of the data
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        //encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //creating new instance of a User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save();
        res.send("User added successfully");
    } catch(err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

});

authRouter.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body
        const user = await User.findOne({emailId: emailId})
        if(!validator.isEmail(emailId)){
            res.status(404).send("Incorrect emailId");
        }
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = user.validatePassword(password)
        if(isPasswordValid) {
            const token = await user.getJWT()
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("Login Successfull!!!")
        }else {
            throw new Error("Password not correct")
        }
    } catch(err) {
        res.status(400).send("ERROR:" + err.message)
    }
});

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
});

module.exports = authRouter;