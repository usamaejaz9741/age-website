/**
 * @fileoverview Tests for Utility Functions
 * 
 * This test suite covers the utility functions used throughout the application,
 * particularly the cn() function for CSS class management.
 */

import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class strings correctly', () => {
      const result = cn('px-4 py-2', 'bg-blue-500');
      expect(result).toBe('px-4 py-2 bg-blue-500');
    });

    it('should handle conditional classes with objects', () => {
      const result = cn('base-class', { 'active': true, 'disabled': false });
      expect(result).toBe('base-class active');
    });

    it('should override conflicting Tailwind classes', () => {
      // Later class should override earlier class
      const result = cn('px-4', 'px-6');
      expect(result).toBe('px-6');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['px-4', 'py-2'], 'bg-blue-500');
      expect(result).toBe('px-4 py-2 bg-blue-500');
    });

    it('should handle undefined and null values', () => {
      const result = cn('px-4', undefined, null, 'py-2');
      expect(result).toBe('px-4 py-2');
    });

    it('should handle empty strings', () => {
      const result = cn('px-4', '', 'py-2');
      expect(result).toBe('px-4 py-2');
    });

    it('should merge multiple conflicting Tailwind classes correctly', () => {
      // Should keep the last conflicting class
      const result = cn('text-sm text-base text-lg');
      expect(result).toBe('text-lg');
    });

    it('should handle complex conditional combinations', () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn(
        'base-class',
        { 'active-class': isActive },
        { 'disabled-class': isDisabled },
        isActive && 'is-active'
      );
      expect(result).toBe('base-class active-class is-active');
    });

    it('should handle no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle only falsy values', () => {
      const result = cn(undefined, null, false, '');
      expect(result).toBe('');
    });

    it('should merge padding classes correctly', () => {
      // Test Tailwind merge functionality - p-4 should override px-4 and py-4
      const result = cn('px-4 py-4', 'p-6');
      expect(result).toBe('p-6');
    });

    it('should handle responsive classes', () => {
      const result = cn('text-sm md:text-base lg:text-lg');
      expect(result).toBe('text-sm md:text-base lg:text-lg');
    });

    it('should handle hover and state variants', () => {
      const result = cn('bg-blue-500 hover:bg-blue-600 focus:bg-blue-700');
      expect(result).toBe('bg-blue-500 hover:bg-blue-600 focus:bg-blue-700');
    });

    it('should merge color classes with same prefix', () => {
      const result = cn('bg-blue-500', 'bg-red-500');
      expect(result).toBe('bg-red-500');
    });

    it('should handle arbitrary values', () => {
      const result = cn('p-[10px]', 'p-4');
      // Last value wins
      expect(result).toBe('p-4');
    });
  });
});

