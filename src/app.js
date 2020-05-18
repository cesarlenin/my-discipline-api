require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV} = require('./config');
const validateBearerToken = require('./validate-bearer-token');
const errorHandler = require('./error-handler');
const foldersRouter = require('.folders/folders-router');
const notesRouter = require('.notes/notes-router');


const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

// Middlewares
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }};
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

app.use('/api/folders',foldersRouter);
app.use('/api/notes',notesRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(errorHandler);
module.exports = app;