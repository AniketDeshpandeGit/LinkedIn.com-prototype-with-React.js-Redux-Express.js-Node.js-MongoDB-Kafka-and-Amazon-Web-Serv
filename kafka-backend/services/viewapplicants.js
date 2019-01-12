var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
var {users} = require('../models/user');

var { mongoose } = require('../db/mongoose');
function handle_request(msg, callback) {

    var res = {};
    console.log("Get people");
    console.log(msg);
    let email = msg.email;
    console.log(email)
  
   var db=mongoose.connection;
   //console.log(db)
   db.collection("applyjob").find({recruiterid:email}).toArray(function(err, people) {
    if (err) {
        res.code = "400";
        res.value = "Jobs not found. Try Again !!";
        console.log(res.value);
        callback(null,res);
    } else if(people[0]){
        console.log("people in if: ",people);
            res.code = 200 ;
            res.people = people;
            res.message = "Jobs in Draft found";
            res.success = true;

            callback(null,res);
    }
    else{
           console.log("people in else: ",people);
            res.code = 404 ;
            res.message = "no Jobs found";
            res.success = false;
            callback(null,res);
    }
   });

    

}

exports.handle_request = handle_request;