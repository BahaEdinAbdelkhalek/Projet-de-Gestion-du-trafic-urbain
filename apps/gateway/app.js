const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const AuthService = require('./datasources/authService');
const VehicleService = require('./datasources/vehicleService');
const TrafficService = require('./datasources/trafficService');
const IncidentService = require('./datasources/incidentService');
const NotificationService = require('./datasources/notificationService');

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    return {
      token,
      dataSources: {
        authService: new AuthService(token),
        vehicleService: new VehicleService(token),
        trafficService: new TrafficService(token),
        incidentService: new IncidentService(token),
        notificationService: new NotificationService(token),
      },
    };
  },
});

module.exports = { app, apolloServer };
