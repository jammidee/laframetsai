import { describe, it } from 'mocha';
import * as chai from 'chai';
import chaiHttp from 'chai-http';

// Configure Chai to use chai-http
chai.use(chaiHttp);

const expect = chai.expect;

// Import your Express app or API server module
import app from '../routes/user/user.route'; // Replace with your actual app import

describe('API Tests', () => {
  it('should return a 200 status code for GET /api/endpoint', async () => {
    const res = await chai.request(app).get('/'); // Replace with your endpoint
    expect(res).to.have.status(200);
  });

  // Add more API test cases here...
});
