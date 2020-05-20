const express = require('express')
const HabitsService = require('./habits-service')
const { requireAuth } = require('../../middleware/jwt-auth');

const habitsRouter = express.Router()

habitsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    // console.log(req.user)
    //get user_id from the authToken
    HabitsService.getAllHabits(req.app.get('db'),req.user.id)
      .then(habits => {
        res.json(HabitsService.serializeHabits(habits))
      })
      .catch(next)
  })

  // habitsRouter
  // .route('/:habit_id')
  // .all(checkHabitsExists)
  // .all(requireAuth)
  // .get((req, res) => {
  //   res.json(HabitsService.serializeHabit(res.thing))
  // })

  // habitsRouter.route('/:thing_id/reviews/')
  // .all(checkHabitsExists)
  // .all(requireAuth)
  // .get((req, res, next) => {
  //   HabitsService.getReviewsForThing(
  //     req.app.get('db'),
  //     req.params.thing_id
  //   )
  //     .then(reviews => {
  //       res.json(HabitsService.serializeThingReviews(reviews))
  //     })
  //     .catch(next)
  // })

/* async/await syntax for promises */
async function checkHabitsExists(req, res, next) {
  try {
    const habits = await HabitsService.getById(
      req.app.get('db'),
      req.params.habits_id
    )

    if (!habits)
      return res.status(404).json({
        error: `habits doesn't exist`
      })

    res.habits = habits
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = habitsRouter
