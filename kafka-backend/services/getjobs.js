var crypt = require("../crypt");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require("../settings");
var { Jobs } = require("../models/jobs");
var { mongoose } = require("../db/mongoose");

function handle_request(msg, callback) {
  var res = {};

  console.log("Get job");
  console.log(msg);
  let jobtitle = msg.jobdesc;
  let address = msg.joblocation;
  let emptype = msg.jobtype;
  let jobapplytype = msg.jobapplytype;

  if (
    jobtitle === "" &&
    address === "" &&
    emptype === "null" &&
    jobapplytype === "null"
  ) {
    console.log("error pathvu");
  } else if (emptype === "null" && jobapplytype === "null") {
    Jobs.find(
      {
        address: address,
        jobtitle: jobtitle
      },
      function(err, job) {
        if (err) {
          res.code = "400";
          res.value = "Jobs not found. Try Again !!";
          console.log(res.value);
          callback(null, res);
        } else if (job[0]) {
          console.log("Job in if: ", job);
          res.code = 200;
          res.job = job;
          res.message = "Jobs in Draft found";
          res.success = true;
          callback(null, res);
        } else {
          console.log("Job in else: ", job);
          res.code = 404;
          res.message = "no Jobs found";
          res.success = false;
          callback(null, res);
        }
      }
    );
  } else if (emptype === "null") {
    Jobs.find(
      {
        address: address,
        jobtitle: jobtitle,
        easyapply: jobapplytype
      },
      function(err, job) {
        if (err) {
          res.code = "400";
          res.value = "Jobs not found. Try Again !!";
          console.log(res.value);
          callback(null, res);
        } else if (job[0]) {
          console.log("Job in if: ", job);
          res.code = 200;
          res.job = job;
          res.message = "Jobs in Draft found";
          res.success = true;
          callback(null, res);
        } else {
          console.log("Job in else: ", job);
          res.code = 404;
          res.message = "no Jobs found";
          res.success = false;
          callback(null, res);
        }
      }
    );
  } else if (jobapplytype === "null") {
    Jobs.find(
      {
        address: address,
        jobtitle: jobtitle,
        senlevel: emptype
      },
      function(err, job) {
        if (err) {
          res.code = "400";
          res.value = "Jobs not found. Try Again !!";
          console.log(res.value);
          callback(null, res);
        } else if (job[0]) {
          console.log("Job in if: ", job);
          res.code = 200;
          res.job = job;
          res.message = "Jobs in Draft found";
          res.success = true;
          callback(null, res);
        } else {
          console.log("Job in else: ", job);
          res.code = 404;
          res.message = "no Jobs found";
          res.success = false;
          callback(null, res);
        }
      }
    );
  } else {
    Jobs.find(
      {
        address: address,
        jobtitle: jobtitle,
        senlevel: emptype,
        easyapply: jobapplytype
      },
      function(err, job) {
        if (err) {
          res.code = "400";
          res.value = "Jobs not found. Try Again !!";
          console.log(res.value);
          callback(null, res);
        } else if (job[0]) {
          console.log("Job in if: ", job);
          res.code = 200;
          res.job = job;
          res.message = "Jobs in Draft found";
          res.success = true;
          callback(null, res);
        } else {
          console.log("Job in else: ", job);
          res.code = 404;
          res.message = "no Jobs found";
          res.success = false;
          callback(null, res);
        }
      }
    );
  }

  // Jobs.find({
  //      address:address
  // }, function(err,job){
  //     if (err) {
  //         res.code = "400";
  //         res.value = "Jobs not found. Try Again !!";
  //         console.log(res.value);
  //         callback(null,res);
  //     } else if(job[0]){
  //         console.log("Job in if: ",job);
  //             res.code = 200 ;
  //             res.job = job;
  //             res.message = "Jobs in Draft found";
  //             res.success = true;
  //             callback(null,res);

  //     }
  //     else{
  //            console.log("Job in else: ",job);
  //             res.code = 404 ;
  //             res.message = "no Jobs found";
  //             res.success = false;
  //             callback(null,res);

  //     }

  // })
}
exports.handle_request = handle_request;
