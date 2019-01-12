var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
var { connections } = require('../models/connections');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback) {

    var res = {};
    console.log("Make Connection");
    console.log(msg);

    var senderid = msg.senderid;
    var sendername = msg.sendername;
    var receiverid = msg.receiverid;
    var receivername = msg.receivername;
    var receiveremail = msg.receiveremail;
    var connectionstatus = msg.connectionstatus;

    var conn = new connections({
        senderid: senderid,
        sendername: sendername,
        receiverid: receiverid,
        receivername: receivername,
        receiveremail: receiveremail,
        connectionstatus: connectionstatus
    });

    console.log(conn);

    conn.save().then((conn) => {
        console.log("Connection created : ", conn);
        res.code = 200;
        res.success = true;
        res.message = 'Connection created and sent';
        res.senderid = conn.senderid;
        callback(null, res);

    }, (error) => {
        res.code = "404";
        res.message = "Could not create new connection. Try Again !!";
        console.log("Error", res.value);
        res.success = false;
        callback(null, res);
    })

}

exports.handle_request = handle_request;

