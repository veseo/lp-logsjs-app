/* eslint no-undef: 0 */

const server = require('../root');
const request = require('supertest');
const Log = require('../domain/Log');

describe('Log fetch by id', () => {
	const databaseClient = server.databaseClient;
	const expressApp = server.expressApp;

	beforeAll(async () => {
		await server.databaseClient.init();
		await server.start(8085);
	});

	test('should return 400 with a suitable error if record with that id does not exist', async () => {
		const response = await request(expressApp).get('/logs/9999');

		expect(response.status).toBe(400);
	});

	test('should return already existing record', async () => {
		const existingLog = new Log({
			id: '1234',
			message: 'test',
		});
		await databaseClient.save(existingLog);

		const response = await request(expressApp).get(`/logs/${existingLog.id}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toMatchObject(expect.objectContaining({
			id: '1234',
			message: 'test',
		}));
	});
});
