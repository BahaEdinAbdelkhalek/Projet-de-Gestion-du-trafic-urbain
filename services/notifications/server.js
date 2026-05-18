const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const app = require('./app');
const sequelize = require('../../shared/DBconfig');

const PORT = process.env.NOTIFICATIONS_PORT || process.env.PORT || 4400;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Notifications service running on port ${PORT}`);
  });
});
