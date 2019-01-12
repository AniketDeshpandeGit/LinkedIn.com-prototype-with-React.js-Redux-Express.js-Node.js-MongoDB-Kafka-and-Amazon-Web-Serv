var express = require('express');
var router = express.Router();
var user = require('../models/user');
var jwt = require('jsonwebtoken'); 
var config = require('../settings');
//var {mongoose} = require('../db/mongoose');

//handle login using passport & jwt tokens
router.post('*', (req, res, next) =>{
    var email = req.body.email;
    var pwd = req.body.password;

    user.getUserByEmail(email, (err, userinfo) => {
        if(err) throw err;
        if(!userinfo){
            console.log("User not found");
            res.status(200).send({success: false, status: "ERROR", message:"User not found"});
        }
        else{
            console.log(userinfo);
            user.comparePassword(pwd, userinfo.password, (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign(userinfo.toJSON(), config.secret,{
                        expiresIn: 24*60*60
                    });
                    console.log("Found the user in DB!");
                    res.cookie('name',userinfo.firstName + " " + userinfo.lastName,{maxAge: 900000, httpOnly: false, path : '/'});           
                    res.status(200).send({
                        success: true,
                        status: "SUCCESS",
                        token: token,
                        user:{
                            name: userinfo.firstName + ' ' + userinfo.lastName,
                            ...userinfo._doc,
                        }
                    });
                }
                else{
                    console.log("Wrong Password!");
                    res.status(200).send({success: false, status: "ERROR", message: 'Wrong Password!'});
                }
            });
        }
    });    
});

module.exports = router;