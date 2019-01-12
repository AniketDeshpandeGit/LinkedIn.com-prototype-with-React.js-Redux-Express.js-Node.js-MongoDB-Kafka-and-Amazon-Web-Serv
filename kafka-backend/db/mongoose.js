var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/lab2ha');


mongoose.connect('mongodb://admin:admin1@ds061370.mlab.com:61370/projectli', { useNewUrlParser: true, poolSize:100, useCreateIndex: true, },function(err, db) {
 } );

module.exports = {mongoose};