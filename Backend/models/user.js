var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt');
//const saltRounds = 12;
// /const config = require('../settings');

var users = mongoose.model('users',{
	
    firstName :{
        type : String
    },
    lastName :{
        type : String
    },
    email : {
	   type : String
    },
    user_type: {
        type: String
    },
    password : {
        type : String
    },
    headline : {
        type : String
    },
    current_position :{
        type : String
    },
    experience : [
    {
        title: { type : String},
        company: { type : String},
        fromMonth : {type : String},
        toMonth : {type : String},
        fromYear : {type : Number},
        toYear : {type : Number},
        location : {type : String}
    }],
    education : [
        {
            school: { type : String},
            degree: { type : String},
            field : {type : String},
            fromYear : {type : Number},
            toYear : {type : Number}
        }],
    
    location : {
        type : String
    },
    address : {
        type : String
    },
    city   : {
        type : String
    },
    userstate : {
        type : String
    },
    zipcode : {
        type : String
    },
    industry : {
        type : String
    },
    contact : {
        type : String
    },
    profile_summary : {
        type : String
    },
    skills : {type : Array}
});
module.exports = {users};
