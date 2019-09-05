//Configures the Sequelize ORM
const express = require('express');
const router = express.Router();

// // const { check, validationResult } = require('express-validator/check');



//User's Routes

//GET/api/users 200 - Returns the currently authenticated user
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the user"s route project!'
});
});




//Post/api/users 201 - Creates a user, sets the Location header to "/", and returns no content
 // This array is used to keep track of user records as they are created.

const users = [];

// Route that creates a new user.
router.post('/', (req, res) => {
  // Get the user from the request body.
  const user = req.body;

  // Add the user to the `users` array.
  users.push(user);

  // Set the status to 201 Created and end the response.
  res.status(201).end();
});

module.exports = router;