// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      //console.log("I found token: " + bearerToken);
      // Next middleware
      next();
    } else {
      // Forbidden
      console.log("Will send forbidden");
      res.sendStatus(403);
    } 
}

module.exports = verifyToken;