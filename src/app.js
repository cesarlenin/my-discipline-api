require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV} = require('./config');
// const validateBearerToken = require('./validate-bearer-token');
const errorHandler = require('./error-handler');
const habitsRouter = require('./habits/habits-router');
// const actionsRouter = require('./actions/actions-router');
const authRouter = require('./auth/auth-router');


const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

// Middlewares
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use(validateBearerToken);

app.use('/api/habits',habitsRouter);
// app.use('/api/actions',actionsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(errorHandler);
module.exports = app;