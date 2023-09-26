"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
// Configure Chai to use chai-http
chai.use(chai_http_1.default);
const expect = chai.expect;
// Import your Express app or API server module
//import app from '../routes/user/user.route'; // Replace with your actual app import
const app_1 = __importDefault(require("../app")); // Replace with your actual app import
(0, mocha_1.describe)('API Tests', () => {
    (0, mocha_1.it)('should return a 200 status code for GET /api/endpoint', async () => {
        const res = await chai.request(app_1.default).get('/user'); // Replace with your endpoint
        console.log(res);
        expect(res).to.have.status(200);
    });
    // Add more API test cases here...
});
