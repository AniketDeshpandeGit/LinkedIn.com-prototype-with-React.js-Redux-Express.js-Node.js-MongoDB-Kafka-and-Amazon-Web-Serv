
 var { mongoose } = require('../../db/mongoose');
 var { users } = require('../../models/user');


// var bcrypt = require('bcrypt-nodejs');

// function handle_request(msg, callback){

//     console.log("Inside getprofile kafka backend");
//     console.log("Profile Information: ", msg);
//     users.findOne({ username: msg.username }, function (err, user) {
//         console.log("Finding user");
//         if (err) {
//             console.log(err);
           
//         } else if (user) {
//             console.log(user);
//             callback(null, user);
//         }
//         else {
//             console.log(msg.username, " not found");
//         }
//     }
//     )
   

// }

//     exports.handle_request = handle_request;



var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback){
   
    users.findOne({ email: msg.username }, { experience: 1 }, function (err, user) {

        if (err) {
            console.log(err);

        } else if (user) {
            callback(null,user);
        }
        else {
            console.log(msg.username, " not found");
        }
    }
    )
  

}

    exports.handle_request = handle_request;