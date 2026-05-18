const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.INCIDENTS_PORT || process.env.PORT || 4500;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Incidents service running on port ${PORT}`);
  });
});
