var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('*', (req, res) => {

    console.log("in myviews");
    console.log(req.query);

    kafka.make_request('myviews', req.query, function (err, results) {

        if (err) {
            console.log("Inside err");
            res.status(404).json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
          
            if (results) {
                console.log('in result here');
                console.log(results);
               // console.log("Inside else");
               // console.log(results.people[0].count);
                res.status(200).json({
                    people: results.people,
                    message: results.message,
                    success: results.success,

                });

                res.end("Views Search Successful");

            }
        }

    });

    console.log("Going out of get people");

});
module.exports = router;