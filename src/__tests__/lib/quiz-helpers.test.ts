import { describe, it, expect, vi } from 'vitest';
import { calculateResults } from '@/lib/quiz-helpers';
import type { QuizAnswers } from '@/types/quiz';
import type { QuizQuestion } from '@/constants/quiz-questions';

// Mock the quiz-questions module
vi.mock('@/constants/quiz-questions', async () => {
  const original = await vi.importActual<typeof import('@/constants/quiz-questions')>('@/constants/quiz-questions');
  const mockedQuizQuestions: QuizQuestion[] = [
    ...original.quizQuestions,
    {
      id: 'q13',
      dimension: 'strategy' as const,
      question: 'This is an extra question for testing.',
      options: [
        { text: 'Option 1', score: 0 },
        { text: 'Option 2', score: 1 },
        { text: 'Option 3', score: 2 },
        { text: 'Option 4', score: 3 },
      ],
    },
  ];

  return {
    ...original,
    quizQuestions: mockedQuizQuestions,
    getDimensionForQuestion: (questionId: string) => {
      const question = mockedQuizQuestions.find((q) => q.id === questionId);
      return question ? question.dimension : null;
    },
    getQuestionsByDimension: (dimension: 'strategy' | 'implementation' | 'data' | 'culture') => {
      return mockedQuizQuestions.filter((q) => q.dimension === dimension);
    },
  };
});

describe('calculateResults', () => {
  it('should handle empty answers without division by zero error', () => {
    // Arrange: Create empty answers object
    const emptyAnswers: QuizAnswers = {};

    // Act: This would previously cause division by zero (NaN or Infinity)
    const results = calculateResults(emptyAnswers);

    // Assert: Should return sensible defaults instead of NaN
    expect(results.score).toBe(0);
    expect(results.band).toBe('Explorer');
    expect(results.breakdown.strategy).toBe(0);
    expect(results.breakdown.implementation).toBe(0);
    expect(results.breakdown.data).toBe(0);
    expect(results.breakdown.culture).toBe(0);
    
    // Verify no NaN or Infinity values
    expect(isNaN(results.score)).toBe(false);
    expect(isFinite(results.score)).toBe(true);
    expect(Object.values(results.breakdown).every(score => isFinite(score))).toBe(true);
  });

  it('should calculate results correctly with valid answers', () => {
    // Arrange: Create valid quiz answers
    const answers: QuizAnswers = {
      'q1': 2, 'q2': 2, 'q3': 2, // strategy questions
      'q4': 2, 'q5': 2, 'q6': 2, // implementation
      'q7': 2, 'q8': 2, 'q9': 2, // data
      'q10': 2, 'q11': 2, 'q12': 2, // culture
    };

    // Act
    const results = calculateResults(answers);

    // Assert: Should calculate percentage correctly
    // Total score = 12 questions * 2 points = 24
    // Max score = 12 questions * 3 points = 36
    // Percentage = (24 / 36) * 100 = 66.67, rounded = 67
    expect(results.score).toBe(67);
    expect(results.band).toBe('Experimenter');
    expect(isFinite(results.score)).toBe(true);
  });

  it('should fail to calculate dimension breakdown correctly when a dimension has a different number of questions', () => {
    // Arrange: Create answers for a quiz where 'strategy' has 4 questions
    const answers: QuizAnswers = {
      'q1': 2, 'q2': 2, 'q3': 2, // strategy questions
      'q4': 2, 'q5': 2, 'q6': 2, // implementation
      'q7': 2, 'q8': 2, 'q9': 2, // data
      'q10': 2, 'q11': 2, 'q12': 2, // culture
      'q13': 3, // extra strategy question
    };

    // Act
    const results = calculateResults(answers);

    // Assert: Check if the 'strategy' breakdown is calculated incorrectly.
    // The buggy code calculates:
    // Strategy score = 2 + 2 + 2 + 3 = 9
    // Incorrect percentage = Math.round((9 / 9) * 100) = 100

    // The correct calculation should be:
    // Max score for strategy = 4 questions * 3 = 12
    // Correct percentage = Math.round((9 / 12) * 100) = 75

    // This assertion will fail with the buggy code, thus exposing the bug.
    expect(results.breakdown.strategy).toBe(75);
  });
});