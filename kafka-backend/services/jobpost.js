
var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
var {Jobs} = require('../models/jobs');
var { mongoose } = require('../db/mongoose');


function handle_request(msg, callback){
    var res = {};

    var jobid = msg.jobid;
    console.log("MSG in backend", msg);
    

    if(jobid) {
        
        console.log("Inside Job Update");
        console.log("Job Id found",jobid);
        
        Jobs.findOneAndUpdate({
            jobid:jobid,
        }, msg ,function(err,job){
            if (err) {
                res.code = "400";
                res.message = "Could not find Job. Try Again !!";
                res.success = false;
                console.log(res.value);
                callback(null,res); 
               
       
            } else if(job){
                console.log("Job found :",job)
                    res.code= 200;
                    res.success = true;
                    res.jobid = jobid,
                    res.message = 'Job Updated';
                    //res.listing = listing;
                    callback(null,res); 
                
                //res.end(JSON.stringify(user));
                console.log("result JSON .parse is :", job);

            } 
            else{
                res.code = "404";
                res.message = "Could not find Job. Try Again !!";
                console.log(res.value);
                res.success = false;
                callback(null,res); 

            }   
        
        }) 
    }
    else{
           //Randonmly generate an Id and Insert
        console.log("Job id not present , create new job post");
        
        var username = msg.username; 
        var company = msg.company;
        var jobtitle = msg.jobtitle;
        var address = msg.address;
        var jobfunc = msg.jobfunc;
        var emptype = msg.emptype;
        var industry = msg.industry;
        var senlevel = msg.senlevel;
        var jobdes = msg.jobdes;
        var recapp = msg.recapp;
        var source = msg.source;
        var skills = msg.skills;
        var explevel = msg.explevel;
        var edulevel = msg.edulevel;
        var rate = msg.rate;
        var easyapply = msg.easyapply;
        var poststatus = msg.poststatus;
        jobid = Math.random().toString(36).substr(2, 9);
        console.log("jobid : ", jobid);
        job = new Jobs({
            jobid : jobid,
            username : username, 
            company : company,
            jobtitle : jobtitle,
            address : address,
            jobfunc : jobfunc,
            emptype : emptype,
            industry : industry,
            senlevel : senlevel,
            jobdes : jobdes,
            recapp : recapp,
            source : source,
            skills : skills,
            explevel : explevel,
            edulevel: edulevel,
            rate : rate,
            easyapply: easyapply,
            poststatus : poststatus,

           });
            job.save()
            .then((job)=>{
                console.log("Job created : ",job);
                res.code = 200;
                res.success = true;
                res.message = 'Job created ';
                res.jobid = job.jobid ;
                callback(null,res); 
                     
                
            },(error)=>{
                res.code = "404";
                res.message = "Could not create new job. Try Again !!";
                console.log("Error",res.value);
                res.success = false;
                callback(null,res); 
            })
         }


}

exports.handle_request = handle_request;

