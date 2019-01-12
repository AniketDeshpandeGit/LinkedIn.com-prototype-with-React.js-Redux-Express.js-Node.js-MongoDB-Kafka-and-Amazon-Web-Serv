var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
var {Jobs} = require('../models/jobs');
var { mongoose } = require('../db/mongoose');
var mysql = require('mysql');
// var {mysql} = require('../pool');
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
    //console.log("Database connection successfull!");
});
function handle_request(msg, callback){
    var res = {};

    var jobid = msg.applicant_id;
    console.log("MSG in backend", msg);
    // let sql = 'INSERT INTO profile_views SET ?';
    // let newstudent = {
    //     user_id:jobid,
    //     count:1,
    // }
    var sqlcheck="SELECT count FROM `profile_views` WHERE user_id =" + mysql.escape(jobid);
    dbconnection.query(sqlcheck, function (err, result) {

        if (err) {
          
            console.log(err);
            //res.redirect('home');

        }
        else {
            console.log("in else");
            console.log(result.length);
            if(result.length==0)
            {
                var sql = "INSERT INTO `profile_views` ( `user_id`, `count` ) VALUES  (" + mysql.escape(jobid) + "," + mysql.escape(1) + ")";
                dbconnection.query(sql, function (err, result1) {

                    if (err) {
                    
                        console.log(err);
                        //res.redirect('home');

                    }
                    else {
                        console.log("in else");
                        //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    
                        // res.end("Successful Login");
                    }
                })

            }
            else
            {
                const resdata=JSON.stringify(result);
                var json =  JSON.parse(resdata);
               // var sql = "INSERT INTO `profile_views` ( `user_id`, `count` ) VALUES  (" + mysql.escape(jobid) + "," + mysql.escape(json[0].count+1) + ")";
               var sql="UPDATE `profile_views` SET `count` = " + mysql.escape(json[0].count+1) + " WHERE `user_id` = "+  mysql.escape(jobid);
               dbconnection.query(sql, function (err, result1) {

                    if (err) {
                    
                        console.log(err);
                        //res.redirect('home');

                    }
                    else {
                        console.log("in else");
                        //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    
                        // res.end("Successful Login");
                    }
                })
            }
           
            //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
           
            // res.end("Successful Login");
        }
    })
    // var sql = "INSERT INTO `profile_views` ( `user_id`, `count` ) VALUES  (" + mysql.escape(jobid) + "," + mysql.escape(1) + ")";
    // dbconnection.query(sql, function (err, result) {

    //     if (err) {
          
    //         console.log(err);
    //         //res.redirect('home');

    //     }
    //     else {
    //         console.log("in else");
    //         //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
           
    //         // res.end("Successful Login");
    //     }
    // })
   
    callback(null,res);
}

exports.handle_request = handle_request;

