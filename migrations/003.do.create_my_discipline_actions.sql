CREATE TABLE my_discipline_actions (
    id SERIAL PRIMARY KEY,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    habit_id INTEGER
        REFERENCES my_discipline_habit(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES my_discipline_users(id) ON DELETE CASCADE NOT NULL
);
