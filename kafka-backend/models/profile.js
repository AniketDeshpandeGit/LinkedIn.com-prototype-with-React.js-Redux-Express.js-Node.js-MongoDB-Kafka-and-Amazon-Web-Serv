var mongoose = require('mongoose');

var Profiles = mongoose.model('Profiles',{
    username :{
        type : String
    },
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : String
    },
    aboutme : {
        type : String
    },
    city : {
        type : String
    },
    company : {
        type : String
    },
    school : {
        type : String
    },
    home : {
        type : String
    },
    language : {
        type : String
    },
    gender : {
        type : String
    },
    role : {
        type : String
    },
    profile_pic : {
        type : String
    },
    password : {
        type : String
    },

});

module.exports = {Profiles};