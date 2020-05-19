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

function makeExpectedHabits(users, habit, actions=[]) {
  const user = users
    .find(user => user.id === habit.user_id)

  const habitActions = actions
    .filter(action => action.habit_id === habit.id)

  return {
    id: habit.id,
    goal: habit.goal,
    habit_name: habit.habit_name,
    description: habit.description,
    date_created: habit.date_created,

    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      nickname: user.nickname,
      date_created: user.date_created,
    },
  }
}

// function makeExpectedThingReviews(users, thingId, reviews) {
//   const expectedReviews = reviews
//     .filter(review => review.thing_id === thingId)

//   return expectedReviews.map(review => {
//     const reviewUser = users.find(user => user.id === review.user_id)
//     return {
//       id: review.id,
//       text: review.text,
//       rating: review.rating,
//       date_created: review.date_created,
//       user: {
//         id: reviewUser.id,
//         user_name: reviewUser.user_name,
//         full_name: reviewUser.full_name,
//         nickname: reviewUser.nickname,
//         date_created: reviewUser.date_created,
//       }
//     }
//   })
// }

// function makeMaliciousThing(user) {
//   const maliciousThing = {
//     id: 911,
//     image: 'http://placehold.it/500x500',
//     date_created: new Date().toISOString(),
//     title: 'Naughty naughty very naughty <script>alert("xss");</script>',
//     user_id: user.id,
//     content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
//   }
//   const expectedThing = {
//     ...makeExpectedHabits([user], maliciousThing),
//     title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
//     content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
//   }
//   return {
//     maliciousThing,
//     expectedThing,
//   }
// }

function makeThingsFixtures() {
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

function seedThingsTables(db, users, things, reviews=[]) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('my_discipline_habit').insert(things)
    await trx.raw(
      `SELECT setval('my_discipline_habit_id_seq', ?)`,
      [things[things.length - 1].id],
    )
    if (reviews.length) {
      await trx.into('my_discipline_actions').insert(reviews)
      await trx.raw(
        `SELECT setval('my_discipline_actions_id_seq', ?)`,
        [reviews[reviews.length - 1].id],
      )
    }
  })
}


function seedMaliciousThing(db, user, thing) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('my_discipline_habit')
        .insert([thing])
    )
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
  // makeExpectedThingReviews,
  // makeMaliciousThing,
  makeActionsArray,

  makeThingsFixtures,
  cleanTables,
  seedThingsTables,
  seedMaliciousThing,
  seedUsers
}
