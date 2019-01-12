var mysql = require('mysql');
var pool = require('../pool');
var async = require('async');
function handle_request(msg, callback){

    var res = {};

    let username = msg.username;
    if(username){
        var sql1 = "SELECT jobid, jobtitle,SUM(CASE WHEN appliedmonth = 'January' THEN 1 ELSE 0 END)   as January,SUM(CASE WHEN appliedmonth = 'February' THEN 1 ELSE 0 END) as February, SUM(CASE WHEN appliedmonth = 'March' THEN 1 ELSE 0 END) as March, SUM(CASE WHEN appliedmonth = 'April' THEN 1 ELSE 0 END) as April, SUM(CASE WHEN appliedmonth = 'May' THEN 1 ELSE 0 END) as May, SUM(CASE WHEN appliedmonth = 'June' THEN 1 ELSE 0 END) as June, SUM(CASE WHEN appliedmonth = 'July' THEN 1 ELSE 0 END) as July, SUM(CASE WHEN appliedmonth = 'August' THEN 1 ELSE 0 END) as August, SUM(CASE WHEN appliedmonth = 'September' THEN 1 ELSE 0 END) as September, SUM(CASE WHEN appliedmonth = 'October' THEN 1 ELSE 0 END) as October, SUM(CASE WHEN appliedmonth = 'November' THEN 1 ELSE 0 END) as November, SUM(CASE WHEN appliedmonth = 'December' THEN 1 ELSE 0 END) as December FROM tracking where completed='1' and recruiterid="+mysql.escape(username)+ "group by jobid";
        var sql2 = "select jobid, jobtitle, sum(saves) as saves from tracking where recruiterid = " + mysql.escape(username) + " GROUP BY jobid";   
        var sql3 = "select jobid, jobtitle, sum(completed) as completed, sum(half_filled) as half_filled, sum(onlyread) as onlyread from tracking where recruiterid = " + mysql.escape(username) + " GROUP BY jobid";    
        var sql4 = "SELECT jobid, jobtitle, COUNT(jobid) as count FROM tracking WHERE recruiterid = " + mysql.escape(username) + " GROUP BY tracking.jobid order by count ASC limit 0,5"
        var sql5 = "SELECT location ,SUM(CASE WHEN appliedmonth = 'January' THEN 1 ELSE 0 END)   as January,SUM(CASE WHEN appliedmonth = 'February' THEN 1 ELSE 0 END) as February, SUM(CASE WHEN appliedmonth = 'March' THEN 1 ELSE 0 END) as March, SUM(CASE WHEN appliedmonth = 'April' THEN 1 ELSE 0 END) as April, SUM(CASE WHEN appliedmonth = 'May' THEN 1 ELSE 0 END) as May, SUM(CASE WHEN appliedmonth = 'June' THEN 1 ELSE 0 END) as June, SUM(CASE WHEN appliedmonth = 'July' THEN 1 ELSE 0 END) as July, SUM(CASE WHEN appliedmonth = 'August' THEN 1 ELSE 0 END) as August, SUM(CASE WHEN appliedmonth = 'September' THEN 1 ELSE 0 END) as September, SUM(CASE WHEN appliedmonth = 'October' THEN 1 ELSE 0 END) as October, SUM(CASE WHEN appliedmonth = 'November' THEN 1 ELSE 0 END) as November, SUM(CASE WHEN appliedmonth = 'December' THEN 1 ELSE 0 END) as December FROM tracking where completed='1' and recruiterid="+mysql.escape(username)+ "group by location";
        var sql6 = "select jobid, jobtitle, sum(clicks) as Clicks from tracking where recruiterid = " + mysql.escape(username) + " GROUP BY jobid";
        pool.getConnection(function(err,con){
            
            async.parallel([
                function(callback) {
                    con.query(sql1, function(err, done) {
                            callback(err, done);
                        }
                    );                 
                },
        
                function(callback) {
                    con.query(sql2, function(err, done) {
                            callback(err, done);
                        }
                    );                
                },
                function(callback) {
                    con.query(sql3, function(err, done) {
                            callback(err, done);
                        }
                    );                
                },
                function(callback) {
                    con.query(sql4, function(err, done) {
                            callback(err, done);
                        }
                    );                
                },
                function(callback) {
                    con.query(sql5, function(err, done) {
                            callback(err, done);
                        }
                    );                
                },
                function(callback) {
                    con.query(sql6, function(err, done) {
                            callback(err, done);
                        }
                    );                
                }
    
            ], function(err, results) {
                con.release();
                if(err){
                    console.log(err);
                    res.code = 400,
                    res.message = 'sql exception';
                    res.success = false;
                    callback(null,res);
                
                }
                else{
                   var result = JSON.parse(JSON.stringify(results));
                    
                    console.log('queries finished', result);
                    console.log(err);
                    res.code = 200,
                    res.message = 'sql query successful';
                    res.success = true;
                    res.result = result;
                    callback(null,res); 
                } 
                
          
                
            });
        })


    }else
    {
        console.log("User not logged in", username);
        res.code = 404,
        res.message = 'user not logged in';
        res.success = false;
        callback(null,res);

    }
    



}
exports.handle_request = handle_request;