CREATE TABLE my_discipline_habit (
  id SERIAL PRIMARY KEY,
  habit_name TEXT NOT NULL,
  goal INTEGER NOT NULL,
  description TEXT NOT NULL,
  date_created TIMESTAMPTZ DEFAULT date_trunc('day', now()) NOT NULL
);
