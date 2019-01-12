var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('*', (req, res) => {

    console.log("in send connection");
    console.log(req);

    kafka.make_request('makeconnection', req.body, function (err, results) {

        if (err) {
            console.log("Inside err");
            res.status(404).json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
          
            if (results) {
                console.log('in result');
                console.log(results);
                console.log("Inside else");
                console.log(results.code);
                res.status(results.code).json({
                    connection: results.connection,
                    message: results.message,
                    success: results.success,

                });

                res.end("connection successful");
            }
        }

    });

    console.log("Going out of get connection");

});
module.exports = router;