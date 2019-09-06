//Configures the Sequelize ORM
const express = require('express');
const router = express.Router();
const dbmodule = require('../db');
const models = dbmodule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { Course, User } = models


//GET/api/courses 200 - Return list of courses (owned by user)
router.get('/:id', (req, res, next) => {
  const Course = router.get('dbmodule').Course;

  Course.findAll()
    .then(courseList => {
      res.json(courseList);
    })
    .catch(err => console.log(err))
});


//Test Code - Course Router 
// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to the course route project!'
//   });
// });

//Test code - get all
// router.get('/', (req, res) => {
//   User.findAll({
   
//   }).then((user) => {
//     res.json(user);
//   });
// });

// module.exports = router;