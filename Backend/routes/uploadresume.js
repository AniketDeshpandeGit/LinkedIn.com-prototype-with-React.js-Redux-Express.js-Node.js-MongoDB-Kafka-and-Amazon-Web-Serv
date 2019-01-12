const multer = require('multer');
//var filename = "";
//var counter = 0;

var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

var AWS = require('aws-sdk');
AWS.config.update({"accessKeyId": ""/*AWS Access Key*/, "secretAccessKey": ""/*AWS Access Key*/, "region": "us-east-2" })


const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        console.log("Destination");
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        console.log(req.params);
           //counter++;
        const newFilename = req.params.username + '_resume.pdf';
        callback(null, newFilename);
    },
});
const upload = multer({ storage });



router.post('/:username', upload.array("resume", 10), (req, res) => {
    console.log("Uploading Resume Req Params");
    console.log(req.params);
    try{

    
    var bucket = new AWS.S3();
     var file = req.params.username +'_resume.pdf';
    var fileLocation = path.join(__dirname, '/../uploads', file);
    var pdf = fs.readFileSync(fileLocation);
   
    bucket.upload({
        Bucket : /*AWS Bucket Name */'',
        Key : req.params.username+'_resume.pdf',
        Body : pdf,
        ContentDisposition : 'inline',
        ContentType : 'application/pdf'
       
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
     var file = req.params.username +'_resume.pdf';
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