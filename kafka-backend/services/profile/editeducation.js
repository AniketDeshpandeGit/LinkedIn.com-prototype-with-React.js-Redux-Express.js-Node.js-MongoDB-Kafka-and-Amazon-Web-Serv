var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback){
   
    var updatedEducation = {};
  
    if (msg.school)
        updatedEducation['education.$.school'] = msg.school;
    if (msg.degree)
        updatedEducation['education.$.degree'] = msg.degree;
    if (msg.field)
        updatedEducation['education.$.field'] = msg.field;
    if (msg.fromYear)
        updatedEducation['education.$.fromYear'] = msg.fromYear;
    if (msg.toYear)
        updatedEducation['education.$.toYear'] = msg.toYear;

    updatedEducation = { $set:  updatedEducation };
     
    users.updateOne({ email: msg.username, "education._id" :msg.id  }, updatedEducation, function (err, response) {
        if (err) {
            console.log(err);
        }
        else if (response) {
      //      req.body.updated = true;
      
        //  console.log("Updated");
        callback(null, "Updated");
  //        res.end("Updated");
        }
        else {

       //     callback(null, false);

        }

    })

    
}

    exports.handle_request = handle_request;