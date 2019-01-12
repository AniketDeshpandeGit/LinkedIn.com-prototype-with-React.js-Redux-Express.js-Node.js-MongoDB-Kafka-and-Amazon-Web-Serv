var mongoose = require('mongoose');

var Applyjob = mongoose.model('applyjob',{
	
    jobid :{
        type : String
    },
    jobtitle :{
        type : String
    },
    applicantid : {
	   type : String
    },
    recruiterid : {
        type : String
    },
    company : {
        type : String
    },
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    jobidgenerated : {
        type : String
    },
    phoneno : {
        type : String
    },
    typeofapply : {
        type : String
    },
    address : {
        type : String
    }

});

module.exports = {Applyjob};