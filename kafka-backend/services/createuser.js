var {users}         = require('../models/user');
var { mongoose }    = require('../db/mongoose');
var bcrypt          = require('bcrypt');
const saltRounds    = 12;


function handle_request(msg, callback){

    console.log('Inside handle_request for createuser topic.');
    console.log('Sign Up user information: ' + JSON.stringify(msg));

    var res     = {}
    var email   = msg.email;
    var re      = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(!re.test(String(email).toLowerCase())){

        res.code    = '200';
        res.status  = 'ERROR';
        res.message = 'Invalid Email Format';
        callback(null, res);
    }
    else if(msg.firstname === "" || msg.lastname === "" || msg.password === ""){

        res.code    = '200';
        res.status  = 'ERROR';
        res.message = 'All input fields are required.';
        callback(null, res);
    }
    else{

        users.findOne({email: email}, (err, userinfo) =>{

            if(err) throw err;
            if(!userinfo){

                var newUser = {
                    user_type   : msg.user_type,
                    firstName   : msg.firstname,
                    lastName    : msg.lastname,
                    email       : msg.email,
                    password    : msg.password,
                    joined_date : new Date().toISOString(),
                };
            
                console.log(newUser);

                bcrypt.hash(newUser.password, saltRounds, function(err,hash){
                    //Store Hash in your DB
                    if(err){
                        console.log("ERROR: Failed to hash the password");
                    }
                    else{

                        console.log("Inside Bcrypt function");
                        newUser.password = hash;
                        users.create(newUser, (err, user) => {
                            console.log("Inside create query of createuser request.!");
                            if(err){

                                res.code    = '200';
                                res.status  = 'ERROR';
                                res.message = 'Could not create the user. Please try again later.';
                                callback(null, res);
                            }
                            else{

                                console.log("Successfuly created the user in db!");
                                res.code    = '200';
                                res.status  = 'SUCCESS';
                                res.message = 'User successfully created. Please sign in to continue.';
                                callback(null, res);
                            }; 
                        });
                    }
                });          
            }
            else{

                console.log("User already exists. Did not create a new user " + email);
                res.code    = '200';
                res.status  = 'ERROR';
                res.message = 'Account already exists with this email. Please sign in to continue.';
                callback(null, res);
            }
        });
    }
}

exports.handle_request = handle_request;