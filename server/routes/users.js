/**
 *  Writing all the different api requests that can be used to modify the users collection
 *  Using the schema that was defined in the models/users file
 */

const express = require("express");
const userController = require("../controller/users");
const router = express.Router();

// This api request will create a new user in the database when a new account is created
router.post("/users/add", userController.createUser);

// this api request will login a user
router.post("/users/email", userController.login);

// this api request will update the password of the user when it is changed in the profile section
router.post("/users/updatepass", userController.updatePassword);

// this api request will update the user's info when it is changed in the profile section
router.post("/users/updateinfo", userController.updateInfo);

// this api request will verify the user's account
router.post("/users/verify", userController.verifyAccount);

// this api request will find all the user's in the database
router.post("/users/findusers", userController.findAllUsers);

// this api request will send the user an email with a password reset code
router.post("/users/forgetpassword", userController.forgetPassword);

// this api will verify if the password reset code and user match with one in the database
router.post("/users/verifyforgetpassword", userController.verifyForgetPassword)

// this api will update the user's password in the database after going through the forgot password process
router.post("/users/changeforgetpassword", userController.changeForgetPassword)

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const dbo = require("../db/conn");
// const Token = require("../models/token");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");
// const { db } = require('../models/token');
// const token = require('../models/token');
// const { send } = require('process');
// const bcrypt = require("bcryptjs")
// const { endianness } = require('os');

// // this will get all users
// router.route("/users/session").get(function (req, res) {
//     let db_connect = dbo.getDb("CinemaDB");
//     let checkEmail = { email: req.body.email };
//     db_connect.collection("Users").findOne(checkEmail, function (err, result) {
//         if (err) {
//             window.alert(err);
//             throw err;
//         }
//         res.json(result);
//     });
// });

// // This section will help you get a user by their email
// router.route("/users/email").post(function (req, res) {
//     let db_connect = dbo.getDb("CinemaDB");
//     let checkEmail = { email: req.body.email };
//     let pass = { password: req.body.password };
//     db_connect
//     .collection("Users")
//     .findOne(checkEmail, function (err, result) {
//         if (err) {
//             console.log("Invalid email");
//             throw err;
//         } else {
//             bcrypt.compare(pass.password, result.password, function(error, isMatch) {
//                 if (error) {
//                     throw error
//                 } else if (!isMatch) {
//                     result.match = isMatch;
//                     console.log("Incorrect Password");
//                 } else {
//                     result.match = isMatch;
//                     res.json(result);
//                 }
//             })
//         }
//     });
// });

// // This section will help you create a new user
// router.route("/users/add").post(async function (req, response) {
//     let db_connect = dbo.getDb("CinemaDB");
//     const saltRounds = 10
//     const pass = req.body.password;
//     let myobj;
//     bcrypt.genSalt(saltRounds, function (saltError, salt) {
//     if (saltError) {
//         throw saltError
//     } else {
//         bcrypt.hash(pass, salt, function(hashError, res) {
//         if (hashError) {
//             throw hashError
//         } else {
//             myobj = {
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 email: req.body.email,
//                 password: res,
//                 number: req.body.number,
//                 status: req.body.status,
//                 rememberMe: req.body.rememberMe,
//                 promo: req.body.promo,
//             };
//         }
//         })
//     }
//     })

//     //checks if email is already existing within the database
//     let checkEmail = {email: req.body.email};
//     existingAccount = false;
//     let user = await db_connect.collection("Users").findOne(checkEmail)
//     if (user) {
//         //if email is in database, sends the following error message
//         console.log("User with given email already exists");
//         existingAccount = true;
//         return;
//     } else {
//          //creates the new account into the database if the email is not taken.
//          db_connect.collection("Users").insertOne(myobj);
//          existingAccount = false;
//     }

//     if (existingAccount == false) {
//         try {
//             user = await db_connect.collection("Users").findOne(checkEmail);
            
//             //creates a token for a verification link
//             const token = await new Token({
//                 userId: user._id,
//                 userEmail: user.email,
//                 token: Math.floor(1000 + Math.random() * 8999)
//             }).save()
//             //creates a url using the user id and token string
//             const url = `${process.env.BASE_URL}createconfirmation`;
            
//             //sends an email with the verification url
//             await sendEmail(user.email, "Verification Code", `Please enter the verifcation code\n${token.token}\nat the following link:\n${url}`);
            
//             console.log("A verification email has been sent to your account");
//             response.end();
//         } catch (error) {
//             console.log(error);
//             console.log("Internal Server Error");
//         }
//     }

// });

        /*async function promoEmail(client) {
            const promoList = [];
            const cursor = client.db("CinemaDB").collection("Users").find({promo: true});

            const results = await cursor.toArray();

            console.log(results);

            if (results.length > 0) {
                results.forEach((result, i) => { 
                    promoList.push(result.email);
                });
            } else {
                console.log("No users found");
            }

            console.log(promoList)
        */

// router.route("/users/forgot").post(async function (req, res) {
//     let db_connect = dbo.getDb("CinemaDB");
//     let checkEmail = {email: req.body.email};

//     db_connect.collection("Users").findOne(checkEmail, function (err, res) {
//         if (err) {
//             console.log("Invalid email");
//             throw err;
//         } else {
//             let randPass = crypto.randomBytes(16).toString("hex");
//             let tempPass = {password: randPass};
//             db_connect.collection("Users").updateOne(checkEmail, {$set: tempPass});

//             sendEmail(user.email, "Password Reset", `Your password has been reset with the temporary pass:\n${tempPass}\nPlease log into your account with this password and reset your password in profile.`)
            
//             console.log("Password Reset Email has been sent");
//         }
//     })
// }) 

// router.route("/token").post(async function (req, res) {
//     let db_connect = dbo.getDb("CinemaDB");
//     let checkEmail = {email: req.body.email};
//     let code = { token: req.body.token}
//     user = await db_connect.collection("Users").findOne(checkEmail);
//     const tokenDb = await Token.findOne({
//         userId: user._id,
//         token: code.token
//     })

//     if (tokenDb) {
//         let statusUpdate = {status: "active"};
//         db_connect.collection("Users").updateOne(checkEmail, {$set: statusUpdate});
//         console.log("Account has been successfully verified");
//         await Token.deleteOne(tokenDb);
//     } else {
//         console.log("Account could not be verified");
//     }
// });

// // This section will change password
// router.route("/users/updatepass").post(function (req, response) {
//     let db_connect = dbo.getDb("CinemaDB");
//     let checkEmail = { email: req.body.email};
//     let oldPass = { password: req.body.password};
//     let newPass = { password: req.body.updatedPassword };

//     db_connect.collection("Users").findOne(checkEmail, function (err, result) {
//         if (err) throw err;
//         else {
//             bcrypt.compare(oldPass.password, result.password, function(error, isMatch) {
//                 if (error) {
//                     throw error
//                 } else if (!isMatch) {
//                     console.log("Incorrect Password");
//                 } else {
//                     const saltRounds = 10
//                     bcrypt.genSalt(saltRounds, function (saltError, salt) {
//                     if (saltError) {
//                         throw saltError
//                     } else {
//                         bcrypt.hash(newPass.password, salt, function(hashError, hashpass) {
//                         if (hashError) {
//                             throw hashError
//                         } else {
//                             let newPass2 = { password: hashpass };
//                             db_connect.collection("Users").updateOne(checkEmail, { $set: newPass2 }, function (error, res) {
//                                 if (error) throw error;
//                                 else {
//                                     response.json(res);
//                                 }
//                             });
//                         }
//                         });
//                     }
//                     });
//                 }
//             })
//         }
//     });
// });

// // This section will change personal info
// router.route("/users/updateinfo").post(function (req, response) {
//     let db_connect = dbo.getDb("CinemaDB");
//     let userEmail = { email: req.body.email };
//     let updatedUser = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         number: req.body.number,
//         promo: req.body.promo
//     };
//     db_connect.collection("Users").updateOne(userEmail, { $set: updatedUser }, function (err, result) {
//         if (err) throw err;
//         response.json(result);
//     });
// });

// module.exports = router;


// const express = require("express");
 
// // recordRoutes is an instance of the express router.
// // We use it to define our routes.
// // The router will be added as a middleware and will take control of requests starting with path /record.
// const recordRoutes = express.Router();
 
// // This will help us connect to the database
// const dbo = require("../db/conn");
 
// // This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;
 
 
// // This section will help you get a list of all the records.
// recordRoutes.route("/record").get(function (req, res) {
//  let db_connect = dbo.getDb("employees");
//  db_connect
//    .collection("records")
//    .find({})
//    .toArray(function (err, result) {
//      if (err) {
//       window.alert("youfuckedup");
//       throw err;
//      }
//     res.json(result);
//    });
// });
 
// // This section will help you get a single record by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect
//    .collection("records")
//    .findOne(myquery, function (err, result) {
//      if (err) throw err;
//      res.json(result);
//    });
// });
 
// // This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myobj = {
//    name: req.body.name,
//    position: req.body.position,
//    level: req.body.level,
//  };
//  db_connect.collection("records").insertOne(myobj, function (err, res) {
//    if (err) throw err;
//    response.json(res);
//  });
// });
 
// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      position: req.body.position,
//      level: req.body.level,
//    },
//  };
//  db_connect
//    .collection("records")
//    .updateOne(myquery, newvalues, function (err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      response.json(res);
//    });
// });
 
// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });
 
// module.exports = recordRoutes;