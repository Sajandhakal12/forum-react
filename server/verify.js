const jwt = require("jsonwebtoken");

var verifyToken = function (req, res, next) {
  console.log("from verify:", req.query.token);
  var token = req.body.token || req.query.token || req.header["token"];
  if (token) {
    // verify secret and checks exp
    jwt.verify(token, process.env.JWT_KEY, function (err, currUser) {
      if (err) {
        console.log("error in verfy.js");
        //401 status code for unaothorized access
        res.status(401).send(err);
      } else {
        // decoded object
        req.currUser = currUser;
        //console.log("this is :", currUser);
        next();
      }
    });
  } else {
    // send not found error
    //res.send(401, " ");
    res.status(401).send("Invalid Access");
  }
  // console.log(email);
};
module.exports = verifyToken;
