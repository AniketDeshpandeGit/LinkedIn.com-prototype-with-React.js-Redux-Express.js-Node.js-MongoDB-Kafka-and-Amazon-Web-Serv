var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback){
   
    var updatedExperience = {};
  
    if (msg.title)
    updatedExperience['experience.$.title'] = msg.title;
    if (msg.location)
    updatedExperience['experience.$.location'] = msg.location;
    if (msg.company)
    updatedExperience['experience.$.company'] = msg.company;
    if (msg.fromYear)
    updatedExperience['experience.$.fromYear'] = msg.fromYear;
    if (msg.toYear)
    updatedExperience['experience.$.toYear'] = msg.toYear;

    if (msg.fromMonth)
    updatedExperience['experience.$.fromMonth'] = msg.fromMonth;
    if (msg.toMonth)
    updatedExperience['experience.$.toMonth'] = msg.toMonth;

    updatedExperience = { $set:  updatedExperience };
     
    users.updateOne({ email: msg.username, "experience._id" :msg.id  }, updatedExperience, function (err, response) {
        if (err) {
            console.log(err);
        }
        else if (response) {
            msg.updated = true;
      
          console.log("Updated");
          callback(null,msg);
        }
        else {

            callback(null, false);

        }

    })

    
}

    exports.handle_request = handle_request;