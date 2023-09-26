"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const math_1 = require("./math"); // Import the module to test
(0, mocha_1.describe)('Math Module', () => {
    (0, mocha_1.it)('should add two numbers correctly', () => {
        const result = (0, math_1.add)(2, 3);
        (0, chai_1.expect)(result).to.equal(5);
    });
    (0, mocha_1.it)('should handle negative numbers', () => {
        const result = (0, math_1.add)(-1, -2);
        (0, chai_1.expect)(result).to.equal(-3);
    });
});
