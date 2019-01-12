var crypt = require("../crypt");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require("../settings");
var { connections } = require("../models/connections");
var { mongoose } = require("../db/mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("Get Connections");
  console.log(msg);
  let receiveremail = msg.receiveremail;

  connections.find(
    {
      receiveremail: receiveremail
    },
    function(err, conn) {
      console.log("Inside Function Connections", conn);
      if (err) {
        res.code = "400";
        res.value = "Jobs not found. Try Again !!";
        console.log(res.value);
        callback(null, res);
      } else if (conn[0]) {
        console.log("people in if: ", conn);
        res.code = 200;
        res.conn = conn;
        res.message = "Jobs in Draft found";
        res.success = true;

        callback(null, res);
      } else {
        console.log("people in else: ", conn);
        res.code = 404;
        res.message = "No Connection Requests found";
        res.success = false;
        callback(null, res);
      }
    }
  );
}

exports.handle_request = handle_request;
