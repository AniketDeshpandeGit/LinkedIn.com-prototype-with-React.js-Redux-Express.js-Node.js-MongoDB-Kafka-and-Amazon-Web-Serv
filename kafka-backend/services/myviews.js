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

    var jobid = msg.personname;
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
            var resultnew = JSON.parse(JSON.stringify(result));
            if(result.length==1)
            {
                // const resdata=JSON.stringify(result);
                // var json =  JSON.parse(resdata);
                res.code = 200 ;
                res.people = resultnew[0].count;
                res.message = "Count Found";
                res.success = true;
                console.log(res)
                callback(null,res);

            }
            else
            {
                res.code = 404 ;
                res.message = "Count not foundfound";
                res.success = true;
                callback(null,res);
            }
           
       
        }
    })
   
   
    //callback(null,res);
}

exports.handle_request = handle_request;

