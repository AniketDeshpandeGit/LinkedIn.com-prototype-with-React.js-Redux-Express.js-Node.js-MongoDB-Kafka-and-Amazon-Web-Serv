var express = require('express');
var router = express.Router();
var { mongoose } = require('../db/mongoose');

var kafka = require('../kafka/client');


router.get('/:username', function (req, res) {
    kafka.make_request('getmingraph',req.params, function(err,response){
        
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });  
            res.end(JSON.stringify(response));
        }
        else
        {
            console.log("No response");
        }
       
    })
   
    })
    module.exports = router;