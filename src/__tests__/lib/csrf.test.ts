import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  generateCSRFToken,
  storeCSRFToken,
  getCSRFToken,
  validateCSRFToken,
  initializeCSRF,
  getCSRFTokenForSubmission,
} from '../../lib/csrf';

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// Mock crypto.getRandomValues
Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = i; // Predictable values for testing
      }
    },
  },
});

describe('CSRF Protection', () => {
  beforeEach(() => {
    sessionStorageMock.clear();
  });

  it('should generate a 64-character token', () => {
    const token = generateCSRFToken();
    expect(token).toHaveLength(64);
  });

  it('should store and retrieve a token', () => {
    const token = 'test-token';
    storeCSRFToken(token);
    expect(getCSRFToken()).toBe(token);
  });

  it('should validate a correct token', () => {
    const token = 'test-token';
    storeCSRFToken(token);
    expect(validateCSRFToken(token)).toBe(true);
  });

  it('should not validate an incorrect token', () => {
    storeCSRFToken('correct-token');
    expect(validateCSRFToken('incorrect-token')).toBe(false);
  });

  it('should initialize CSRF protection', () => {
    const token = initializeCSRF();
    expect(token).toBeDefined();
    expect(getCSRFToken()).toBe(token);
  });

  it('should get a token for submission, initializing if necessary', () => {
    const token = getCSRFTokenForSubmission();
    expect(token).toBeDefined();
    expect(getCSRFToken()).toBe(token);
  });
});
