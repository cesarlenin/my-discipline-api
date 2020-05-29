const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('actions Endpoints', function() {
  let db;

  const {
    testUsers,
    testHabits,
    testActions,
  } = helpers.makeHabitsFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/actions', () => {
    context('Given no actions', () => {
      beforeEach(() =>helpers.seedUsers(db, testUsers,testHabits));
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/actions')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });
    context('Given there are actions in the database', () => {
      beforeEach('insert actions', () =>
        helpers.seedHabitsTables(
          db,
          testUsers,
          testHabits,
          testActions
        )
      );
      it('responds with 200 and all of the actions for user', () => {
        const expectedActions = testActions.map(action =>
          helpers.makeExpectedActions(action)
        );

        let filterActions=expectedActions.filter(action =>action.user_id === testUsers[0].id);
        filterActions.map(action =>delete action.user_id);

        return supertest(app)
          .get('/api/actions')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, filterActions);
      });
    });
  });


  describe('POST /api/actions', () => {
    beforeEach('insert actions', () =>
      helpers.seedHabitsTables(
        db,
        testUsers,
        testHabits,
        testActions
      )
    );

    it('responds with 200 and post action', () => {
      let action = { ...testActions[0] };

      let expectedAction = helpers.makeExpectedActions(action);
      expectedAction.id = 8;

      return supertest(app)
        .post('/api/actions')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(action)
        .expect(200,expectedAction);
    });

    it('responds with 400 and error message', () => {
      const action = { ...testActions[0] };
    delete action.habit_id;
    
      return supertest(app)
        .post('/api/actions')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(action)
        .expect(400,'habit id needs to be a number');
    });
  });



});

