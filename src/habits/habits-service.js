const xss = require('xss');
const Treeize = require('treeize');

const HabitsService = {
  getAllHabits(db,userId) {
    return db
      .from('my_discipline_habit AS md')
      .select(
        'md.id',
        'md.habit_name',
        'md.date_created',
        'md.description ',
        'md.goal'
      )
      .where({'user_id': userId});
  },

  getById(db, userId, id) {
    return   db   
      .from('my_discipline_habit AS md')
      .select(
        'md.id',
        'md.habit_name',
        'md.date_created',
        'md.description ',
        'md.goal'
      )
      .where({'id':id, 'user_id': userId})
      .first();
  },

  insertHabit(db, data) {
    return db('my_discipline_habit')
      .insert(data)
      .returning('*')
      .then(rows => rows[0]);
  },

  deleteById(db,userId, id) {
    return db('my_discipline_habit')
      .where({'id':id, 'user_id': userId})
      .delete();
  },

  updateById(db,userId, id, data) {
    return db('my_discipline_habit')
      .where({'id':id, 'user_id': userId})
      .update(data);
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
      date_created: actionData.date_created,
    };
  },
};

module.exports = HabitsService;


