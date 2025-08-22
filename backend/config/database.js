// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    url: process.env.POSTGRES_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    logging: console.log
  },
  production: {
    url: process.env.POSTGRES_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
};