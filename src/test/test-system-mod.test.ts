import { describe, it } from 'mocha';
import { expect } from 'chai';
import { add } from './math'; // Import the module to test

describe('Math Module', () => {
  it('should add two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).to.equal(5);
  });

  it('should handle negative numbers', () => {
    const result = add(-1, -2);
    expect(result).to.equal(-3);
  });
});