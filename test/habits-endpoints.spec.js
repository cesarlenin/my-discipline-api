const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('Habits Endpoints', function() {
  let db;

  const {
    testUsers,
    testHabits,
    testActions,
  } = helpers.makeThingsFixtures();

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

  describe('GET /api/habits', () => {
    context('Given no habits', () => {
      //change seedUsers
      beforeEach(() =>helpers.seedUsers(db, testUsers));
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/habits')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });
    context('Given there are habits in the database', () => {
      beforeEach('insert habits', () =>
        helpers.seedHabitsTables(
          db,
          testUsers,
          testHabits,
          testActions
        )
      );
      it('responds with 200 and all of the habits', () => {
        const expectedHabits = testHabits.map(habit =>
          helpers.makeExpectedHabits(
            testUsers,
            habit,
            testActions
          )
        );
        return supertest(app)
          .get('/api/habits')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedHabits);
      });
    });
  });
});