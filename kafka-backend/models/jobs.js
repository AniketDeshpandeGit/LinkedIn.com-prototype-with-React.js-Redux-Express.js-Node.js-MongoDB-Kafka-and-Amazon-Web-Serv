var mongoose = require('mongoose');

var Jobs = mongoose.model('Jobs',{
    jobid :{
        type : String,
        unique : true, 
        required : true, 
        
    },
    username : {
        type : String
    },
    company : {
        type : String
    },
    jobtitle : {
        type : String
    },
    address : {
        type : String
    },
    jobfunc : [{
    label :{type : String },
    value:{type: String }
    }],
    emptype : {
     type : String
    },
    industry : [{
     label :{type : String },
     value:{type: String }
    }],
    senlevel : {
     type : String
    },
    jobdes : {
     type : String
    },
    recapp : {
     type : String
    },
    source : {
        type : String
       },
   skills : [{
    label :{type : String },
    value:{type: String }
   }],
   explevel : [{
    type : String , 
   }],
   edulevel : [{
    label :{type : String },
    value:{type: String }
   }],
   rate : {
    type : Number
   },
   poststatus : {
    type : String
   },
   easyapply : {
    type : String
   },

});

module.exports = {Jobs};


