// //Configures the Sequelize ORM
// const express = require('express');
// const router = express.Router();

//Send a GET request to /courses to READ a list of courses
// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to the course route project!'
//   });
// });

// // Send a GET request to /quotes to READ a list of quotes

// //Find book list
// router.get('/courses', (req, res, next) => {
//   const Course = router.get('models').Course;

//   Course.findAll()
//     .then(courseList => {
//       res.json(courseList);
//     })
//     // .catch(err => console.log(err))
// });

// module.exports = router;