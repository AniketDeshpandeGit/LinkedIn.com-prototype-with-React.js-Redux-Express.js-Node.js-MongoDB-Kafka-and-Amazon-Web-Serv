var {users}         = require('../models/user');
var { mongoose }    = require('../db/mongoose');
var bcrypt          = require('bcrypt');
var jwt             = require('jsonwebtoken'); 
var config          = require('../settings');

function handle_request(msg, callback){

    console.log('Inside handle_request for loginuser topic.');
    console.log('Login user information: ' + JSON.stringify(msg));

    var res         =   {}
    var email       =   msg.email;
    var password    =   msg.password;

    users.findOne({email: email}, (err, userinfo) =>{

        if(err) throw err;
        if(!userinfo){
            console.log("User not found");
            // res.status(200).send({success: false, status: "ERROR", message:"User not found"});
            res.code    = '200';
            res.status  = 'ERROR';
            res.success =  false;
            res.message =  'User not found'; 
            callback(null, res);
        }
        else{
           
            pwdFromDB = userinfo.password
            bcrypt.compare(password, pwdFromDB, (err, isMatch) =>{

                console.log('Inside bcrypt.compare for :' + email)

                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign(userinfo.toJSON(), config.secret,{
                        expiresIn: 24*60*60
                    });
                    console.log("Found the user in DB!");

                    res.code    = '200';
                    res.status  = 'SUCCESS';
                    res.success =  true;
                    res.token   =  token;
                    res.user    =  {
                            name       : userinfo.firstName + ' ' + userinfo.lastName,
                            email      : userinfo.email,
                            user_type  : userinfo.user_type,
                            headline   : userinfo.headline,
                    } 
                    callback(null, res);
                }
                else{
                    console.log("Wrong Password!");
                    res.code    = '200';
                    res.success = false;
                    res.status  = 'ERROR';
                    res.message = 'You entered a wrong password!'
                    callback(null, res);    
                }
        });

        }
        
    })
    
    
}

exports.handle_request = handle_request;