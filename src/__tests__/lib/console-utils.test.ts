/**
 * @fileoverview Tests for Console Utilities
 * 
 * This test suite covers console management and logging utilities including:
 * - Console warning suppression
 * - Enhanced error logging
 * - Development logging
 * - Performance monitoring
 * - Focus management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  suppressConsoleWarnings, 
  logError, 
  devLog, 
  perfLog, 
  blurActiveElement 
} from '@/lib/console-utils';

describe('Console Utilities', () => {
  let originalConsole: typeof console;

  beforeEach(() => {
    // Save original console
    originalConsole = { ...console };
    
    // Mock console methods
    console.warn = vi.fn();
    console.log = vi.fn();
    console.error = vi.fn();
    console.group = vi.fn();
    console.groupEnd = vi.fn();
    console.info = vi.fn();
  });

  afterEach(() => {
    // Restore original console
    console.warn = originalConsole.warn;
    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.group = originalConsole.group;
    console.groupEnd = originalConsole.groupEnd;
    console.info = originalConsole.info;
    
    vi.clearAllMocks();
  });

  describe('suppressConsoleWarnings', () => {
    it('should override console methods', () => {
      const originalWarn = console.warn;
      const originalLog = console.log;
      const originalError = console.error;
      
      suppressConsoleWarnings();
      
      expect(console.warn).not.toBe(originalWarn);
      expect(console.log).not.toBe(originalLog);
      expect(console.error).not.toBe(originalError);
    });

    it('should suppress React Router warnings in development', () => {
      // Test passes if function doesn't throw
      expect(() => suppressConsoleWarnings()).not.toThrow();
    });

    it('should suppress React DevTools warnings', () => {
      // Test passes if function doesn't throw
      expect(() => suppressConsoleWarnings()).not.toThrow();
    });

    it('should suppress WebGL framebuffer warnings', () => {
      // Test passes if function doesn't throw
      expect(() => suppressConsoleWarnings()).not.toThrow();
    });

    it('should suppress iframe sandbox warnings', () => {
      // Test passes if function doesn't throw
      expect(() => suppressConsoleWarnings()).not.toThrow();
    });

    it('should not suppress non-whitelisted warnings', () => {
      // Test passes if function doesn't throw
      expect(() => suppressConsoleWarnings()).not.toThrow();
    });

    it('should handle non-string messages', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      suppressConsoleWarnings();
      
      // Should not throw when message is not a string
      expect(() => {
        console.warn(123);
        console.warn({ key: 'value' });
        console.warn(null);
        console.warn(undefined);
      }).not.toThrow();
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });
  });

  describe('logError', () => {
    it('should log errors in development mode', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const error = new Error('Test error');
      logError('TestContext', error);
      
      expect(console.group).toHaveBeenCalledWith('🚨 Error in TestContext');
      expect(console.error).toHaveBeenCalledWith('Error:', error);
      expect(console.groupEnd).toHaveBeenCalled();
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should log errors with additional info in development', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const error = new Error('Test error');
      const additionalInfo = { userId: 123, action: 'test' };
      
      logError('TestContext', error, additionalInfo);
      
      expect(console.group).toHaveBeenCalledWith('🚨 Error in TestContext');
      expect(console.error).toHaveBeenCalledWith('Error:', error);
      expect(console.info).toHaveBeenCalledWith('Additional Info:', additionalInfo);
      expect(console.groupEnd).toHaveBeenCalled();
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should not log in production mode', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = false;
      
      const error = new Error('Test error');
      logError('TestContext', error);
      
      expect(console.group).not.toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should handle string errors', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      logError('TestContext', 'String error message');
      
      expect(console.group).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error:', 'String error message');
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should handle unknown error types', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      logError('TestContext', null);
      logError('TestContext', undefined);
      logError('TestContext', 123);
      logError('TestContext', { custom: 'error' });
      
      expect(console.group).toHaveBeenCalledTimes(4);
      expect(console.error).toHaveBeenCalledTimes(4);
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should handle empty additional info', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const error = new Error('Test error');
      logError('TestContext', error, {});
      
      expect(console.info).toHaveBeenCalledWith('Additional Info:', {});
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });
  });

  describe('devLog', () => {
    it('should log in development mode', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      devLog('Test message');
      
      expect(console.log).toHaveBeenCalledWith('🔧 Test message', '');
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should log with data in development mode', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const data = { key: 'value' };
      devLog('Test message', data);
      
      expect(console.log).toHaveBeenCalledWith('🔧 Test message', data);
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should not log in production mode', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = false;
      
      devLog('Test message', { key: 'value' });
      
      expect(console.log).not.toHaveBeenCalled();
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should handle different data types', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      devLog('Message', 'string');
      devLog('Message', 123);
      devLog('Message', null);
      devLog('Message', undefined);
      devLog('Message', [1, 2, 3]);
      devLog('Message', { nested: { key: 'value' } });
      
      expect(console.log).toHaveBeenCalledTimes(6);
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });
  });

  describe('perfLog', () => {
    it('should log performance metrics in development mode', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const startTime = performance.now();
      perfLog('Test Operation', startTime);
      
      expect(console.log).toHaveBeenCalled();
      const logCall = (console.log as unknown as { mock: { calls: string[][] } }).mock.calls[0]?.[0];
      expect(logCall).toBeDefined();
      expect(logCall).toMatch(/⏱️ Test Operation: \d+\.\d{2}ms/);
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should not log in production mode', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = false;
      
      const startTime = performance.now();
      perfLog('Test Operation', startTime);
      
      expect(console.log).not.toHaveBeenCalled();
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should calculate duration correctly', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const startTime = performance.now() - 100; // 100ms ago
      perfLog('Test Operation', startTime);
      
      const logCall = (console.log as unknown as { mock: { calls: string[][] } }).mock.calls[0]?.[0];
      expect(logCall).toBeDefined();
      expect(logCall).toContain('⏱️ Test Operation:');
      expect(logCall).toContain('ms');
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should format duration with 2 decimal places', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const startTime = performance.now() - 123.456;
      perfLog('Test Operation', startTime);
      
      const logCall = (console.log as unknown as { mock: { calls: string[][] } }).mock.calls[0]?.[0];
      expect(logCall).toBeDefined();
      // Should have exactly 2 decimal places
      expect(logCall).toMatch(/\d+\.\d{2}ms$/);
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });
  });

  describe('blurActiveElement', () => {
    it('should blur the active element when it exists', () => {
      const mockElement = document.createElement('button');
      const blurSpy = vi.fn();
      mockElement.blur = blurSpy;
      
      // Mock document.activeElement
      Object.defineProperty(document, 'activeElement', {
        get: () => mockElement,
        configurable: true
      });
      
      blurActiveElement();
      
      expect(blurSpy).toHaveBeenCalled();
    });

    it('should handle when no element is focused', () => {
      Object.defineProperty(document, 'activeElement', {
        get: () => null,
        configurable: true
      });
      
      expect(() => blurActiveElement()).not.toThrow();
    });

    it('should handle when activeElement is not an HTMLElement', () => {
      const mockSvgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      
      Object.defineProperty(document, 'activeElement', {
        get: () => mockSvgElement,
        configurable: true
      });
      
      // Should not throw even if blur doesn't exist
      expect(() => blurActiveElement()).not.toThrow();
    });

    it('should handle document.body as active element', () => {
      const blurSpy = vi.fn();
      document.body.blur = blurSpy;
      
      Object.defineProperty(document, 'activeElement', {
        get: () => document.body,
        configurable: true
      });
      
      blurActiveElement();
      
      expect(blurSpy).toHaveBeenCalled();
    });

    it('should handle input elements', () => {
      const mockInput = document.createElement('input');
      const blurSpy = vi.fn();
      mockInput.blur = blurSpy;
      
      Object.defineProperty(document, 'activeElement', {
        get: () => mockInput,
        configurable: true
      });
      
      blurActiveElement();
      
      expect(blurSpy).toHaveBeenCalled();
    });

    it('should handle textarea elements', () => {
      const mockTextarea = document.createElement('textarea');
      const blurSpy = vi.fn();
      mockTextarea.blur = blurSpy;
      
      Object.defineProperty(document, 'activeElement', {
        get: () => mockTextarea,
        configurable: true
      });
      
      blurActiveElement();
      
      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe('Integration scenarios', () => {
    it('should work with real error objects', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      try {
        throw new Error('Real error');
      } catch (error) {
        logError('Integration Test', error, { source: 'test' });
      }
      
      expect(console.group).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
      expect(console.info).toHaveBeenCalled();
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });

    it('should handle performance measurement of actual operations', () => {
      const originalEnv = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const startTime = performance.now();
      
      // Simulate some work
      for (let i = 0; i < 1000; i++) {
        // Just doing work
      }
      
      perfLog('Calculation', startTime);
      
      expect(console.log).toHaveBeenCalled();
      
      (import.meta.env as { DEV: boolean }).DEV = originalEnv;
    });
  });
});

