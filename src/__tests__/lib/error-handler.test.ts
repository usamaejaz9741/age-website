/**
 * Tests for error handling utilities
 */

import { describe, it, expect, vi } from 'vitest';
import {
  ErrorType,
  ErrorSeverity,
  classifyError,
  determineSeverity,
  createErrorResponse,
  handleAsyncError,
  handleSyncError,
  retryOperation,
  safeJsonParse,
  safeJsonStringify,
  handleErrorBoundary
} from '@/lib/error-handler';

describe('Error Classification', () => {
  describe('classifyError', () => {
    it('should classify network errors', () => {
      const networkError = new Error('Network request failed');
      expect(classifyError(networkError)).toBe(ErrorType.NETWORK);
    });

    it('should classify validation errors', () => {
      const validationError = new Error('Invalid input provided');
      expect(classifyError(validationError)).toBe(ErrorType.VALIDATION);
    });

    it('should classify authentication errors', () => {
      const authError = new Error('Unauthorized access');
      expect(classifyError(authError)).toBe(ErrorType.AUTHENTICATION);
    });

    it('should classify rate limit errors', () => {
      const rateLimitError = new Error('Rate limit exceeded');
      expect(classifyError(rateLimitError)).toBe(ErrorType.RATE_LIMIT);
    });

    it('should classify server errors', () => {
      const serverError = new Error('Internal server error');
      expect(classifyError(serverError)).toBe(ErrorType.SERVER);
    });

    it('should return UNKNOWN for unclassified errors', () => {
      const unknownError = new Error('Some random error');
      expect(classifyError(unknownError)).toBe(ErrorType.UNKNOWN);
    });
  });

  describe('determineSeverity', () => {
    it('should return CRITICAL for server errors', () => {
      expect(determineSeverity(ErrorType.SERVER)).toBe(ErrorSeverity.CRITICAL);
    });

    it('should return HIGH for authentication errors', () => {
      expect(determineSeverity(ErrorType.AUTHENTICATION)).toBe(ErrorSeverity.HIGH);
    });

    it('should return MEDIUM for network errors', () => {
      expect(determineSeverity(ErrorType.NETWORK)).toBe(ErrorSeverity.MEDIUM);
    });

    it('should return LOW for not found errors', () => {
      expect(determineSeverity(ErrorType.NOT_FOUND)).toBe(ErrorSeverity.LOW);
    });
  });
});

describe('Error Response Creation', () => {
  describe('createErrorResponse', () => {
    it('should create error response from Error object', () => {
      const error = new Error('Test error');
      const response = createErrorResponse(error, { context: 'Test' });

      expect(response.type).toBe(ErrorType.UNKNOWN);
      expect(response.message).toBe('Test error');
      expect(response.context).toBe('Test');
      expect(response.timestamp).toBeDefined();
    });

    it('should create error response from string', () => {
      const response = createErrorResponse('String error');

      expect(response.message).toBe('String error');
      expect(response.type).toBe(ErrorType.UNKNOWN);
    });

    it('should use custom message when provided', () => {
      const error = new Error('Original error');
      const response = createErrorResponse(error, { customMessage: 'Custom message' });

      expect(response.message).toBe('Custom message');
    });
  });
});

describe('Async Error Handling', () => {
  describe('handleAsyncError', () => {
    it('should return result when operation succeeds', async () => {
      const operation = vi.fn().mockResolvedValue('success');
      const result = await handleAsyncError(operation, 'fallback');

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledOnce();
    });

    it('should return fallback when operation fails', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));
      const result = await handleAsyncError(operation, 'fallback', { context: 'Test' });

      expect(result).toBe('fallback');
    });

    it('should not log when shouldLog is false', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));
      
      await handleAsyncError(operation, 'fallback', { shouldLog: false });

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});

describe('Sync Error Handling', () => {
  describe('handleSyncError', () => {
    it('should return result when operation succeeds', () => {
      const operation = vi.fn().mockReturnValue('success');
      const result = handleSyncError(operation, 'fallback');

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledOnce();
    });

    it('should return fallback when operation fails', () => {
      const operation = vi.fn().mockImplementation(() => {
        throw new Error('Operation failed');
      });
      const result = handleSyncError(operation, 'fallback');

      expect(result).toBe('fallback');
    });
  });
});

describe('Retry Operation', () => {
  describe('retryOperation', () => {
    it('should succeed on first attempt', async () => {
      const operation = vi.fn().mockResolvedValue('success');
      const result = await retryOperation(operation, 3, 100);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledOnce();
    });

    it('should retry and succeed on second attempt', async () => {
      const operation = vi.fn()
        .mockRejectedValueOnce(new Error('First attempt failed'))
        .mockResolvedValueOnce('success');
      
      const result = await retryOperation(operation, 3, 100);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should throw error after max retries', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('Always fails'));
      
      await expect(retryOperation(operation, 2, 10)).rejects.toThrow('Always fails');
      expect(operation).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });
  });
});

describe('Safe JSON Operations', () => {
  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"key": "value"}', {});
      expect(result).toEqual({ key: 'value' });
    });

    it('should return fallback for invalid JSON', () => {
      const fallback = { error: true };
      const result = safeJsonParse('invalid json', fallback);
      expect(result).toBe(fallback);
    });
  });

  describe('safeJsonStringify', () => {
    it('should stringify valid object', () => {
      const result = safeJsonStringify({ key: 'value' });
      expect(result).toBe('{"key":"value"}');
    });

    it('should return fallback for circular reference', () => {
      const circular: Record<string, unknown> = {};
      circular.self = circular;
      
      const result = safeJsonStringify(circular, '{}');
      expect(result).toBe('{}');
    });
  });
});

describe('Error Boundary Handling', () => {
  describe('handleErrorBoundary', () => {
    it('should create error response for error boundary', () => {
      const error = new Error('Component error');
      const errorInfo = { componentStack: 'Component stack trace' };
      
      const response = handleErrorBoundary(error, errorInfo, 'TestComponent');

      expect(response.type).toBe(ErrorType.UNKNOWN);
      expect(response.message).toBe('Component error');
      expect(response.context).toBe('TestComponent');
      expect(response.details?.componentStack).toBe('Component stack trace');
      expect(response.details?.errorBoundary).toBe(true);
    });
  });
});
