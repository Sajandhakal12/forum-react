let User = require("../../models/auth/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let validator = require("email-validator");

exports.init_user = (req, res) => {
  res.send(req.currUser.email);
};

exports.signUP_user = (req, res) => {
  const newUser = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  var responseIsNotEmpty = newUser.email && newUser.password;
  if (responseIsNotEmpty) {
    var emailIsValid = validator.validate(newUser.email);
    console.log(emailIsValid);
    if (emailIsValid) {
      // 10 is a salt value, salt is random data that
      // is used as additional input to a one-way function.
      // Salts are used to safeguard passwords in storage
      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            Error: true,
            Message: "Error in Hasing",
          });
        } else {
          User.checkUser(newUser.email, (err, result) => {
            if (err) {
              res
                .status(200)
                .json({ Error: true, Message: "Error executing MySQL query" });
            } else {
              if (result.length == 0) {
                newUser.password = hash;
                User.signUpUser(newUser, (err, result) => {
                  if (err) {
                    res.status(200).json({
                      Error: true,
                      Message: "Error executing MySQL query",
                    });
                  } else {
                    res.status(201).json({
                      message: "New User added",
                      result: result,
                    });
                  }
                });
              } else {
                res.status(200).json({
                  Error: true,
                  Message: "Email Id already registered",
                });
              }
            }
          });
        }
      });
    } else {
      res.status(422).json({
        Error: true,
        message: "Invalid Email",
      });
    }
  } else {
    res
      .status(400)
      .send({ error: true, message: "Email and password must not be null" });
  }
};

exports.login_user = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log("from backend login:", user);
  User.findUser(user, async (err, result) => {
    if (err) {
      res
        .status(201)
        .json({ Error: true, Message: "Error executing MySQL query" });
    } else {
      if (result.length == 1) {
        let validPass = await bcrypt.compare(user.password, result[0].password);
        console.log("it is valid:", validPass);
        if (validPass) {
          // console.log("from login", result[0].email);
          let token = jwt.sign(
            { email: result[0].email },
            process.env.JWT_key,
            {
              expiresIn: 100,
            }
          );
          res.header("token", token);
          res.status(200).json({ user, token });
        } else {
          res
            .status(404)
            .json({ Error: true, Message: "wrong email/password combination" });
        }
      } else {
        res
          .status(404)
          .json({ Error: true, Message: "wrong email/password combination" });
      }
    }
  });
};

exports.remove_user = (req, res) => {
  User.removeUser(req.body.email, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ Error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(200).json({
        message: "User removed",
        result: result,
      });
    }
  });
};
