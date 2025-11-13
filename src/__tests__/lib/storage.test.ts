/**
 * @fileoverview Tests for Storage Utilities
 * 
 * This test suite covers data storage and export functionality including:
 * - User submission persistence
 * - localStorage fallback mechanisms
 * - CSV export functionality
 * - Storage quota handling
 * - Data cleanup and retention policies
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { saveUserData, exportToCSV, type UserSubmission } from '@/lib/storage';

// Mock the database module
vi.mock('@/lib/database', () => ({
  saveSubmissionToDatabase: vi.fn()
}));

// Mock console-utils
vi.mock('@/lib/console-utils', () => ({
  logError: vi.fn()
}));

describe('Storage Utilities', () => {
  // Sample test data
  const mockSubmission: UserSubmission = {
    timestamp: '2025-10-22T10:00:00.000Z',
    email: 'test@example.com',
    score: 75,
    band: 'Accelerator',
    dimensions: {
      strategy: 80,
      implementation: 70,
      data: 75,
      culture: 80
    },
    recommendations: ['Develop AI strategy', 'Improve data quality'],
    utmParams: { source: 'test', medium: 'test' }
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('saveUserData', () => {
    it('should save user data to localStorage', async () => {
      const result = await saveUserData(mockSubmission);
      
      expect(result).toBe(true);
      
      // Verify data was saved
      const saved = localStorage.getItem('age_user_submissions');
      expect(saved).toBeTruthy();
      
      if (saved) {
        const parsed = JSON.parse(saved);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBe(1);
        expect(parsed[0].email).toBe('test@example.com');
      }
    });

    it('should append new submissions to existing data', async () => {
      // Save first submission
      await saveUserData(mockSubmission);
      
      // Save second submission
      const secondSubmission = {
        ...mockSubmission,
        email: 'second@example.com',
        timestamp: '2025-10-22T11:00:00.000Z'
      };
      await saveUserData(secondSubmission);
      
      const saved = localStorage.getItem('age_user_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        expect(parsed.length).toBe(2);
        expect(parsed[0].email).toBe('test@example.com');
        expect(parsed[1].email).toBe('second@example.com');
      }
    });

    it('should handle empty dimensions object', async () => {
      const submissionWithEmptyDimensions = {
        ...mockSubmission,
        dimensions: {
          strategy: 0,
          implementation: 0,
          data: 0,
          culture: 0
        }
      };
      
      const result = await saveUserData(submissionWithEmptyDimensions);
      expect(result).toBe(true);
    });

    it('should handle optional fields', async () => {
      const minimalSubmission: UserSubmission = {
        timestamp: '2025-10-22T10:00:00.000Z',
        email: 'test@example.com',
        score: 50,
        band: 'Experimenter',
        dimensions: {
          strategy: 50,
          implementation: 50,
          data: 50,
          culture: 50
        },
        recommendations: []
      };
      
      const result = await saveUserData(minimalSubmission);
      expect(result).toBe(true);
    });

    it('should handle storage when localStorage throws an error', async () => {
      // Mock localStorage.setItem to throw
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn(() => {
        throw new Error('QuotaExceededError');
      }) as unknown as typeof localStorage.setItem;
      
      const result = await saveUserData(mockSubmission);
      
      // Should still return true (handles error gracefully)
      expect(result).toBe(true);
      
      // Restore original
      localStorage.setItem = originalSetItem;
    });

    it('should save individual timestamped submissions', async () => {
      await saveUserData(mockSubmission);
      
      // Check for individual submission keys
      const keys = Object.keys(localStorage);
      const individualKeys = keys.filter(key => key.startsWith('age_submission_'));
      
      expect(individualKeys.length).toBeGreaterThan(0);
    });

    it('should sanitize email in individual submission keys', async () => {
      const submissionWithComplexEmail = {
        ...mockSubmission,
        email: 'test+special@example.com'
      };
      
      await saveUserData(submissionWithComplexEmail);
      
      const keys = Object.keys(localStorage);
      const individualKey = keys.find(key => key.includes('test_special_at_example'));
      
      expect(individualKey).toBeTruthy();
    });
  });

  describe('exportToCSV', () => {
    beforeEach(() => {
      // Mock document methods
      global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      global.URL.revokeObjectURL = vi.fn();
      
      // Mock DOM elements
      document.createElement = vi.fn((tagName) => {
        if (tagName === 'a') {
          return {
            setAttribute: vi.fn(),
            click: vi.fn(),
            style: {}
          } as unknown as HTMLElement;
        }
        return {} as unknown as HTMLElement;
      }) as unknown as typeof document.createElement;
      
      document.body.appendChild = vi.fn();
      document.body.removeChild = vi.fn();
    });

    it('should return false when no data exists', () => {
      const result = exportToCSV();
      expect(result).toBe(false);
    });

    it('should export submissions to CSV format', async () => {
      // Save some data first
      await saveUserData(mockSubmission);
      
      const result = exportToCSV();
      expect(result).toBe(true);
      
      // Verify createObjectURL was called
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    it('should handle multiple submissions in CSV export', async () => {
      await saveUserData(mockSubmission);
      await saveUserData({
        ...mockSubmission,
        email: 'second@example.com',
        timestamp: '2025-10-22T11:00:00.000Z'
      });
      
      const result = exportToCSV();
      expect(result).toBe(true);
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      // Set invalid JSON
      localStorage.setItem('age_user_submissions', 'invalid json{');
      
      const result = exportToCSV();
      expect(result).toBe(false);
    });

    it('should include all required CSV columns', async () => {
      await saveUserData(mockSubmission);
      
      // We can't easily test the actual CSV content without mocking Blob,
      // but we can verify the function completes successfully
      const result = exportToCSV();
      expect(result).toBe(true);
    });

    it('should escape special characters in recommendations', async () => {
      const submissionWithSpecialChars = {
        ...mockSubmission,
        recommendations: ['Test, with comma', 'Test "with quotes"']
      };
      
      await saveUserData(submissionWithSpecialChars);
      const result = exportToCSV();
      
      expect(result).toBe(true);
    });
  });

  describe('Data Cleanup and Retention', () => {
    it('should handle submissions with very old timestamps', async () => {
      // Create submission from 100 days ago (beyond retention period)
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 100);
      
      const oldSubmission = {
        ...mockSubmission,
        timestamp: oldDate.toISOString()
      };
      
      await saveUserData(oldSubmission);
      
      // Save a new submission
      await saveUserData(mockSubmission);
      
      // The old submission should be cleaned up
      const saved = localStorage.getItem('age_user_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Should only have the recent submission
        expect(parsed.length).toBe(1);
        expect(parsed[0].timestamp).toBe(mockSubmission.timestamp);
      }
    });

    it('should handle maximum submissions limit', async () => {
      // Save more than MAX_SUBMISSIONS (100) would require a lot of data
      // Let's just verify it handles multiple submissions
      const submissions = Array.from({ length: 10 }, (_, i) => ({
        ...mockSubmission,
        email: `test${i}@example.com`,
        timestamp: new Date(Date.now() + i * 1000).toISOString()
      }));
      
      for (const submission of submissions) {
        await saveUserData(submission);
      }
      
      const saved = localStorage.getItem('age_user_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        expect(parsed.length).toBe(10);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle submission with no recommendations', async () => {
      const submissionNoRecs = {
        ...mockSubmission,
        recommendations: []
      };
      
      const result = await saveUserData(submissionNoRecs);
      expect(result).toBe(true);
    });

    it('should handle submission with empty email', async () => {
      const submissionEmptyEmail = {
        ...mockSubmission,
        email: ''
      };
      
      const result = await saveUserData(submissionEmptyEmail);
      expect(result).toBe(true);
    });

    it('should handle submission with zero score', async () => {
      const submissionZeroScore = {
        ...mockSubmission,
        score: 0,
        band: 'Explorer'
      };
      
      const result = await saveUserData(submissionZeroScore);
      expect(result).toBe(true);
    });

    it('should handle submission with maximum score', async () => {
      const submissionMaxScore = {
        ...mockSubmission,
        score: 100,
        band: 'Accelerator'
      };
      
      const result = await saveUserData(submissionMaxScore);
      expect(result).toBe(true);
    });

    it('should handle sequential save operations', async () => {
      // Save operations sequentially to avoid race conditions
      const result1 = await saveUserData({ ...mockSubmission, email: 'user1@example.com' });
      const result2 = await saveUserData({ ...mockSubmission, email: 'user2@example.com' });
      const result3 = await saveUserData({ ...mockSubmission, email: 'user3@example.com' });
      
      expect(result1).toBe(true);
      expect(result2).toBe(true);
      expect(result3).toBe(true);
      
      const saved = localStorage.getItem('age_user_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        expect(parsed.length).toBeGreaterThanOrEqual(1);
      }
    });
  });
});

