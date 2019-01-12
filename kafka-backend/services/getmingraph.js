
var { mongoose } = require('../db/mongoose');
var { applications } = require('../models/applications');


var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("Inside getmingraph kafka backend");
 

    applications.aggregate( [{$match: {recruiterid : msg.username}},{$group : {_id : {jobid : "$jobid",jobtitle: "$jobtitle"}, count:{$sum:1}} }, {$sort : {"count": 1}}, {$limit : 5}], function (err, result) {

        if (err) {
                 console.log(err);
                
             } else if (result) {
                
                console.log(result);
            callback(null, result);
             }
             else {
                 console.log(" not found");
             }
         })
   

}

    exports.handle_request = handle_request;