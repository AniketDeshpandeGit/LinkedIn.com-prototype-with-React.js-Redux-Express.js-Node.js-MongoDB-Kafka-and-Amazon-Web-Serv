'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./settings');
var {mongoose} = require('./db/mongoose');
// var {Profiles} = require('./models/profile');
var config = require('./settings');
const User = require('./models/user');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
   
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload._doc);
        User.getUserByEmail(jwt_payload._doc._email, jwt_payload._doc._user_type, (err, user) =>{
            if(err){
                return done(err,false);
            }
            else if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }));
};