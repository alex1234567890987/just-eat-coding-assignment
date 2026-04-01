import { describe, it, expect } from 'vitest';
import { isValidPostcode } from './validation';

describe('isValidPostcode', () => {
  it('accepts a valid postcode', () => {
    expect(isValidPostcode('EN2 7EQ')).toBe(true);
  });

  it('accepts a postcode without spaces', () => {
    expect(isValidPostcode('EN27EQ')).toBe(true);
  });

  it('accepts lowercase input', () => {
    expect(isValidPostcode('en2 7eq')).toBe(true);
  });

  it('rejects an empty string', () => {
    expect(isValidPostcode('')).toBe(false);
  });

  it('rejects random text', () => {
    expect(isValidPostcode('not a postcode')).toBe(false);
  });

  it('rejects a partial postcode', () => {
    expect(isValidPostcode('EN2')).toBe(false);
  });

  it.todo('rejects a correctly formatted but non-existent postcode', () => {
    expect(isValidPostcode('ZZ9 9ZZ')).toBe(false);
  });
});