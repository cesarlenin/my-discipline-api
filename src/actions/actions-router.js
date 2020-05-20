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
      date_created
    } = req.body;
    
    const newActions = { 
      date_created
    };

    if (!date_created || !Number.isInteger(Number(date_created))) {
      logger.error('date needs to be a date');
      return res.status(400).send('goal needs to be a date');
    } 

    ActionsService.insertAction(req.app.get('db'),newActions)
      .then(action => {
        res.json(action);
      })
      .catch(next);
  });
module.exports = actionsRouter;
