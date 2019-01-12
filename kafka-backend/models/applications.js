var mongoose = require('mongoose');

var applications = mongoose.model('applications',{
	
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
    }
});

module.exports = {applications};