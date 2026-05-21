const request = require('supertest');
const { app, apolloServer } = require('../apps/gateway/app');

describe('Gateway', () => {
  beforeAll(async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/graphql' });
  });

  afterAll(async () => {
    await apolloServer.stop();
  });

  test('responds to a simple GraphQL query', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({ query: '{ __typename }' });

    expect(res.status).toBe(200);
    expect(res.body.data.__typename).toBe('Query');
  });
});
