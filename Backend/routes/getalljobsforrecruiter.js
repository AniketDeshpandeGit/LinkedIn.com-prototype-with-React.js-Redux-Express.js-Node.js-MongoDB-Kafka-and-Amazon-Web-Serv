var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');


router.get('*', (req,res) => {

    console.log("in getalljobsforrecruiter");
    console.log(req.query);

  
    kafka.make_request('getalljobsforrecruiter', req.query , function(err,result){
        if(err){
            console.log('Inside err of kafka.make_request for getalljobsforrecruiter.');
            res.json({
                status:"ERROR",
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