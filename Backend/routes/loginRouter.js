var express = require('express');
var router = express.Router();
var user = require('../models/user');
var jwt = require('jsonwebtoken'); 
var config = require('../settings');
var kafka = require('../kafka/client');

//var {mongoose} = require('../db/mongoose');

//handle login using passport & jwt tokens
router.post('*', (req, res, next) =>{
    console.log("Request received to login the user: " + req.body.email);
   
   
    kafka.make_request('loginuser',req.body, function(err,result){

        console.log('Inside kafka.make_request for topic: loginuser.')
        
        if(err){
            console.log('Inside err of kafka.make_request.');
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else if(result){
            console.log('Response from kafka-backend: ' + JSON.stringify(result));
            res.status(200).send(JSON.stringify(result));
        }       
    });  
});

module.exports = router;