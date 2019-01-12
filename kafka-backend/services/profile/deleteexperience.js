var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback){
      
  var deleteExperience = {};
  var deleteExpID ={};
  deleteExpID["_id"] = msg.id;
  deleteExperience["experience"] = deleteExpID;
  deleteExperience = {$pull : deleteExperience};
  console.log(deleteExperience);
    users.updateOne({email : msg.username, "experience._id" : msg.id }, deleteExperience  , function (err, response){
            console.log("Enterting Update");
           
            if(err)
            {
                console.log(err);
            }
            else if(response)
            {
                callback(null,response);
                //res.end();
               // console.log(response);
            }
           
            else
            {
                
            }
        } 
    )
   

    
}

    exports.handle_request = handle_request;