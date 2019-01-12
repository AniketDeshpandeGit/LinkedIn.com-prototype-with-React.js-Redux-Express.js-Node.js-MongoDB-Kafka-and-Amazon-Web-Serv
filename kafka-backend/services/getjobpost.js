var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
var {Jobs} = require('../models/jobs');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback){

    var res = {};

    let username = msg.username;
    console.log("Inside get Job", username);
    Jobs.find({
        username:username , poststatus :{$eq :'draft'}
    }, function(err,job){
        
       if (err) {
           res.code = "400";
           res.value = "Jobs not found. Try Again !!";
           console.log(res.value);
           callback(null,res);
       } else if(job[0]){
           console.log("Job : ",job);
               res.code = 200 ;
               res.job = job[0];
               res.message = "Jobs in Draft found";
               res.success = true;
               callback(null,res);
           
       }
       else{
              console.log("Job : ",job);
               res.code = 404 ;
               res.message = "no Jobs found";
               res.success = false;
               callback(null,res);
           
           
       }
    })
    console.log("Outside get Job");
}
exports.handle_request = handle_request;