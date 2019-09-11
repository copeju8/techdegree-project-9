//Configures the Sequelize ORM
const express = require('express');
const router = express.Router();
const dbmodule = require('../db');
const models = dbmodule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { Course, User } = models


//User authentication middleware function
const authenticateUser = async (req, res, next) => {
  let message;
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);
  if(credentials) {
    //Find user with matching email address
    const user = await User.findOne({
        raw: true,
        where: {
          emailAddress: credentials.name,
        },
    });
    //If user matches email
    if(user) {
      // Use the bcryptjs npm package to compare the user's password
      // (from the Authorization header) to the user's password
      // that was retrieved from the data store.
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
      //If password matches
      if(authenticated) {
        console.log(`Authentication successful for user: ${user.firstName} ${user.lastName}`);
        if(req.originalUrl.includes('courses')) {
          //If route has a courses endpoint, set request userId to matched user id
          req.body.userId = user.id;
        } else if(req.originalUrl.includes('users')) {
          //If route has a users endpoint, set request id to matched user id
          req.body.id = user.id;
        }
      } else {
        //Otherwise the Authentication failed
        message = `Authentication failed for user: ${user.firstName} ${user.lastName}`;
      }
    } else {
      // No email matching the Authorization header
      message = `User not found for email address: ${credentials.name}`;
    }
  } else {
    //No user credentials/authorization header available
    message = 'Authorization header not found';
  }
  // Deny Access if there is anything stored in message
  if(message) {
    console.warn(message);
    const err = new Error('Access Denied');
    err.status = 401;
    next(err);
  } else {
    //User authenticated
    next();
  }
}
//Returns the authenticated user
router.get('/', authenticateUser, async (req, res, next) => {
  try{
    const user = await User.findByPk(req.body.id, { 
      attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    res.json(user);

  } catch(err) {
      next(err)
  }  
})

// //POST/api/users 201 - Creates a user, sets the Location header to "/", and returns no content
// // This array is used to keep track of user records as they are created.

router.post('/', async (req, res, next) => {
  try {
  //If there is a password
    if(req.body.password && req.body.firstName && req.body.lastName && req.body.emailAddress) {
      //Hash the password and then attempt to create a new user
      req.body.password = bcryptjs.hashSync(req.body.password);
      //Model validations for User Model
      await User.create(req.body);
      res.location('/');
      res.status(201).end();
    } else{
      //Respond with status 400
      res.status(400).json({
        message: 'Error 400 - Bad Request.',
      });
    }
}catch (err) {
  if(err.name === "SequelizeValidatorError") {
    console.log("Error 400 - Validation Error")
    res.status(400).end();
  } else {
    console.log("Error 500 - Internal Server Error")
    next(err);
  }
}})

//User's Routes - Test Code

//GET/api/users 200 - Returns the currently authenticated user
// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to the user"s route project!'
//   });
// });

//Test code - get all
// router.get('/', (req, res) => {
//   User.findAll({
   
//   }).then((user) => {
//     res.json(user);
//   });
// });


module.exports = router;