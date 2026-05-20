const { Sequelize } = require('sequelize');

const createSequelize = () => {
  const dialect = process.env.DB_DIALECT || 'mysql';

  if (dialect === 'sqlite') {
    return new Sequelize({
      dialect: 'sqlite',
      storage: process.env.DB_STORAGE || './database.sqlite',
      logging: false,
    });
  }

  if (dialect === 'mssql') {
    return new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 1433,
        dialect: 'mssql',
        logging: false,
        dialectOptions: {
          options: {
            encrypt: true,
            trustServerCertificate: true,
          },
        },
      }
    );
  }

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
