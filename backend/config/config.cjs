require('dotenv').config();

module.exports = {
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