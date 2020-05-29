require('dotenv').config;

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/my_discipline',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/my_discipline-test',
  JWT_SECRET: process.env.JWT_SECRET || 'fdfsdfsagdfd'
};