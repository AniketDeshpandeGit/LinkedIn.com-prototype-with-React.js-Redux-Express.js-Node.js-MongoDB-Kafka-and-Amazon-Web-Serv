
var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){
    console.log("Message: ", msg);
    users.updateOne({ email:msg.username },{$addToSet : {skills: msg.skills} }, function (err, response) {
           console.log(msg.skills);
        if (err) {
            console.log(err);

        }
        else if (response) {
            console.log(response);
            console.log("Profile Updated");
            callback(null, "Updated");
           // res.end("Updated");
        }
        else {

           // callback(null, false);

        }

    })
   

}

    exports.handle_request = handle_request;