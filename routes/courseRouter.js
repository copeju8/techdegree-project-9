//Configures the Sequelize ORM
const express = require('express');
const router = express.Router();
const dbmodule = require('../db');
const models = dbmodule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { Course, User } = models


//GET/api/courses 200 - Return list of courses (including the user that owns each course).
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
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },    
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
      }]
    })
    res.json(courses)
  })
  
//GET/api/courses/:id  200 - Returns a course (including the user that owns the course) for the provided course ID.
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

//POST/api/courses 201 - Create a course, sets the Location header to the URI for the course - returns no content.
router.post('/', async (req, res, next) => {
  try{
    if(req.body.title && req.body.description)  {
    const createCourse = await Course.create(req.body); 
    res.location(`/api/courses/${createCourse.id}`);
    res.status(201).end();
    }else{
      //Respond with status 400
      res.status(400).json({
        message: 'Error 400 - Bad request - Missing information.',
      });
    }
  }catch (err) {
    console.log("Error 401 - Unauthorized Request");
    next(err);
  } 
})

//PUT/api/courses 201  - Updates a course and returns no content.
router.put('/:id', authenticateUser, async(req,res) => {
  try{
    let course = await Course.findByPk(req.params.id);
     if(course.userId = req.body.userId) {
      if(req.body.title && req.body.description)  {
      course.title = req.body.title;
      course.description = req.body.description;
      course.estimatedTime = req.body.estimatedTime;
      course.materialsNeeded = req.body.materialsNeeded;
      course.createdAt= req.body.createdAt;
      course.updatedAt = req.body.updatedAt;
      course.updatedAt = req.body.Id;

      course = await course.update(req.body);  //Go back and update 'course'
      res.status(204).end();
     } else{
      //Respond with status 400
      res.status(400).json({
        message: 'Error 400 - Bad request - Missing information.',
      });
    }
    } else{
      console.log(403).json({message: "You are not authorized to make changes to this course."});
    }  
  } catch(err) { 
    res.status(500).json({message: err.message});
  }
})

// DELETE/api/courses/:id 204  - Deletes a course and returns no content.
router.delete('/:id', authenticateUser, async(req,res) => {
  try {
    let course = await Course.findByPk(req.params.id);
    await course.destroy(course); 
    res.status(204).end();
    
//Successful - no content
  }catch(err){
    res.status(500).json({message: err.message});
  }  //TODO - client request quote that does not exist
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