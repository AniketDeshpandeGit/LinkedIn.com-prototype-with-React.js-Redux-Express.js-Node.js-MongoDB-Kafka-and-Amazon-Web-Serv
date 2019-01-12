var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('*', function(req,res,next){
    
    console.log("Inside get graphdata");
    kafka.make_request('graphdata', req.query , function(err,results){
        if (err){
            console.log("Inside err");
            res.status(404).json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            if(results){   
            console.log('in result',results.message);
            console.log("results after 3 sqls together:",results.result);
            //console.log("Inside else",results );                
            res.status(200).json({
                results :results.result,
                message:results.message,
                success: results.success,
                    
            });

                res.end("Graph data fetch Successful");

        }
            
    }
        
});

 
    
     console.log("Going out of Get Graph");
})

module.exports = router;