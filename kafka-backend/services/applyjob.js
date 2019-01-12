
var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
// var {applyjobs} = require('../models/applyjob');
var {test} = require('../models/applications');
var { mongoose } = require('../db/mongoose');

var applyjob = mongoose.Schema({
    jobid :{
        type : String
    },
    jobtitle :{
        type : String
    },
    applicantid : {
	   type : String
    },
    recruiterid : {
        type : String
    },
    company : {
        type : String
    },
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    jobidgenerated : {
        type : String
    },
    phoneno : {
        type : String
    },
    typeofapply : {
        type : String
    },
    address : {
        type : String
    },
    applicantaddress: {
        type : String
    },
    applicantcity: {
        type : String
    },
    applicantdisability: {
        type : String
    },
    applicantrace: {
        type : String
    },
    applicantstate: {
        type : String
    },
    applicantzipcode: {
        type : String
    },
    gender: {
        type : String
    },
    hearabout: {
        type : String
    },
    phoneno: {
        type : String
    },
    source:{
        type : String
    },

});


function handle_request(msg, callback){
    var res = {};

  
        console.log("in kafka applyjob");
        console.log(msg);

        if(msg.jobid==='' || msg.email==='' || msg.firstname==='')
        {
            console.log("in if")
            res.code    = '404';
            res.status  = 'ERROR';
            res.message = 'Empty Submit. Please add data';
            callback(null, res);
        }
        else{
            if(msg.easy_apply=='true')
            {
                var newapply ={
                    jobid :msg.jobid,
                    jobtitle :msg.jobtitle,
                    applicantid :msg.email,
                    recruiterid :msg.recruiterid ,
                    company :msg.company ,
                    firstname :msg.firstname ,
                    lastname :msg.lastname ,
                    jobidgenerated :msg._id ,
                    phoneno :msg.phoneno ,
                    typeofapply :msg.easy_apply,
                    address:msg.address,
                    applicantaddress: null,
                    applicantcity: null,
                    applicantdisability: null,
                    applicantrace:null,
                    applicantstate: null,
                    applicantzipcode: null,
                    gender: null,
                    hearabout: null,
                    source:null
                };
            }
            else{
                var newapply ={
                    jobid :msg.jobid,
                    jobtitle :msg.jobtitle,
                    applicantid :msg.email,
                    recruiterid :msg.recruiterid ,
                    company :msg.company ,
                    firstname :msg.firstname ,
                    lastname :msg.lastname ,
                    jobidgenerated :msg._id ,
                    phoneno :msg.phoneno ,
                    typeofapply :msg.easy_apply,
                    address:msg.address,
                    applicantaddress: msg.applicantaddress,
                    applicantcity: msg.applicantcity,
                    applicantdisability: msg.applicantdisability,
                    applicantrace:msg.applicantrace,
                    applicantstate: msg.applicantstate,
                    applicantzipcode: msg.applicantzipcode,
                    gender: msg.gender,
                    hearabout: msg.hearabout,
                    phoneno: msg.phoneno,
                    source:msg.source

                };
            }
            console.log(newapply)


            var db=mongoose.connection;
            //console.log(db)
            db.collection("applyjob").find({jobid:msg.jobid,applicantid:msg.email}).toArray(function(err, people) {
             if (err) {
                 res.code = "400";
                 res.value = "Error in search. Try Again !!";
                 console.log(res.value);
                 callback(null,res);
             } else if(people[0]){
                 console.log("people in if: ",people);
                     res.code = 404 ;
                     res.people = people;
                     res.message = "Already applied to the job";
                     res.success = true;
         
                     callback(null,res);
             }
             else{
                var apply=mongoose.model('applyjob',applyjob,'applyjob');
                var applynew=new apply(newapply);
                applynew.save(function(err,result){
                    if(err){

                        res.code    = '400';
                        res.status  = 'ERROR';
                        res.message = 'Could not add job application. Please try again later.';
                        callback(null, res);
                    }
                    else{

                        console.log("Successfuly created the job application in db!");
                        res.code    =  '200';
                        res.status  = 'SUCCESS';
                        res.message = 'Job application successfully added. ';
                        callback(null, res);
                    }; 
                });

             }
            });

                
        }
  
        

}

exports.handle_request = handle_request;

