"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app")); // Replace with your actual app import
require("mocha");
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
// Configure Chai to use chai-http
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
let accessToken;
// Import your Express app or API server module
describe('API Tests: Access Token, Validate Token', () => {
    it('Get Token from .env Credentials: should return a 200 status code for GET /api/v1/security/getaccesstoken', async () => {
        const base64Credentials = Buffer.from(`${process.env.BASIC_USERNAME}:${process.env.BASIC_PASSWORD}`).toString('base64');
        const res = await chai_1.default.request(app_1.default)
            .get('/api/v1/security/getaccesstoken')
            .set('Content-Type', `application/json`)
            .set('Authorization', `Basic ${base64Credentials}`);
        accessToken = res.body.access_token;
        //console.log( accessToken );
        console.log(res.body);
        expect(res).to.have.status(200);
    });
    it('Testing Basic Token: should return a 200 status code for GET /api/v1/security/validatetoken', async () => {
        const res = await chai_1.default.request(app_1.default)
            .get('/api/v1/security/validatetoken')
            .set('Content-Type', `application/json`)
            .set('Authorization', `Bearer ${accessToken}`);
        console.log(res.body);
        expect(res).to.have.status(200);
    });
    it('Get User Token: should return a 200 status code for GET /api/v1/security/getusertoken', async () => {
        const user64Credentials = Buffer.from(`jammi_dee@yahoo.com:sadmin12345!`).toString('base64');
        const res = await chai_1.default.request(app_1.default)
            .get('/api/v1/security/getusertoken')
            .set('Content-Type', `application/json`)
            .set('Authorization', `Basic ${user64Credentials}`);
        accessToken = res.body.access_token;
        //console.log( accessToken );
        console.log(res.body);
        expect(res).to.have.status(200);
    });
    it('Testing User Token: should return a 200 status code for GET /api/v1/security/validatetoken', async () => {
        const res = await chai_1.default.request(app_1.default)
            .get('/api/v1/security/validatetoken')
            .set('Content-Type', `application/json`)
            .set('Authorization', `Bearer ${accessToken}`);
        console.log(res.body);
        expect(res).to.have.status(200);
    });
    // Add more API test cases here...
});
//# sourceMappingURL=test-system-api.test.js.map