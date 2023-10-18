const app = require('../../index');
const request = require('supertest');
describe('Testing the server', () => {

    test('should return 200', async () => {
        const response = await request(app).get('/logs');
        expect(response.statusCode).toBe(200);
    })
	
});