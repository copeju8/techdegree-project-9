// Configures the Sequelize ORM
const express = require('express');
const router = express.Router();

// const users = [];

// //Sequelize DB object typical way to get Sequelize DB object
// router.set('models', require('./models'));

//Import Sequelize module to use Sequelize.Op in search action and lets us chain together logical statements
// const Sequelize = require('sequelize');
router.get('/courses', (req, res) => {
  res.json({
    message: 'Welcome to the course route project!'
});
});

// router.get('/courses/:id', (req,res) => {
//   res.json({
//     message: 'Welcome, your course request was successful!'
// });
// });
// router.post('/users', (req, res) => {

//   // Get the user from the request body.
//       const user = req.body;
  
//       const errors = [];
  
//   // Validate that we have a `name` value.
//     if (!user.name) {
//       errors.push('Please provide a value for "name"');
//     }
  
//     // Validate that we have an `email` value.
//     if (!user.email) {
//       errors.push('Please provide a value for "email"');
//     }
  
//    // If there are any errors...
//    if (errors.length > 0) {
//     // Return the validation errors to the client.
//     res.status(400).json({ errors });
//   } else {
//     // Add the user to the `users` array.
//     users.push(user);
  
//   // Set the status to 201 Created and end the response.
//       res.status(201).end();
//   }  
//   });
module.exports = router;