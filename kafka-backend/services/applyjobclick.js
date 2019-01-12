var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
var {Jobs} = require('../models/jobs');
var { mongoose } = require('../db/mongoose');
var mysql = require('mysql');
const connect = require('../pool');


// mysql.connect(function(err){
//     if(err) throw err;
//     console.log("connected");
// })

var dbconnection = mysql.createConnection({
    host: 'projectli-instance.cz8fkapsud6o.us-east-2.rds.amazonaws.com',
    user: "admin",
    password: "admin123",
    database: "projectli"
})

dbconnection.connect(function (err) {
    if (err) throw err;
    console.log("Database connection successfull!");
});
function handle_request(msg, callback){
    var res = {};

   
    console.log("MSG in backend", msg);
    let applicantid=msg.email;
    let recruterid=msg.recruiterid;
    let jobtitile=msg.jobtitile;
    let jobid=msg.jobid;
    console.log(jobid);
    var sqlcheck="SELECT * FROM `tracking` WHERE jobid =" + mysql.escape(jobid) +" AND applicantid ="+mysql.escape(applicantid);
    dbconnection.query(sqlcheck, function (err, result) {

        if (err) {
          
            console.log(err);
            //res.redirect('home');

        }
        else {
            console.log("in else");
            console.log(result.length);
            if(result.length!==0)
            {
                
                const resdata=JSON.stringify(result);
                var json =  JSON.parse(resdata);
                console.log(json)
                var clicksadd=Number(json[0].clicks)+1;
                var sql = "UPDATE `tracking` SET `completed` = " + mysql.escape(1) + ", `clicks` ="+ mysql.escape(clicksadd) + " WHERE `jobid` = "+  mysql.escape(jobid);
                dbconnection.query(sql, function (err, result1) {

                    if (err) {
                    
                        console.log(err);
                        //res.redirect('home');

                    }
                    else {
                        console.log("in else");
                        callback(null,res);
                        //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    
                        // res.end("Successful Login");
                    }
                })

            }
            else
            {
                callback(null,res);
                
            }
           
            //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
           
            // res.end("Successful Login");
        }
    })

   
 
   
    // callback(null,res);
}

exports.handle_request = handle_request;

