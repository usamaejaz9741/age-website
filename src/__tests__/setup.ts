/**
 * @fileoverview Test Setup Configuration - Vitest Testing Environment
 * 
 * This file configures the testing environment for Vitest and provides
 * global test utilities, mocks, and environment setup for consistent
 * testing across all test files.
 * 
 * @features
 * - 🧪 Jest-DOM matchers integration for better assertions
 * - 🧹 Automatic cleanup after each test
 * - 🌍 Mock environment variables for testing
 * - 📱 Browser API mocks (matchMedia, IntersectionObserver, etc.)
 * - 🔐 Crypto API mocks for secure testing
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

/**
 * Extend Vitest's expect with jest-dom matchers
 * Provides additional assertion methods for DOM testing
 */
expect.extend(matchers);

/**
 * Cleanup after each test
 * Ensures React components are properly unmounted and cleaned up
 */
afterEach(() => {
  cleanup();
});

/**
 * Mock environment variables for testing
 * Provides consistent environment configuration across all tests
 */
Object.defineProperty(import.meta, 'env', {
  value: {
    DEV: true,
    PROD: false,
    VITE_GEMINI_API_KEY: 'test-api-key',
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-anon-key'
  },
  writable: true
});

/**
 * Mock window.matchMedia for responsive design testing
 * Provides consistent media query behavior in test environment
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

/**
 * Mock IntersectionObserver for scroll-based animations
 * Allows testing of components that use intersection observer
 */
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

/**
 * Mock ResizeObserver for responsive component testing
 * Provides consistent resize behavior in test environment
 */
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

/**
 * Mock crypto.getRandomValues for secure random number generation
 * Provides deterministic random values for consistent testing
 */
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: vi.fn().mockImplementation((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    })
  }
});
