var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
var {Jobs} = require('../models/jobs');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback){

  
    var res = {};
 
    console.log("Get job");
    console.log(msg);
    let username = msg.username ;

    Jobs.find({
         username : username, poststatus :{$eq :'active'}
    }, function(err,jobs){
        if (err) {
            res.code = "400";
            res.status = "ERROR";
            res.success = false;
            res.value = "Jobs not found. Try Again !!";
            console.log(res.value);
            callback(null,res);
        } 
        else{
            console.log("Found: ",jobs);
            res.code = '200' ;
            res.status = "SUCCESS";
            res.success = true;
            res.message = "Found jobs";
            res.success = true;
            res.jobs = jobs;
            callback(null,res); 
        }

    })


}
exports.handle_request = handle_request;