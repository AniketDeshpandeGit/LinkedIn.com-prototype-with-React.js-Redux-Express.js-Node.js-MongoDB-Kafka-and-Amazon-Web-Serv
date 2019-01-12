var crypt = require("../crypt");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require("../settings");
var { connections } = require("../models/connections");
var { mongoose } = require("../db/mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("Get Connection Requests Kafka BackEnd");
  console.log(msg);
  let receiveremail = msg.receiveremail;

  connections.find(
    {
      receiveremail: receiveremail
    },
    function(err, connReq) {
      console.log("inside mongo Function ", connReq);
      if (err) {
        res.code = "400";
        res.value = "Jobs not found. Try Again !!";
        console.log(res.value);
        callback(null, res);
      } else if (connReq[0]) {
        console.log("connReq in if: ", connReq);
        res.code = 200;
        res.connReq = connReq;
        res.message = "connReq in Draft found";
        res.success = true;

        callback(null, res);
      } else {
        console.log("connReq in else: ", connReq);
        res.code = 404;
        res.message = "No Connection Requests found";
        res.success = false;
        callback(null, res);
      }
    }
  );
}

exports.handle_request = handle_request;
