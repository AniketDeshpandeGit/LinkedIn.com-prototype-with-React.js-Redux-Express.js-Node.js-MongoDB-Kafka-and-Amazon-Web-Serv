
var { mongoose } = require('../../db/mongoose');
var { users } = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){
    console.log("Deleting Skill" , msg);
    var deleteSkill = {};
    var deleteEduID ={};
  //  deleteEduID["_id"] = req.body.id;
    deleteSkill["skills"] = msg.skill;
    deleteSkill = {$pull : deleteSkill};
    console.log(deleteSkill);

  
    users.updateOne({email : msg.username }, deleteSkill  , function (err, response){
        console.log("Enterting Update");
       
        if(err)
        {
            console.log(err);
        }
        else if(response)
        {
            console.log(response);
            
        callback(null,response);
        }
       
        else
        {
            console.log("No response");
        }
    }) 

}

    exports.handle_request = handle_request;