// Configures the Sequelize ORM
const express = require('express');
const router = express.Router();

// //Sequelize DB object typical way to get Sequelize DB object
// router.set('models', require('./models'));

//Import Sequelize module to use Sequelize.Op in search action and lets us chain together logical statements
// const Sequelize = require('sequelize');
router.get('/users', (req, res) => {
  res.json({
    message: 'Welcome to the user"s route project!'
});
});
module.exports = router;