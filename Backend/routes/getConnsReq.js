var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

router.get("*", (req, res) => {
  console.log("in connection request search");
  console.log("req.query: ", req.query);

  kafka.make_request("getConnsReq", req.query, function(err, results) {
    if (err) {
      console.log("Inside err");
      res.status(404).json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (results) {
        console.log("in result");
        console.log(results);
        console.log("Inside else");
        console.log(results.code);
        res.status(results.code).json({
          connReq: results.connReq,
          message: results.message,
          success: results.success
        });

        res.end("Connection Requests Search Successful");
      }
    }
  });

  console.log("Going out of get Connection Requests");
});
module.exports = router;
