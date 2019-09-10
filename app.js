'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./db/Index');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');

//Create the Express app
const app = express();

// Body-parser - must be before app.use routers and morgan
app.use(express.json());

// Setup morgan which gives us http request logging
app.use(morgan('dev'));

// Setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Setup your api routes here
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);

// Send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// Setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

//Set our port
app.set('port', process.env.PORT || 5000);

// Start listening on our port
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
