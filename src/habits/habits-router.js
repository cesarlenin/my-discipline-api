const express = require('express');
const logger = require('../logger');
const HabitsService = require('./habits-service');
const {
  requireAuth
} = require('../../middleware/jwt-auth');

const habitsRouter = express.Router();
const bodyParser = express.json();

habitsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    HabitsService.getAllHabits(req.app.get('db'), req.user.id)
      .then(habits => {
        res.status(200).json(HabitsService.serializeHabits(habits));
      })
      .catch(next);
  })

  .post(bodyParser, (req, res, next) => {
    const {
      habit_name,
      goal,
      description
    } = req.body;

    const newHabit = {
      habit_name,
      goal,
      description,
      user_id: req.user.id
    };

    if (!habit_name) {
      logger.error('name is required');
      return res.status(400).send('name is required');
    }
    if (!goal || !Number.isInteger(Number(goal))) {
      logger.error('goal needs to be a number');
      return res.status(400).send('goal needs to be a number');
    }
    if (!description) {
      logger.error('description id is required');
      return res.status(400).send('description id is required');
    }
    HabitsService.insertHabit(req.app.get('db'), newHabit)
      .then(habit => {
        res.json(habit);
      })
      .catch(next);
  });


habitsRouter
  .route('/:id')
  .all(requireAuth)
  .get((req, res, next) => {
    HabitsService.getById(req.app.get('db'), req.user.id, req.params.id)
      .then(habit => {
        if (!habit) {
          logger.error('habit was not found');
          return res.status(404).json({
            error: {
              message: 'habit was not found'
            }
          });
        }
        res.json(HabitsService.serializeHabit(habit));
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    HabitsService.deleteById(req.app.get('db'), req.user.id, req.params.id)
      .then(numRowsAffected => {
        if (!numRowsAffected) {
          logger.error('habit was not found');
          return res.status(404).json({
            error: {
              message: 'habit was not found'
            }
          });
        }
        res
          .status(204)
          .end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const {
      habit_name,
      goal,
      description
    } = req.body;

    const newHabit = {
      habit_name,
      goal,
      description
    };

    const numberOfValues = Object.values(newHabit).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: 'Request body must content either \'habit_name\', \'goal\' or \'description\''
        }
      });

    HabitsService.updateById(
      req.app.get('db'),
      req.user.id,
      req.params.id,
      newHabit
    )
      .then((data) => {
        res.status(201).json(HabitsService.serializeHabit(data[0]));
      })
      .catch(next);
  });

module.exports = habitsRouter;