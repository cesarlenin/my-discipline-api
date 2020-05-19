const xss = require('xss');
const Treeize = require('treeize');

const HabitsService = {
  getAllHabits(db) {
    return db
      .from('my_discipline_habit AS md')
      .select(
        'md.id',
        'md.habit_name',
        'md.date_created',
        'md.description ',
        'md.goal'
      )
      .leftJoin(
        'my_discipline_action  AS act',
        'md.id',
        'md.habit_id'
      )
      .leftJoin(
        'thingful_users AS usr',
        'md.user_id',
        'usr.id'
      )
      .groupBy('md.id', 'usr.id');
  },

  getById(db, id) {
    return HabitsService.getAllHabits(db)
      .where('md.id', id)
      .first();
  },

  getActionsForHabits(db, habit_id) {
    return db
      .from('my_discipline_action AS act')
      .select(
        'act.id',
        'act.bool',
        'act.date_created',
        ...userFields
      )
      .where('md.habit_id)', habit_id)
      .leftJoin(
        'my_discipline_users AS usr',
        'md.user_id',
        'usr.id'
      )
      .groupBy('md.id', 'usr.id');
  },

  serializeHabits(habits) {
    return habits.map(this.serializeHabit);
  },

  serializeHabit(habit) {
    const habitTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const habitData = habitTree.grow([ habit ]).getData()[0];

    return {
      id: habitData.id,
      habit_name: xss(habitData.habit_name),
      description: xss(habitData.description),
      date_created: habitData.date_created,
      goal: habitData.goal,
      user: habitData.user || {}
    };
  },

  serializeHabitActions(actions) {
    return actions.map(this.serializeHabitAction);
  },

  serializeHabitAction(action) {
    const actionTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const actionData = actionTree.grow([ action ]).getData()[0];

    return {
      id: actionData.id,
      bool: actionData.bool,
      habit_id: actionData.habit_id,
      user: actionData.user || {},
      date_created: actionData.date_created,
    };
  },
};

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.nickname AS user:nickname',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
];

module.exports = HabitsService;
