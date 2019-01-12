var mongoose = require('mongoose');

var connections = mongoose.model('connections',{
	
    senderid :{
        type : String
    },
    sendername : {
        type : String
    },
    receiverid :{
        type : String
    },
    receivername :{
        type : String
    },
    receiveremail :{
        type : String
    },
    connectionstatus :{
	   type : String
    }

});

module.exports = {connections};