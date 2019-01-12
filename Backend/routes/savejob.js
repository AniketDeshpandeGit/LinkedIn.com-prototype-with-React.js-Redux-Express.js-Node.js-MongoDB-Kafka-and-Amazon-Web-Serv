var express = require('express');
var router = express.Router();
var user = require('../models/user');
var kafka = require('../kafka/client');


router.post('*', (req,res) => {
    //console.log("request jobs")
    //console.log(req);
   
   
        kafka.make_request('savejob',req.body, function(err,result){

            console.log('Inside kafka.make_request for savejob.')
            console.log(result);
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