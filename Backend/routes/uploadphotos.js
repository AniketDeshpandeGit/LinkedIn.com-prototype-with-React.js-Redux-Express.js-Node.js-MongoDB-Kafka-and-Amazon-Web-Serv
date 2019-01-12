const multer = require('multer');
var filename = "";
var counter = 0;

var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
var AWS = require('aws-sdk');
AWS.config.update({"accessKeyId": ""/*AWS Access Key*/, "secretAccessKey": ""/*AWS Access Key*/, "region": "us-east-2" })


const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        
           counter++;
        const newFilename = req.params.username + '_photo.jpg';
        callback(null, newFilename);
    },
});
const upload = multer({ storage });


router.post('/setname', (req, res) => {
    filename = req.body.filename;
    console.log("Setting name: ", filename);
    res.end();
})

router.post('/:username', upload.array("images[]", 10), (req, res) => {
    console.log("Uploading Multiple Files");
    console.log(req.params);
    try
   {
       console.log(req.body);
       console.log("Trying to put the object");
       
        var bucket = new AWS.S3();
        //bucket.config =   AWS.config.loadFromPath('../aws-config/config');
        var file = req.params.username +'_photo.jpg';
        var fileLocation = path.join(__dirname, '/../uploads', file);
        var img; var base64img;
        img = fs.readFileSync(fileLocation);
        base64img = new Buffer(img).toString('base64');
        
        bucket.upload({
            Bucket : '' /*AWS Bucket Name */,
            Key : req.params.username+'_photo.jpg',
            Body : img,
          //  ContentEncoding: 'base64', 
           // Metadata: {
            //    'Content-Type': 'image/jpeg'
            //}
        },function (response) {
            console.log(response);

        });
    
    
    }
    catch(err){
        console.log(err);
    };

   try
   {
        var image;
     var file = req.params.username +'_photo.jpg';
     var fileLocation = path.join(__dirname, '/../uploads', file);
     var img; var base64img;
     img = fs.readFileSync(fileLocation);
     base64img = new Buffer(img).toString('base64');

    
     image = base64img;
     user = {};
    // user = user.toJSON();
     user.image = image;
     //console.log("test");
    // console.log(image);
     //console.log(user);
     res.end(JSON.stringify(user));
    }
    catch(err){
        console.log(err);
      res.end();
    };

  
});


module.exports =  router;