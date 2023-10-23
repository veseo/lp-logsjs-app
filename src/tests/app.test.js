const app = require('../../index');
const request = require('supertest');
describe('Testing the server', () => {
	let server = 1;

	beforeAll(async () => {
		server = await app;
	});

	test('should return 200', async () => {
		const response = await request(server).get('/logs');
		expect(response.statusCode).toBe(200);
	});
});
