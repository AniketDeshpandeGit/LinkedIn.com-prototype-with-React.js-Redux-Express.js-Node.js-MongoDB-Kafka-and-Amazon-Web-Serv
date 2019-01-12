var express = require('express');
var router = express.Router();

var kafka = require('../kafka/client');

router.post('*', (req, res, next) => {
 
    console.log("Inside Job Update/Create");
    kafka.make_request('jobpost', req.body , function(err,results){
        
        if (err){
            console.log("Inside err");
            res.status(404).json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            if(results){   
            console.log('in result');
            console.log(results);
            console.log("Inside else");                
            res.status(results.code).json({
                message:results.message,
                success: results.success,
                jobid : results.jobid    
            });

            res.end("Job Update/Create Successful");

        }
            
    }
})  
console.log("out of job post handler") 
    
})

module.exports = router;