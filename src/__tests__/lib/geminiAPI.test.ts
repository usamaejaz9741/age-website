import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeminiAPI } from '@/lib/geminiAPI';
import type { GeminiResponse } from '@/types/gemini';

// Mock the security module
vi.mock('@/lib/security', () => ({
  apiRateLimiter: {
    isAllowed: vi.fn(() => true),
    getRemainingRequests: vi.fn(() => 5),
  },
}));

describe('GeminiAPI', () => {
  let geminiAPI: GeminiAPI;
  let originalEnv: Record<string, unknown>;

  beforeEach(() => {
    // Store original env
    originalEnv = { ...import.meta.env };
    
    // Set up test environment
    import.meta.env.VITE_GEMINI_API_KEY = 'test-api-key';
    import.meta.env.DEV = false;
    
    geminiAPI = new GeminiAPI();
    
    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original env
    Object.assign(import.meta.env, originalEnv);
    vi.restoreAllMocks();
  });

  describe('generateContent - Response Validation', () => {
    it('should throw error when response has missing parts array', async () => {
      // Arrange: Mock response with missing parts array
      const invalidResponse: Partial<GeminiResponse> = {
        candidates: [
          {
            content: {
              parts: undefined as unknown as { text: string }[], // Missing parts
            },
            finishReason: 'STOP',
            index: 0,
            safetyRatings: [],
          },
        ],
        promptFeedback: {
          safetyRatings: [],
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'Invalid response format from Gemini API: missing or empty parts array'
      );
    });

    it('should throw error when response has empty parts array', async () => {
      // Arrange: Mock response with empty parts array
      const invalidResponse: Partial<GeminiResponse> = {
        candidates: [
          {
            content: {
              parts: [], // Empty array
            },
            finishReason: 'STOP',
            index: 0,
            safetyRatings: [],
          },
        ],
        promptFeedback: {
          safetyRatings: [],
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'Invalid response format from Gemini API: missing or empty parts array'
      );
    });

    it('should throw error when parts[0] is missing text property', async () => {
      // Arrange: Mock response with missing text in first part
      const invalidResponse: Partial<GeminiResponse> = {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: undefined as unknown as string, // Missing text
                },
              ],
            },
            finishReason: 'STOP',
            index: 0,
            safetyRatings: [],
          },
        ],
        promptFeedback: {
          safetyRatings: [],
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'Invalid response format from Gemini API: missing text in response'
      );
    });

    it('should throw error when parts[0].text is not a string', async () => {
      // Arrange: Mock response with non-string text
      const invalidResponse: Partial<GeminiResponse> = {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: 123 as unknown as string, // Not a string
                },
              ],
            },
            finishReason: 'STOP',
            index: 0,
            safetyRatings: [],
          },
        ],
        promptFeedback: {
          safetyRatings: [],
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'Invalid response format from Gemini API: missing text in response'
      );
    });

    it('should successfully return text when response is valid', async () => {
      // Arrange: Mock valid response
      const validResponse: Partial<GeminiResponse> = {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: 'Generated AI content',
                },
              ],
            },
            finishReason: 'STOP',
            index: 0,
            safetyRatings: [],
          },
        ],
        promptFeedback: {
          safetyRatings: [],
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => validResponse,
      });

      // Act
      const result = await geminiAPI.generateContent('test prompt');

      // Assert
      expect(result).toBe('Generated AI content');
    });

    it('should throw error when candidates array is missing', async () => {
      // Arrange: Mock response with missing candidates
      const invalidResponse: Partial<GeminiResponse> = {
        candidates: undefined as unknown as GeminiResponse['candidates'],
        promptFeedback: {
          safetyRatings: [],
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'Invalid response format from Gemini API: missing candidates or content'
      );
    });

    it('should throw error when candidates array is empty', async () => {
      // Arrange: Mock response with empty candidates array
      const invalidResponse: Partial<GeminiResponse> = {
        candidates: [],
        promptFeedback: {
          safetyRatings: [],
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'Invalid response format from Gemini API: missing candidates or content'
      );
    });

    it('should throw error when content is missing', async () => {
      // Arrange: Mock response with missing content
      const invalidResponse: Partial<GeminiResponse> = {
        candidates: [
          {
            content: undefined as unknown as { parts: { text: string }[] },
            finishReason: 'STOP',
            index: 0,
            safetyRatings: [],
          },
        ],
        promptFeedback: {
          safetyRatings: [],
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'Invalid response format from Gemini API: missing candidates or content'
      );
    });
  });

  describe('generateContent - API Key Validation', () => {
    it('should throw error when API key is not configured', async () => {
      // Arrange: Create instance without API key
      import.meta.env.VITE_GEMINI_API_KEY = '';
      const apiWithoutKey = new GeminiAPI();

      // Act & Assert
      await expect(apiWithoutKey.generateContent('test prompt')).rejects.toThrow(
        'Gemini API key not configured'
      );
    });
  });

  describe('generateContent - HTTP Error Handling', () => {
    it('should throw specific error for 503 status', async () => {
      // Arrange
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 503,
        text: async () => 'Service unavailable',
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'AI service is temporarily unavailable'
      );
    });

    it('should throw specific error for 429 status', async () => {
      // Arrange
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 429,
        text: async () => 'Too many requests',
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'API rate limit exceeded'
      );
    });

    it('should throw specific error for 401 status', async () => {
      // Arrange
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => 'Unauthorized',
      });

      // Act & Assert
      await expect(geminiAPI.generateContent('test prompt')).rejects.toThrow(
        'API authentication failed'
      );
    });
  });
});

