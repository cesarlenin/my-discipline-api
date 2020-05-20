// const xss = require('xss');
const Treeize = require('treeize');

const ActionsService = {
  getAllActions(db,userId) {
    return db
      .from('my_discipline_actions AS md')
      .select(
        'id',
        'date_created',
        'habit_id'
      )
      .where({'user_id': userId});
  },

  insertAction(db, data) {
    return db('my_discipline_actions')
      .insert(data)
      .returning('*')
      .then(rows => rows[0]);
  },
   
  serializeActions(actions) {
    return actions.map(this.serializeAction);
  },
    
  serializeAction(action) {
    const actionTree = new Treeize();
    
    const actionData = actionTree.grow([ action ]).getData()[0];
    
    return {
      id: actionData.id,
      date_created: actionData.date_created,
      habit_id: actionData.habit_id,
    };
  },
};

module.exports = ActionsService;