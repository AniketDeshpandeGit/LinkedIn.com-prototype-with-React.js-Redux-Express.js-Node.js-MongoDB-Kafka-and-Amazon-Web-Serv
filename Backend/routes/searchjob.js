var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');


router.get('*', (req,res) => {

    console.log("in searchjob");
    console.log(req.query);

  
    kafka.make_request('getjobs', req.query , function(err,results){
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
   




 });
    
    
module.exports = router;