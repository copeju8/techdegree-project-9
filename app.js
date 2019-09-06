'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./db/Index');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/userRouter');


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Body-parser - must be before app.use routers and morgan
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//Course Routes
//GET /api/courses 200 - Returns a list of courses (including the user that owns each course)


//GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
//POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
//PUT /api/courses/:id 204 - Updates a course and returns no content
//DELETE /api/courses/:id 204 - Deletes a course and returns no content


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully!");
    return sequelize.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:", err');
  });
