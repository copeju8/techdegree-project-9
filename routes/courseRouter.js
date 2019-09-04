// Configures the Sequelize ORM
const express = require('express');
const app = express.Router();


// const users = [];

// //Sequelize DB object typical way to get Sequelize DB object
// router.set('models', require('./models'));

//Import Sequelize module to use Sequelize.Op in search action and lets us chain together logical statements
// const Sequelize = require('sequelize');
app.get('/courses', (req, res) => {
  res.status(200).json(Course)({
    message: 'Welcome to the course route project!'
});

// Send a GET request to /courses to READ a list of courses
app.get('/books', (req, res, next) => {
  const List = app.get('models').List;

  List.findAll()
    .then(courseList => {
      res.render('index', {
        courseList: courseList
      });
    })
    .catch(err => console.log(err))
});
// Send a GET request to /quotes/:id to READ(view) a quote



// Send a POST request to /quotes to  CREATE a new quote 
// Send a PUT request to /quotes/:id to UPDATE (edit) a quote
// Send a DELETE request to /quotes/:id DELETE a quote 
// Send a GET request to /quotes/quote/random to READ (view) a random quote


});







module.exports = router;