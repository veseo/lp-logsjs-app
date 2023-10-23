const server = require('../root');
const request = require('supertest');

describe('Logs list', () => {
  const databaseClient = server.databaseClient;
  const expressApp = server.expressApp;

  beforeAll(async () => {
    await server.databaseClient.init();
    await server.start(8083);
  });

  test('should return 200 during a regular request', async () => {
    const response = await request(expressApp).get('/logs');
    expect(response.statusCode).toBe(200);
  });

  test('should return already existing records', async () => {
    await databaseClient.save({ text: 'test me' });
    const response = await request(expressApp).get('/logs');

    expect(response.body.length).toEqual(1);
  });
});
