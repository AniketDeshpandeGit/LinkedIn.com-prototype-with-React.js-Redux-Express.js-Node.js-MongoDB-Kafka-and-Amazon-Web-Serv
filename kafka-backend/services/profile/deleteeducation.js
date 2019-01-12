var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback){
    var deleteEducation = {};
    var deleteEduID ={};
    deleteEduID["_id"] = msg.id;
    deleteEducation["education"] = deleteEduID;
    deleteEducation = {$pull : deleteEducation};
    console.log(deleteEducation);
      users.updateOne({email : msg.username, "education._id" : msg.id }, deleteEducation  , function (err, response){
              console.log("Enterting Update");
             
              if(err)
              {
                  console.log(err);
              }
              else if(response)
              {
                 // console.log(response);
                 // res.end();
                 callback(null, response);
              }
             
              else
              {
                  console.log("No response");
              }
          }) 

    
}

    exports.handle_request = handle_request;