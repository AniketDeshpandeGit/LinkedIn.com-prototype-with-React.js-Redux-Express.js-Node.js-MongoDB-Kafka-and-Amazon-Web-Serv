
var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    users.findOne({ email: msg.username }, { skills: 1 }, function (err, user) {

        if (err) {
            console.log(err);

        } else if (user) {
            console.log(user);
             callback(null,user);
        }
        else {
       //     console.log(req.params.username, " not found");
        }
    }
    )
   

}

    exports.handle_request = handle_request;