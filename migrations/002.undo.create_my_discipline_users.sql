ALTER TABLE my_discipline_habit
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS my_discipline_users CASCADE;
