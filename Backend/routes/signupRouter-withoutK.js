var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.post('*', (req,res) => {
    console.log("Request received to create the user: " + req.body.email);
    var email = req.body.email;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())){
        res.status(200).send({status:'ERROR', message:'Invalid Email Format'});
    }
    else if(req.body.firstname === "" || req.body.lastname === "" || req.body.password === ""){
        res.status(200).send({status: "ERROR", message: "All input fields are required."});
    }
    else{
        user.getUserByEmail(email, (err, userinfo) => {
            if(err) throw err;
            if(!userinfo){
                var newUser = {
                    user_type: req.body.user_type,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    joined_date: new Date().toISOString(),
                };
            
                console.log(newUser);
            
                user.createUser(newUser, function(err, user){
                    console.log("Inside create new user function!");
                    if(err){
                        res.status(200).send({status: "ERROR", message: "Could not create the user. Please try again later."});
                    }
                    else{
                        console.log("Successfuly created the user in db!");
                        res.status(200).send({status: "SUCCESS", message: "User successfully created. Please sign in to continue."});
                    };        
                });     
                
            }
            else{
                console.log("User already exists. Did not create a new user " + email);
                res.status(200).send({status: 'ERROR', message: 'Account already exists with this email. Please sign in to continue.'});
            }});
        }
    });
    
    
module.exports = router;