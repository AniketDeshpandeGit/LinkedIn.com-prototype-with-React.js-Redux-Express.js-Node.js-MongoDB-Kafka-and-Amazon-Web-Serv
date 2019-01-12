var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');


router.get('*',  function(req,res, next){
    
    console.log("Inside recruiter get request");
    kafka.make_request('getjobpost', req.query , function(err,results){
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
                job:results.job,
                message:results.message,
                success: results.success,
                    
            });

                res.end("Job Post Search Successful");

        }
            
    }
        
});
   
console.log("Going out of get Job ");
})

module.exports = router;