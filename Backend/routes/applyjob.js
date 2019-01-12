var express = require('express');
var router = express.Router();
var user = require('../models/user');
var kafka = require('../kafka/client');


router.post('*', (req,res) => {
    //console.log("request jobs")
    //console.log(req);
   
   
        kafka.make_request('applyjob',req.body, function(err,result){

            console.log('Inside kafka.make_request for applyjob.')
            console.log(result);
            if(err){
                console.log('Inside err of kafka.make_request.');
                res.status(404).json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }
            else if(result){
                console.log('Response from kafka-backend: ' + JSON.stringify(result));
                console.log(result.code)
                if(result.code=='200')
                {
                    res.status(200).send(JSON.stringify(result));
                }
                else{
                    console.log(result.code)
                    res.status(result.code).send({statusCode:result.code,status:"error",
                    msg:result.message});
                }
               
            }       
        });
    });
    

module.exports = router;