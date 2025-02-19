/* eslint no-undef: 0 */

const server = require('../root');
const request = require('supertest');

describe('Logs count', () => {
	const databaseClient = server.databaseClient;
	const expressApp = server.expressApp;

	beforeAll(async () => {
		await server.databaseClient.init();
		await server.start(8081);
	});

	test('should return 200 during a regular request', async () => {
		const response = await request(expressApp).get('/logs/count');
		expect(response.statusCode).toBe(200);
	});

	test('should take into account already existing records', async () => {
		await databaseClient.save({ text: 'test me' });
		const response = await request(expressApp).get('/logs/count');

		expect(response.body).toEqual(1);
	});
});
