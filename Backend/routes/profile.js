var express = require('express');
var router = express.Router();
var { mongoose } = require('../db/mongoose');
var { users } = require('../models/user');
var kafka = require('../kafka/client');
const fs = require('fs');
const path = require('path');

const multer = require('multer');
var filename = "";
var counter = 0;
var AWS = require('aws-sdk');
AWS.config.update({"accessKeyId": ""/*AWS Access Key*/, "secretAccessKey": ""/*AWS Access Key*/, "region": "us-east-2" })


const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {

        counter++;
        const newFilename = filename + '_photo' + counter + '.jpg';
        callback(null, newFilename);
    },
});
const upload = multer({ storage });


//Getting User Profile
router.get('/:username', function (req, res) {

    kafka.make_request('getprofile',req.params, function(err,response){
        
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.writeHead(200, {'Content-Type': 'image/gif' });
            try
            {
         
        //    var base64img;
        //      response.image = null;
        console.log("response in profile")    
        console.log(response)
        if(!response.hasOwnProperty('image'))
        {
            res.end(JSON.stringify(response));
        }
        else{
        //    response.image = null;
            var bucket = new AWS.S3();
             bucket.getObject({ Bucket : ''/*AWS Bucket Name*/,Key : response.email+'_photo.jpg'} ,function (err,image){
                 if(err)
                {
                    console.log(err);
                }
                console.log(image.Body);
                base64img = new Buffer(image.Body).toString('base64');
                response.image = base64img;
      
        res.end(JSON.stringify(response));
         })
        }

       
            }
            catch(err){
                console.log(err);
            };
        }
        else
        {
            console.log("No response");
        }
       
    })
}
);


router.get('/experience/:username', function (req, res) {

    kafka.make_request('getprofile_experience',req.params, function(err,response){

        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
              res.end(JSON.stringify(response));            
        }
        else
        {
            console.log("No response");
        }
       
    })
   
}
);


router.get('/education/:username', function (req, res) {
  
    kafka.make_request('getprofile_education',req.params, function(err,response){

        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
              res.end(JSON.stringify(response));            
        }
        else
        {
            console.log("No response");
        }
       
    })
    
}
);

router.post('/education', function (req, res) {

    kafka.make_request('add_education',req.body, function(err,response){

        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
              res.end(JSON.stringify(response));            
        }
        else
        {
            console.log("No response");
        }
       
    })

}
);

router.post('/experience', function (req, res) {

    kafka.make_request('add_experience',req.body, function(err,response){

        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
              res.end(JSON.stringify(response));            
        }
        else
        {
            console.log("No response");
        }
       
    })
   

}
);

router.put('/intro/:username', function (req, res) {
       
    if(typeof(req.body)!='undefined')
    {
        var data = req.body;
        data.username = req.params.username;
        kafka.make_request('edit_intro',data, function(err,response){
            if (err){
                console.log("Error");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }  
            else if(response)
            {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                  res.end(JSON.stringify(response));            
            }
            else
            {
                console.log("No response");
            }
           
        })
    }
}
);




router.put('/education', function (req, res) {
    console.log("Education" , req.body);

    kafka.make_request('edit_education',req.body, function(err,response){
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
              res.end(JSON.stringify(response));            
        }
        else
        {
            console.log("No response");
        }
       
    })
  
}
);



router.put('/experience', function (req, res) {
    console.log("Experience" , req.body);
    kafka.make_request('edit_experience',req.body, function(err,response){
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
              res.end(JSON.stringify(response));            
        }
        else
        {
            console.log("No response");
        }
       
    })
    
}
);



router.delete('/experience', function (req, res) {
    console.log("Deleting Experience For/With: " , req.body);
    kafka.make_request('delete_experience',req.body, function(err,response){
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.end();         
        }
        else
        {
            console.log("Could not delete");
        }
       
    })
   
}
);

router.delete('/education', function (req, res) {
    console.log("Deleting Education" , req.body);
    kafka.make_request('delete_education',req.body, function(err,response){
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            res.end();         
        }
        else
        {
            console.log("Could not delete");
        }
       
    })
   
        }
);


router.get('/skills/:username', function (req, res) {
    console.log("Profile Get request");

   
    users.findOne({ email: req.params.username }, { skills: 1 }, function (err, user) {

        if (err) {
            console.log(err);

        } else if (user) {
            console.log(user);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(user));
        }
        else {
            console.log(req.params.username, " not found");
        }
    }
    )
}
);
router.post('/skills', function (req, res) {
    users.updateOne({ email:req.body.username },{$addToSet : {skills: req.body.skills} }, function (err, response) {
     
     if (err) {
         console.log(err);

     }
     else if (response) {
         console.log(response);
         console.log("Profile Updated");
         res.end("Updated");
        // res.end("Updated");
     }
     else {

        // callback(null, false);

     }

 })

    

}
);


router.delete('/skill', function (req, res) {
    console.log("Deleting Skill" , req.body);
    var deleteSkill = {};
    var deleteEduID ={};
  //  deleteEduID["_id"] = req.body.id;
    deleteSkill["skills"] = req.body.skill;
    deleteSkill = {$pull : deleteSkill};
    console.log(deleteSkill);
      users.updateOne({email : req.body.username }, deleteSkill  , function (err, response){
              console.log("Enterting Update");
             
              if(err)
              {
                  console.log(err);
              }
              else if(response)
              {
                 // console.log(response);
                  res.end();
              }
             
              else
              {
                  console.log("No response");
              }
          }) 
        }
);


module.exports = router;








