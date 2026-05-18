const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.TRAFFIC_PORT || process.env.PORT || 4300;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Traffic service running on port ${PORT}`);
  });
});
