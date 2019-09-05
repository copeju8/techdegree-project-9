//Configures the Sequelize ORM
const express = require('express');
const router = express.Router();
const data = require('../seed/data.json');
const User = require('../models/User');
const userData = data.users;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

// const {
//   check,
//   validationResult
// } = require('express-validator/check');
// const auth = require('basic-auth');
// const bcryptjs = require('bcrypt');

router.get('/', (req, res, next) => {
  // try{
  //   const student = await User.findAll()
  //     res.json(student)
  // } catch (err) {
  //   next(err)
  // }
  res.json(userData);
})


//User's Routes

//GET/api/users 200 - Returns the currently authenticated user
// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to the user"s route project!'
//   });
// });

//POST/api/users 201 - Creates a user, sets the Location header to "/", and returns no content
// This array is used to keep track of user records as they are created.

// Route that creates a new user.
router.post('/', (req, res) => {
  //If there is a password
  if(req.body.password) {
    //Hash the password and then attempt to create a new user
    req.body.password = bcryptjs.hashSync(req.body.password);
    //Model validations for User Model
    User.create(req.body);
    res.location('/');
    res.status(201).end();
  } else{
    //Respond with status 401
    res.status(401).end();
  }
})


module.exports = router;