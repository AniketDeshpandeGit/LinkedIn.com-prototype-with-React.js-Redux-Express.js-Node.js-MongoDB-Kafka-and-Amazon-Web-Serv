var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback) {
console.log(msg);
    var updatedIntro = {};
    if (msg.firstName)
        updatedIntro.firstName = msg.firstName;
    if (msg.lastName)
        updatedIntro.lastName = msg.lastName;
    if (msg.contact)
        updatedIntro.contact = msg.contact;
    if (msg.industry)
        updatedIntro.industry = msg.industry;
    if (msg.location)
        updatedIntro.location = msg.location;
    if (msg.address)
        updatedIntro.address = msg.address;
    if (msg.city)
        updatedIntro.city = msg.city;
    if (msg.zipcode)
        updatedIntro.zipcode = msg.zipcode;
    if (msg.userstate)
        updatedIntro.userstate = msg.userstate;
    if (msg.current_position)
        updatedIntro.current_position = msg.current_position;
    if (msg.profile_summary)
        updatedIntro.profile_summary = msg.profile_summary;
        if (msg.headline)
        updatedIntro.headline = msg.headline;

        // updatedIntro.image=true;
    
    updatedIntro = { $set: updatedIntro };

    console.log(updatedIntro);
    users.updateOne({ email: msg.username }, updatedIntro, function (err, response) {

        if (err) {
            console.log(err);

        }
        else if (response) {

            msg.updated = true;
            callback(null, msg);
            //   console.log(req.body);
            //   res.end(JSON.stringify(req.body));
        }
        else {



        }

    })

}

exports.handle_request = handle_request;