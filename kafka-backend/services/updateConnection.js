var { mongoose } = require("../db/mongoose");
var { connections } = require("../models/connections");
var bcrypt = require("bcrypt-nodejs");

function handle_request(msg, callback) {
  console.log("Connections Message: ", msg);
  var updatedConnection = {};
  if (msg.connectionstatus)
    updatedConnection.connectionstatus = msg.connectionstatus;

  // updatedConnection.image=true;

  updatedConnection = { $set: updatedConnection };

  console.log(updatedConnection);
  connections.updateOne(
    { receiveremail: msg.receiveremail, senderid: msg.senderid },
    updatedConnection,
    function(err, response) {
      if (err) {
        console.log(err);
      } else if (response) {
        msg.updated = true;
        callback(null, msg);
        //   console.log(req.body);
        //   res.end(JSON.stringify(req.body));
      } else {
      }
    }
  );
}

exports.handle_request = handle_request;
