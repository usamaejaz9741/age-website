/**
 * Tests for type guard utilities
 */

import { describe, it, expect } from 'vitest';
import {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isValidEmail,
  isValidUrl,
  isValidScore,
  isValidBand,
  isValidDimensionScores,
  isValidQuizAnswers,
  isValidUserSubmission
} from '@/lib/type-guards';

describe('Basic Type Guards', () => {
  describe('isString', () => {
    it('should return true for valid strings', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
      expect(isString('123')).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should return true for valid numbers', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-123)).toBe(true);
      expect(isNumber(123.45)).toBe(true);
    });

    it('should return false for non-numbers', () => {
      expect(isNumber('123')).toBe(false);
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber(Infinity)).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('should return true for valid booleans', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('should return false for non-booleans', () => {
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean(null)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('should return true for valid objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: 'value' })).toBe(true);
      expect(isObject(new Date())).toBe(true);
    });

    it('should return false for non-objects', () => {
      expect(isObject(null)).toBe(false);
      expect(isObject([])).toBe(false);
      expect(isObject('string')).toBe(false);
      expect(isObject(123)).toBe(false);
    });
  });

  describe('isArray', () => {
    it('should return true for valid arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray(['a', 'b', 'c'])).toBe(true);
    });

    it('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false);
      expect(isArray('string')).toBe(false);
      expect(isArray(123)).toBe(false);
      expect(isArray(null)).toBe(false);
    });
  });
});

describe('String Validation Type Guards', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail(123)).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://subdomain.example.com/path')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl(123)).toBe(false);
    });
  });
});

describe('Application-Specific Type Guards', () => {
  describe('isValidScore', () => {
    it('should return true for valid scores', () => {
      expect(isValidScore(0)).toBe(true);
      expect(isValidScore(50)).toBe(true);
      expect(isValidScore(100)).toBe(true);
    });

    it('should return false for invalid scores', () => {
      expect(isValidScore(-1)).toBe(false);
      expect(isValidScore(101)).toBe(false);
      expect(isValidScore('50')).toBe(false);
      expect(isValidScore(null)).toBe(false);
    });
  });

  describe('isValidBand', () => {
    it('should return true for valid bands', () => {
      expect(isValidBand('Explorer')).toBe(true);
      expect(isValidBand('Experimenter')).toBe(true);
      expect(isValidBand('Accelerator')).toBe(true);
    });

    it('should return false for invalid bands', () => {
      expect(isValidBand('Invalid')).toBe(false);
      expect(isValidBand('explorer')).toBe(false);
      expect(isValidBand(123)).toBe(false);
      expect(isValidBand(null)).toBe(false);
    });
  });

  describe('isValidDimensionScores', () => {
    it('should return true for valid dimension scores', () => {
      const validScores = {
        strategy: 80,
        implementation: 70,
        data: 75,
        culture: 85
      };
      expect(isValidDimensionScores(validScores)).toBe(true);
    });

    it('should return false for invalid dimension scores', () => {
      expect(isValidDimensionScores({})).toBe(false);
      expect(isValidDimensionScores({
        strategy: 80,
        implementation: 70,
        data: 75
        // missing culture
      })).toBe(false);
      expect(isValidDimensionScores({
        strategy: 80,
        implementation: 70,
        data: 75,
        culture: 'invalid'
      })).toBe(false);
    });
  });

  describe('isValidQuizAnswers', () => {
    it('should return true for valid quiz answers', () => {
      const validAnswers = {
        q1: 2,
        q2: 1,
        q3: 3,
        q4: 0
      };
      expect(isValidQuizAnswers(validAnswers)).toBe(true);
    });

    it('should return false for invalid quiz answers', () => {
      expect(isValidQuizAnswers({})).toBe(false);
      expect(isValidQuizAnswers({
        q1: 4, // invalid score
        q2: 1
      })).toBe(false);
      expect(isValidQuizAnswers({
        q1: '2', // string instead of number
        q2: 1
      })).toBe(false);
    });
  });

  describe('isValidUserSubmission', () => {
    it('should return true for valid user submission', () => {
      const validSubmission = {
        email: 'test@example.com',
        score: 75,
        band: 'Accelerator',
        dimensions: {
          strategy: 80,
          implementation: 70,
          data: 75,
          culture: 85
        },
        recommendations: ['Develop AI strategy', 'Improve data governance']
      };
      expect(isValidUserSubmission(validSubmission)).toBe(true);
    });

    it('should return false for invalid user submission', () => {
      expect(isValidUserSubmission({})).toBe(false);
      expect(isValidUserSubmission({
        email: 'invalid-email',
        score: 75,
        band: 'Accelerator',
        dimensions: {
          strategy: 80,
          implementation: 70,
          data: 75,
          culture: 85
        },
        recommendations: ['Develop AI strategy']
      })).toBe(false);
    });
  });
});
