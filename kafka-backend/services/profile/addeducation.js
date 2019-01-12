var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback){
   
    users.updateOne({ email: msg.username }, { $addToSet: { education: { school: msg.school, degree: msg.degree, field: msg.field, fromYear: msg.fromYear, toYear: msg.toYear } } }, function (err, response) {

        if (err) {
            console.log(err);
        }
        else if (response) {
            callback(null, response);
        }
        
    })
}

    exports.handle_request = handle_request;