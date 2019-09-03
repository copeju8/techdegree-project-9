// Configures the Sequelize ORM
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const users = [];

router.get('/users', (req, res) => {
  res.json({
    message: 'Welcome to the user"s route project!'
});
});

router.post('/users', (req, res) => {

// Get the user from the request body.
    const user = req.body;

    const errors = [];

// Validate that we have a first `name` value.
  if (!user.firstName) {
    errors.push('Please provide a value for "name".');
  }

// // Validate that we have a first `name` value.
//   if (!user.lastName) {
//     errors.push('Please provide a value for "name".');
//   }

//   // Validate that we have an `email` value.
//   if (!user.email) {
//     errors.push('Please provide a value for "email".');
//   }

// // Validate that we have an `password` value.
// if (!user.password) {
//   errors.push('Please provide a value for "password".');
// }

 // If there are any errors...
 if (errors.length > 0) {
// Return the validation errors to the client.
  res.status(400).json({ errors });
} else {
  // Add the user to the `users` array.
  users.push(user);

// Set the status to 201 Created and end the response.
    res.status(201).end();
}  
});
  
module.exports = router;