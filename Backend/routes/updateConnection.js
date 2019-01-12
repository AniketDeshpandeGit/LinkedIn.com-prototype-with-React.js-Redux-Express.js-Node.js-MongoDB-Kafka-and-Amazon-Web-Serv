var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

router.get("*", (req, res) => {
  console.log("in Connection Update");
  console.log(req.query);

  kafka.make_request("updateConnection", req.query, function(err, results) {
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
        res.status(200).json({
          //conn: results.conn,
          message: results.message,
          success: results.success
        });

        res.end("Connection Update Successful");
      }
    }
  });

  console.log("Going out of get Connection Update");
});
module.exports = router;
