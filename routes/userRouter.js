// Configures the Sequelize ORM
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const users = [];

router.get('/users', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the user"s route project!'
});
});

//POST /api/users route (also defined in the routes.js file) creates a new user account:
router.post('/users', (req, res) => {
  // Get the user from the request body.
  const user = req.body;

  // Add the user to the `users` array.
  users.push(user);

  // Set the status to 201 Created and end the response.
  res.status(201).end();
});
  
module.exports = router;