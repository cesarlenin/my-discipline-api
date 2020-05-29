const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeHabitsArray(users) {
  return [
    {
      id: 1,
      habit_name: 'First test thing!',
      goal: 5,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      habit_name: 'Second test thing!',
      goal: 4,
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      habit_name: 'Third test thing!',
      goal: 1,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      habit_name: 'Fourth test thing!',
      goal: 4,
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeActionsArray(users, habits) {
  return [
    {
      id: 1,
      habit_id: habits[0].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      habit_id: habits[0].id,
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      habit_id: habits[0].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      habit_id: habits[0].id,
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 5,
      habit_id: habits[habits.length - 1].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 6,
      habit_id: habits[habits.length - 1].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 7,
      habit_id: habits[3].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeExpectedHabits(habit) {
  return {
    id: habit.id,
    habit_name: habit.habit_name,
    description: habit.description,
    date_created: habit.date_created,
    goal: habit.goal
  }
}

function makeExpectedActions(action) {

    return {
      id: action.id,
      date_created: action.date_created,
      habit_id: action.habit_id,
      user_id: action.user_id
    }
}




function makeHabitsFixtures() {
  const testUsers = makeUsersArray()
  const testHabits = makeHabitsArray(testUsers)
  const testActions = makeActionsArray(testUsers, testHabits)
  return { testUsers, testHabits, testActions }
}


function cleanTables(db) {
  return db.transaction(trx =>
  trx.raw(
    `TRUNCATE
    my_discipline_habit,
    my_discipline_users,
    my_discipline_actions
    `
  )
  .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE my_discipline_habit_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE my_discipline_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE my_discipline_actions_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('my_discipline_habit_id_seq', 0)`),
        trx.raw(`SELECT setval('my_discipline_users_id_seq', 0)`),
        trx.raw(`SELECT setval('my_discipline_actions_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('my_discipline_users').insert(preppedUsers)
    .then(() =>
      db.raw(
        `SELECT setval('my_discipline_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedHabitsTables(db, users, habits, actions=[]) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('my_discipline_habit').insert(habits)
    await trx.raw(
      `SELECT setval('my_discipline_habit_id_seq', ?)`,
      [habits[habits.length - 1].id],
    )
    if (actions.length) {
      await trx.into('my_discipline_actions').insert(actions)
      await trx.raw(
        `SELECT setval('my_discipline_actions_id_seq', ?)`,
        [actions[actions.length - 1].id],
      )
    }
  })
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}



module.exports = {
  makeAuthHeader,
  makeUsersArray,
  makeHabitsArray,
  makeExpectedHabits,
  makeExpectedActions,
  makeActionsArray,

  makeHabitsFixtures,
  cleanTables,
  seedHabitsTables,
  seedUsers
}
