/* eslint no-undef: 0 */

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

	beforeAll(async () => {
		await databaseClient.init();
		await server.start(8084);
	});

	beforeEach(async () => {
		await databaseClient.deleteAll();
	});

	test.each([
		['Id is not a valid value', 'id', undefined],
		['Id is not a valid value', 'id', null],
		['Message is not a valid value', 'message', undefined],
		['Message is not a valid value', 'message', null],
	])('should return 400 with error %s if %s is missing or invalid - %s', async (error, field, value) => {
		const response = await request(expressApp)
			.post('/logs')
			.send(generateDefaultInput({ [field]: value }));

		expect(response.status).toBe(400);
		expect(response.error.text).toEqual(error);
	});

	test('should return 400 with a suitable error if record with that id already exists', async () => {
		const existingLog = new Log({
			id: 1234,
			message: 'test',
		});
		await databaseClient.save(existingLog);

		const response = await request(expressApp)
			.post('/logs')
			.send(generateDefaultInput({ id: existingLog.id }));

		expect(response.status).toBe(400);
		expect(response.error.text).toEqual('Record with that id already exists!');
	});

	test('should return 200 if request is fine', async () => {
		const response = await request(expressApp)
			.post('/logs')
			.send(generateDefaultInput());

		expect(response.status).toBe(200);
	});

	test('should store the record if request is fine', async () => {
		await request(expressApp)
			.post('/logs')
			.send(generateDefaultInput());

		const dbRecords = await databaseClient.count();
		expect(dbRecords).toEqual(1);
	});
});
