const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.VEHICLES_PORT || process.env.PORT || 4200;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Vehicles service running on port ${PORT}`);
  });
});
