const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.AUTH_PORT || process.env.PORT || 4100;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
});
