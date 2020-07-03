## Application
My Discipline

## Links
live site: [https://my-discipline.now.sh](https://my-discipline.now.sh)<br />
backend:[https://my-discipline.herokuapp.com/](https://my-discipline.herokuapp.com/)<br />
Link to Client repo:[https://github.com/cesarlenin/my-discipline](https://github.com/cesarlenin/my-discipline)

## Using The API
Currently the API supports GET, POST, DELETE, and PATCH endpoints.

- Protected Endpoints<br />
    + Login: POST (https://my-discipline.herokuapp.com/api/auth/login)<br />
    + GET Habits: GET (https://my-discipline.herokuapp.com/api/habits)<br />
    + GET Habit: GET (https://my-discipline.herokuapp.com/api/habits/<habit_id>)<br />
    + POST Habits: POST (https://my-discipline.herokuapp.com/api/habits/)<br />
    + DELETE Habit:DELETE (https://my-discipline.herokuapp.com/api/habits/<habit_id>)<br />
    + PATCH Habit:PATCH (https://my-discipline.herokuapp.com/api/habits/<habit_id>)<br />
    + GET Actions: GET (https://my-discipline.herokuapp.com/api/actions)<br />
    + POST Action: POST (https://my-discipline.herokuapp.com/api/actions/)

## Screen Shots
![landing](images/landing.png)<br />
![home](images/home.png)<br />
![create](images/create.png)<br />
![detail](images/detail.png)<br />
![edit](images/edit.png)<br />
![add](images/add.png)<br />

### Summary
- My Discipline was created to be a simple way to keep track and organize all of your habits.  
The user starts off by setting goals they want to meet. Then generating a collection of habits they want to have,
and quickly seeing their consistency in a calendar every time they log in.

## Technologies
  - React
  - Node.js
  - JavaScript
  - Postgresql 
  - Mocha, Chai
  - Express
  - Jest
