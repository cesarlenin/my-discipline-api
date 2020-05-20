const express = require('express');
const logger = require('../logger');
const ActionsService = require('./actions-service');
const { requireAuth } = require('../../middleware/jwt-auth');

const actionsRouter = express.Router();
const bodyParser = express.json();

actionsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    ActionsService.getAllActions(req.app.get('db'),req.user.id)
      .then(actions => {
        res.json(ActionsService.serializeActions(actions));
      })
      .catch(next);
  })

  .post(bodyParser, (req, res, next) => {
    const { 
      date_created,
      habit_id
    } = req.body;
    
    const newActions = { 
      date_created,
      habit_id,
      user_id: req.user.id
    };
    if (!date_created || new Date(date_created)=== 'Invalid Date') {
      logger.error('date needs to be a date');
      return res.status(400).send('date needs to be a date');
    } 
    if (!habit_id || !Number.isInteger(Number(habit_id))) {
      logger.error('habit id needs to be a number');
      return res.status(400).send('habit id needs to be a number');
    } 

    ActionsService.insertAction(req.app.get('db'),newActions)
      .then(action => {
        res.json(action);
      })
      .catch(next);
  });
module.exports = actionsRouter;
