const express = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 4;
const jwt = require("jsonwebtoken")
require("dotenv").config();

const { UserModel } = require("../Models/User.model");





const userRoutes = express.Router();


userRoutes.post("/signup", async(req,res) => {
    const {name,email,password} = req.body;

    const alreadyExist = await UserModel.findOne({email})

    if(alreadyExist){
        res.send({Message: "User Already Exist" })
    }
    else {

        try {
            bcrypt.hash(password, saltRounds, async(err,passwrd) => {
                const user = new UserModel({name,email,password:passwrd})
                await user.save()
                res.send("Signup Successfully")
            })
        } 
        
        catch (err) {
            console.log(err)
            res.send({message:"Error while signing-Up"})
        }
    }
})


userRoutes.post("/login", async(req,res) => {
    try {
        const {email, password}= req.body;
        const user = await UserModel.find({email});
       
        if(user.length>0){
            console.log(user)
            const passwrd = user[0].password;
            bcrypt.compare(password, passwrd, function (err,result){
                if(result){
                    console.log("amit")
                    const token = jwt.sign({message:"heya"}, process.env.secret_key, {expiresIn: "1d"})
                    console.log("token",token)
                    res.send({token, message:"Logged-in Successfully"})
                }
                else{
                    res.send("Login Failed")
                }
            })
        }
       else{
        res.send("Login failed")
       }
    } 
    
    catch (error) {
        console.log(error)
        res.send("Login failed")
    }
})

module.exports = { userRoutes }