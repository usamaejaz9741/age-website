import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserSubmission } from '../../lib/storage';
import * as security from '../../lib/security';

// 1. Declare mock variables for the Supabase client chain
const fromMock = vi.fn();
const insertMock = vi.fn();
const selectMock = vi.fn();

// 2. Set up the mock implementations for chaining
insertMock.mockReturnValue({ select: selectMock });
fromMock.mockReturnValue({ insert: insertMock });

// 3. Mock the module dependencies using the variables
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: fromMock,
  },
  convertToDatabaseFormat: vi.fn(submission => submission),
  AUDIT_SUBMISSIONS_TABLE: 'audit_submissions',
}));

vi.mock('../../lib/security');
vi.mock('../../lib/console-utils', () => ({ logError: vi.fn() }));

vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_SUPABASE_URL: 'https://test.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'test-key',
      DEV: true,
    },
  },
});

// 4. Dynamically import the module under test AFTER mocks are set up to avoid hoisting issues
const { saveSubmissionToDatabase } = await import('../../lib/database');

// 5. Describe the test suite
describe('saveSubmissionToDatabase', () => {
  const mockSubmission: UserSubmission = {
    email: 'test@example.com',
    score: 80,
    band: 'Accelerator',
    dimensions: { strategy: 80, implementation: 70, data: 75, culture: 80 },
    recommendations: ['rec1', 'rec2'],
  };

  beforeEach(() => {
    vi.restoreAllMocks();

    // Reset environment variables to prevent state leakage between tests
    import.meta.env.VITE_SUPABASE_URL = 'https://test.supabase.co';
    import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-key';

    // Reset mock implementations for chaining
    insertMock.mockReturnValue({ select: selectMock });
    fromMock.mockReturnValue({ insert: insertMock });

    // Default mock behaviors for a "happy path"
    selectMock.mockResolvedValue({ error: null });
    vi.mocked(security.validateEmail).mockReturnValue(true);
    vi.mocked(security.sanitizeEmail).mockImplementation(email => email);
  });

  it('should save a valid submission to the database', async () => {
    const result = await saveSubmissionToDatabase(mockSubmission);
    expect(result).toBe(true);
    expect(fromMock).toHaveBeenCalledWith('audit_submissions');
    expect(insertMock).toHaveBeenCalled();
    expect(selectMock).toHaveBeenCalled();
  });

  it('should return false if Supabase is not configured', async () => {
    import.meta.env.VITE_SUPABASE_URL = '';
    const result = await saveSubmissionToDatabase(mockSubmission);
    expect(result).toBe(false);
  });

  it('should return false for invalid submission data', async () => {
    const result = await saveSubmissionToDatabase(null as any);
    expect(result).toBe(false);
  });

  it('should return false for an invalid email', async () => {
    vi.mocked(security.validateEmail).mockReturnValue(false);
    const result = await saveSubmissionToDatabase(mockSubmission);
    expect(result).toBe(false);
  });

  it('should return false if the database operation fails', async () => {
    selectMock.mockResolvedValue({ error: new Error('Database error') });
    const result = await saveSubmissionToDatabase(mockSubmission);
    expect(result).toBe(false);
  });
});
