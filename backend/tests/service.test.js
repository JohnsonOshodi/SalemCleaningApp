const request = require('supertest');
const app = require('../server'); // Ensure server.js exports Express instance

describe('Service API', () => {
    it('should fetch all services', async () => {
        const res = await request(app).get('/api/services');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    });
});
