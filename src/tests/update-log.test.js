const server = require('../root');
const request = require('supertest');
const lodash = require('lodash');
const Log = require('../domain/Log');


describe('Logs creation', () => {
  const databaseClient = server.databaseClient;
  const expressApp = server.expressApp;

  function generateDefaultInput(override = {}) {
    const defaults = {
      id: '1',
      message: 'Test message',
    };

    return lodash.assign(defaults, override);
  }

  const defaultLog = new Log(generateDefaultInput());

  beforeAll(async () => {
    await databaseClient.init();
    await server.start(8082);
  });

  beforeEach(async () => {
    await databaseClient.deleteAll();
    await databaseClient.save(defaultLog);
  });

  test.each([
    ['Message is not a valid value', undefined],
    ['Message is not a valid value', null],
  ])('should return 400 with error %s if message is missing or invalid - %s', async (error, value) => {
    const response = await request(expressApp)
      .patch(`/logs/${defaultLog.id}`)
      .send(generateDefaultInput({ message: value }));

    expect(response.status).toBe(400);
    expect(response.error.text).toEqual(error);
  });

  test('should return 400 with a suitable error if record with that id does not exist', async () => {
    const response = await request(expressApp)
      .patch(`/logs/9999`)
      .send(generateDefaultInput({ message: 'new val' }));

    expect(response.status).toBe(400);
  });

  test('should return 200 if request is fine', async () => {
    const response = await request(expressApp)
      .patch(`/logs/${defaultLog.id}`)
      .send(generateDefaultInput());

    expect(response.status).toBe(200);
  });

  test('should update the record message if request is fine', async () => {
    await request(expressApp)
      .patch(`/logs/${defaultLog.id}`)
      .send(generateDefaultInput({
        message: 'new message'
      }));

    const dbRecord = await databaseClient.findById(defaultLog.id);
    expect(dbRecord.message).toEqual('new message');
  })
});
