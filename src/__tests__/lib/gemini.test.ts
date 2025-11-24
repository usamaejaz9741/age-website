import { describe, it, expect, vi } from 'vitest';
import { generateQuizAudit, QuizAuditData } from '../../lib/gemini';
import { GeminiAPI } from '../../lib/geminiAPI';

// Mock the GeminiAPI module
vi.mock('../../lib/geminiAPI');
vi.mock('../../lib/console-utils', () => ({
  logError: vi.fn(),
}));

describe('generateQuizAudit', () => {
  const mockValidData: QuizAuditData = {
    email: 'test@example.com',
    score: 80,
    band: 'Accelerator',
    dimensions: {
      strategy: 85,
      implementation: 75,
      data: 80,
      culture: 90,
    },
    quizAnswers: { q1: 1, q2: 2 },
  };

  it('should generate a comprehensive audit for valid data', async () => {
    const mockSuccessResponse = '# Mock Success Response';
    GeminiAPI.prototype.generateContent = vi.fn().mockResolvedValue(mockSuccessResponse);
    const result = await generateQuizAudit(mockValidData);

    expect(result).toBe(mockSuccessResponse);
  });

  it('should return a fallback report if AI generation fails', async () => {
    GeminiAPI.prototype.generateContent = vi.fn().mockRejectedValue(new Error('AI service unavailable'));
    const result = await generateQuizAudit(mockValidData);

    expect(result).toContain('# AI Growth Audit Report');
    expect(result).toContain('Overall AI Maturity: 80%');
  });

  it('should return a fallback report if the response is empty', async () => {
    GeminiAPI.prototype.generateContent = vi.fn().mockResolvedValue('');
    const result = await generateQuizAudit(mockValidData);

    expect(result).toContain('# AI Growth Audit Report');
  });

  it('should throw an error for invalid data', async () => {
    const invalidData: any = { ...mockValidData, email: null };
    await expect(generateQuizAudit(invalidData)).rejects.toThrow('Invalid email address');
  });

  it('should handle request cancellation', async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    GeminiAPI.prototype.generateContent = vi.fn().mockImplementation(async (prompt, signal) => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          resolve('# Mock Success Response');
        }, 2000);

        signal?.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Aborted'));
        });
      });
    });

    const promise = generateQuizAudit(mockValidData, signal);
    abortController.abort();

    await expect(promise).rejects.toThrow('Aborted');
  });
});
