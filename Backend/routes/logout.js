var express = require('express');
var router = express.Router();


//handle logout and destroy the session
router.post('*', function(req,res){    
    console.log("Logging out now")
    res.status(200).send({auth: true, status: "SUCCESS", message: "You have been logged out"});
});

module.exports = router;