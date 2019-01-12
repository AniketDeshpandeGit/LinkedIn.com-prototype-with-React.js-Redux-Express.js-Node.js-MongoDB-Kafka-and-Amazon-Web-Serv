var express = require('express');
var router = express.Router();
var user = require('../models/user');
var kafka = require('../kafka/client');


router.post('*', (req,res) => {
    console.log("Request received to create the user: " + req.body.email);
   
   
        kafka.make_request('createuser',req.body, function(err,result){

            console.log('Inside kafka.make_request for createuser.')
            
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