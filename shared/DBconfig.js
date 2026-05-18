const { Sequelize } = require('sequelize');

const createSequelize = () => {
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
    }
  );
};

const sequelize = createSequelize();

module.exports = sequelize;
