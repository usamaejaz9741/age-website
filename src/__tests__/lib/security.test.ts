import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  sanitizeHtml,
  validateEmail,
  sanitizeEmail,
  validateAndSanitizeText,
  validateNumeric,
  containsSuspiciousPatterns,
  generateSecureRandomString,
  validateUrl,
  sanitizeUrl,
  RateLimiter,
} from '../../lib/security';

describe('sanitizeHtml', () => {
  it('should return an empty string for non-string inputs', () => {
    expect(sanitizeHtml(null as unknown as string)).toBe('');
    expect(sanitizeHtml(undefined as unknown as string)).toBe('');
  });

  it('should remove script tags and their content', () => {
    const input = '<script>alert("XSS")</script>Hello';
    expect(sanitizeHtml(input)).toBe('Hello');
  });

  it('should keep safe HTML tags', () => {
    const input = '<p>Hello <b>World</b></p>';
    expect(sanitizeHtml(input)).toBe('<p>Hello <b>World</b></p>');
  });

  it('should remove event handlers like onclick', () => {
    const input = '<a onclick="doSomething()">Click me</a>';
    expect(sanitizeHtml(input)).toBe('<a>Click me</a>');
  });

  it('should remove javascript: from href attributes', () => {
    const input = '<a href="javascript:alert(\'XSS\')">link</a>';
    expect(sanitizeHtml(input)).toBe('<a>link</a>');
  });
});

describe('validateEmail', () => {
  it('should return true for valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(validateEmail('test@example')).toBe(false);
  });
});

describe('sanitizeEmail', () => {
  it('should trim whitespace and convert to lowercase', () => {
    expect(sanitizeEmail('  TEST@EXAMPLE.COM  ')).toBe('test@example.com');
  });

  it('should remove malicious HTML', () => {
    expect(sanitizeEmail('test<script>@example.com')).toBe('testscript@example.com');
  });
});

describe('validateAndSanitizeText', () => {
  it('should sanitize HTML and trim the result', () => {
    const input = '  <p>Hello</p><script>alert("XSS")</script>  ';
    expect(validateAndSanitizeText(input)).toBe('<p>Hello</p>');
  });

  it('should truncate text after sanitizing', () => {
    const input = '<p>This is a long string</p>';
    expect(validateAndSanitizeText(input, 10)).toBe('<p>This is');
  });
});

describe('validateNumeric', () => {
  it('should return true for valid numbers', () => {
    expect(validateNumeric(50)).toBe(true);
  });

  it('should return false for invalid numbers', () => {
    expect(validateNumeric(110)).toBe(false);
  });
});

describe('containsSuspiciousPatterns', () => {
  it('should return true for suspicious strings', () => {
    expect(containsSuspiciousPatterns('<script>')).toBe(true);
  });

  it('should return false for safe strings', () => {
    expect(containsSuspiciousPatterns('This is safe.')).toBe(false);
  });
});

describe('generateSecureRandomString', () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    it('should generate a string of the specified length', () => {
        expect(generateSecureRandomString(16).length).toBe(16);
    });

    it('should generate a string containing only allowed characters', () => {
        const randomString = generateSecureRandomString(32);
        for (const char of randomString) {
            expect(chars.includes(char)).toBe(true);
        }
    });

    it('should fall back to Math.random and still produce a valid string', () => {
        Object.defineProperty(window, 'crypto', { value: undefined, configurable: true });
        const randomString = generateSecureRandomString(10);
        expect(randomString.length).toBe(10);
        for (const char of randomString) {
            expect(chars.includes(char)).toBe(true);
        }
    });
});

describe('validateUrl', () => {
  it('should return true for valid URLs', () => {
    expect(validateUrl('https://example.com')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(validateUrl('invalid-url')).toBe(false);
  });
});

describe('sanitizeUrl', () => {
  it('should return a valid URL with a trailing slash', () => {
    const url = 'https://example.com';
    expect(sanitizeUrl(url)).toBe('https://example.com/');
  });

  it('should return an empty string for invalid URLs', () => {
    expect(sanitizeUrl('invalid-url')).toBe('');
  });
});

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    const storage: Record<string, string> = {};
    const localStorageMock = {
      getItem: (key: string) => storage[key] || null,
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
      removeItem: (key: string) => {
        delete storage[key];
      },
      clear: () => {
        Object.keys(storage).forEach(key => delete storage[key]);
      },
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, configurable: true });
    vi.spyOn(Date, 'now');
    rateLimiter = new RateLimiter(2, 10000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should allow requests within the limit', () => {
    expect(rateLimiter.isAllowed('user1')).toBe(true);
    expect(rateLimiter.isAllowed('user1')).toBe(true);
  });

  it('should block requests that exceed the limit', () => {
    rateLimiter.isAllowed('user1');
    rateLimiter.isAllowed('user1');
    expect(rateLimiter.isAllowed('user1')).toBe(false);
  });
});