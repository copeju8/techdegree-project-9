// Configures the Sequelize ORM
const express = require('express');
const router = express.Router();
const User = require('../models').User;
const { check, validationResult } = require('express-validator/check');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the user"s route project!'
});
});

router.get('/users', (req, res) => {
 User.findAll()
   .then(users => {
     res.json(users)
   })
 
//POST /api/users route (also defined in the routes.js file) creates a new user account:

// router.post('/users', (req, res) => {
//   // Get the user from the request body.
//   const user = req.body;

//   const errors = [];

//   // Validate that we have a `name` value.
//   if (!user.name) {
//     errors.push('Please provide a value for "name"');
//   }

//   // Validate that we have an `email` value.
//   if (!user.email) {
//     errors.push('Please provide a value for "email"');
//   }

//   // // If there are any errors...
//   // if (errors.length > 0) {
//   //   // Return the validation errors to the client.
//   //   res.status(400).json({ errors });
//   // } else {

//   // Add the user to the `users` array.
//   users.push(user);

//   // Set the status to 201 Created and end the response.
//   res.status(201).end();
//   });

});
  

module.exports = router;