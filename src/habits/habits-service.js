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
        'md.goal',
        ...userFields
      )
      .leftJoin(
        'my_discipline_action  AS act',
        'md.id',
        'act.habit_id'
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

  serializeHabits(habits) {
    return habits.map(this.serializeHabit);
  },

  serializeHabit(habit) {
    const habitTree = new Treeize();

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

// get habits
// get by id
// insert habit
// delete by id 
// update by id 
// get actions for habits?

// get action
// insert action
// getbyhabit Id & date?




