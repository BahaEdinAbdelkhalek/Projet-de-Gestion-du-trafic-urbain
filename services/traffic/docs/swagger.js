const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.TRAFFIC_PORT || 4300;

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Traffic Platform - Traffic Service',
      version: '1.0.0',
      description: 'Traffic API for the traffic platform',
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
