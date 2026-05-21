const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.NOTIFICATIONS_PORT || 4400;

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Traffic Platform - Notifications Service',
      version: '1.0.0',
      description: 'Notifications API for the traffic platform',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, '../routes/*.js')],
});

module.exports = swaggerSpec;
