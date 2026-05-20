const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const { app, apolloServer } = require('./app');

const PORT = process.env.GATEWAY_PORT || 4000;

async function start() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`GraphQL Gateway running at http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error('Error starting gateway:', err);
});
