//Configures the Sequelize ORM
const express = require('express');
const router = express.Router();
const dbmodule = require('../db');
const models = dbmodule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { Course, User } = models


//GET/api/courses 200 - Return list of courses (owned by user)
//User authentication middleware function
const authenticateUser = async (req, res, next) => {
  let message;
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);
  if(credentials) {
    //Find user with matching email address
    const user = await User.findOne({
        raw: true,
        where: {
          emailAddress: credentials.name,
        },
    });
    //If user matches email
    if(user) {
      // Use the bcryptjs npm package to compare the user's password
      // (from the Authorization header) to the user's password
      // that was retrieved from the data store.
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
      //If password matches
      if(authenticated) {
        console.log(`Authentication successful for user: ${user.firstName} ${user.lastName}`);
        if(req.originalUrl.includes('courses')) {
          //If route has a courses endpoint, set request userId to matched user id
          req.body.userId = user.id;
        } else if(req.originalUrl.includes('users')) {
          //If route has a users endpoint, set request id to matched user id
          req.body.id = user.id;
        }
      } else {
        //Otherwise the Authentication failed
        message = `Authentication failed for user: ${user.firstName} ${user.lastName}`;
      }
    } else {
      // No email matching the Authorization header
      message = `User not found for email address: ${credentials.name}`;
    }
  } else {
    //No user credentials/authorization header available
    message = 'Authorization header not found';
  }
  // Deny Access if there is anything stored in message
  if(message) {
    console.warn(message);
    const err = new Error('Access Denied');
    err.status = 401;
    next(err);
  } else {
    //User authenticated
    next();
  }
}
//GET/api/courses 200
router.get('/', async(req, res) => {
  const courses =  await Course.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'emailAddress']
      }]
    })
    res.json(courses)
  })
  
//GET/api/courses/:id 
router.get('/:id', async(req, res, next) => {
  const oneCourse = await Course.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'emailAddress']
      }]
    })
    res.json(oneCourse); 
})  

router.post('/', async (req, res) => {
    const createCourse = await Course.create(req.body); 
    res.location(`/api/courses/${createCourse.id}`);
    res.status(201).end();
})     
//PUT/api/courses 201
router.put('/:id', authenticateUser, async(req,res) => {
  // try{
   const editCourse = await records.getCourse(req.body);
  //   if(course) {
  //     course.course = req.body.course;
  //     course.course = req.body.author;

      await records.updateCourse(`/api/courses/${editCourse.id}`);
      res.status(204).end();
  //   } else {
  //       res.status(404).json({message: "Quote Not Found"});
  //   }  
  
  // } catch(err) { 
  //   res.status(500).json({message: err.message});
  // } 
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

module.exports = router;