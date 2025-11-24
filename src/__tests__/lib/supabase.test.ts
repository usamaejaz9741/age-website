import { describe, it, expect, vi } from 'vitest';
import {
  isSupabaseConfigured,
  convertToDatabaseFormat,
  convertFromDatabaseFormat,
  DatabaseSubmission,
  ConversionInput,
  ConversionOutput,
} from '../../lib/supabase';

// Mock import.meta.env
vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_SUPABASE_URL: 'https://placeholder.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder',
    },
  },
});

describe('isSupabaseConfigured', () => {
  it('should return false if URL and key are placeholders', () => {
    expect(isSupabaseConfigured()).toBe(false);
  });

  it('should return true if URL and key are valid', () => {
    import.meta.env.VITE_SUPABASE_URL = 'https://real.supabase.co';
    import.meta.env.VITE_SUPABASE_ANON_KEY = 'real-key';
    expect(isSupabaseConfigured()).toBe(true);
  });
});

describe('convertToDatabaseFormat', () => {
  const validInput: ConversionInput = {
    email: 'test@example.com',
    score: 80,
    band: 'Accelerator',
    dimensions: {
      strategy: 85,
      implementation: 75,
      data: 80,
      culture: 90,
    },
    recommendations: ['rec1', 'rec2'],
  };

  it('should convert valid input to database format', () => {
    const result = convertToDatabaseFormat(validInput);
    expect(result.email).toBe('test@example.com');
    expect(result.score).toBe(80);
    expect(result.band).toBe('Accelerator');
    expect(result.strategy_score).toBe(85);
  });

  it('should throw an error for invalid dimension scores', () => {
    const invalidInput: any = { ...validInput, dimensions: { strategy: 'invalid' } };
    expect(() => convertToDatabaseFormat(invalidInput)).toThrow('Invalid dimension scores');
  });

  it('should throw an error for invalid score', () => {
    const invalidInput = { ...validInput, score: 110 };
    expect(() => convertToDatabaseFormat(invalidInput)).toThrow('Invalid score');
  });
});

describe('convertFromDatabaseFormat', () => {
  const validInput: DatabaseSubmission = {
    email: 'test@example.com',
    score: 80,
    band: 'Accelerator',
    strategy_score: 85,
    implementation_score: 75,
    data_score: 80,
    culture_score: 90,
    recommendations: ['rec1', 'rec2'],
  };

  it('should convert valid database submission to user format', () => {
    const result = convertFromDatabaseFormat(validInput);
    expect(result.email).toBe('test@example.com');
    expect(result.score).toBe(80);
    expect(result.band).toBe('Accelerator');
    expect(result.dimensions.strategy).toBe(85);
  });

  it('should throw an error for missing required fields', () => {
    const invalidInput: any = { ...validInput, email: null };
    expect(() => convertFromDatabaseFormat(invalidInput)).toThrow('Invalid database submission');
  });
});
