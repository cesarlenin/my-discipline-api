const xss = require('xss');
const Treeize = require('treeize');

const HabitsService = {
  getAllHabits(db,userId) {
    return db
      .from('my_discipline_habit')
      .select(
        'id',
        'habit_name',
        'date_created',
        'description ',
        'goal'
      )
      .orderBy('date_created')
      .where({'user_id': userId});
  },

  getById(db, userId, id) {
    return   db   
      .from('my_discipline_habit')
      .select(
        'id',
        'habit_name',
        'date_created',
        'description ',
        'goal'
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
      .update(data)
      .returning('*');
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
};

module.exports = HabitsService;


