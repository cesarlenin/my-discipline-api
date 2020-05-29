const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Habits Endpoints', function() {
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

  describe('GET /api/habits', () => {
    context('Given no habits', () => {
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
      it('responds with 200 and all of the habits for user', () => {
        const expectedHabits = testHabits.map(habits =>
          helpers.makeExpectedHabits(habits)
        );
        const filterHabits=expectedHabits.filter(user =>user.id === testUsers[0].id);
        return supertest(app)
          .get('/api/habits')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, filterHabits);
      });
    });
  });
  //GET /api/habits ends here
  describe('GET /api/habits/:id', () => {
    context('Given no habits', () => {
      beforeEach(() =>helpers.seedUsers(db, testUsers));
      it('responds with 404', () => {
        const HabitId = 123456;
        return supertest(app)
          .get(`/api/habits/${HabitId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, {error: { message: 'habit was not found' }});
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

      it('responds with 200 and the specified article', () => {
        const HabitId = 1;

        const expectedHabit = helpers.makeExpectedHabits(
          testHabits[HabitId - 1]
        );

        return supertest(app)
          .get(`/api/habits/${HabitId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedHabit);
      });

      it('responds with 404 and error message', () => {
        const HabitId = 2;

        return supertest(app)
          .get(`/api/habits/${HabitId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, {'error':{'message':'habit was not found'}});
      });
    });
});
    //GET /api/habits/:id ends here

    describe('POST /api/habits', () => {
      beforeEach(() =>helpers.seedUsers(db, testUsers));

      it('responds with 200 and post habit', () => {
      const habit = { ...testHabits[0] };
      delete habit.date_created;

      expectedHabit = helpers.makeExpectedHabits(habit);
      expectedHabit.user_id = 1;
      expectedHabit.date_created = new Date().toISOString();

        return supertest(app)
          .post('/api/habits')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(habit)
          .expect(200,expectedHabit);
      });

      it('responds with 400 and error message', () => {
        const habit = { ...testHabits[0] };
      delete habit.habit_name;
      
        return supertest(app)
          .post('/api/habits')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(habit)
          .expect(400,'name is required');
      });
    });
    // POST /api/habits ends here
    describe('PATCH /api/habits/id', () => {
      context('Given there are habits in the database', () => {
        beforeEach('insert habits', () =>
          helpers.seedHabitsTables(
            db,
            testUsers,
            testHabits,
            testActions
          )
        );
      it('responds with 201 and patch habit', () => {
        const HabitId= 1; 
        const habit = { ...testHabits[0] };
        expectedHabit = helpers.makeExpectedHabits(habit);
        delete habit.id;
        delete habit.user_id;

        return supertest(app)
          .patch(`/api/habits/${HabitId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(habit)
          .expect(201,expectedHabit);
      });

      it('responds with 201 and patch habit', () => {
        const HabitId= 1; 

        return supertest(app)
          .patch(`/api/habits/${HabitId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send()
          .expect(400,{"error":{"message":"Request body must content either 'habit_name', 'goal' or 'description'"}});
      });
    });
    });
    // end of PATCH /api/habits/id

    describe('DELETE /api/habits/id', () => {
      context('Given there are habits in the database', () => {
        beforeEach('insert habits', () =>
          helpers.seedHabitsTables(
            db,
            testUsers,
            testHabits,
            testActions
          )
        );
        it('responds with 204', () => {
          const HabitId= 1; 

          return supertest(app)
            .delete(`/api/habits/${HabitId}`)
            .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
            .expect(204);
        });

        it('responds with 204', () => {
          const HabitId= 999; 

          return supertest(app)
            .delete(`/api/habits/${HabitId}`)
            .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
            .expect(404,{error: { message: 'habit was not found' }});
        });
      });
      // end of DELETE /api/habits/id
  });
  
});

