CREATE TABLE my_discipline_action (
    id SERIAL PRIMARY KEY,
    bool BOOLEAN NOT NULL,
    date_created TIMESTAMPTZ DEFAULT  NOT NULL,
    habit_id INTEGER
        REFERENCES my_discipline_habit(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES my_discipline_users(id) ON DELETE CASCADE NOT NULL
);
