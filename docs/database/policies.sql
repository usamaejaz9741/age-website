-- AGE Website Database Policies
-- This file contains the Row Level Security (RLS) policies and permissions.
-- It reflects the permissive configuration required for the public assessment form.

-- ==============================================
-- 1. RESET POLICIES
-- ==============================================

-- Disable RLS temporarily to allow clean up
ALTER TABLE audit_submissions DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to ensure a clean state
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'audit_submissions')
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON audit_submissions';
  END LOOP;
END $$;

-- Re-enable RLS
ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 2. CREATE PERMISSIVE POLICIES
-- ==============================================

-- Create a permissive policy for anonymous and authenticated users
-- This allows INSERT, SELECT, UPDATE, DELETE for the assessment flow
CREATE POLICY "allow_all_anon"
  ON audit_submissions
  FOR ALL
  TO anon, authenticated
  USING (true)          -- Allows SELECT/UPDATE/DELETE on all rows
  WITH CHECK (true);    -- Allows INSERT/UPDATE on all rows

-- ==============================================
-- 3. GRANT PERMISSIONS
-- ==============================================

-- Grant necessary permissions to anon and authenticated roles
GRANT SELECT, INSERT, UPDATE, DELETE ON audit_submissions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON audit_submissions TO authenticated;

-- Grant usage on the sequence if it exists (for ID generation if not UUID)
-- Note: Table currently uses UUID DEFAULT gen_random_uuid(), so this is optional but good for safety
-- GRANT USAGE ON SEQUENCE audit_submissions_id_seq TO anon;

-- ==============================================
-- 4. VERIFICATION
-- ==============================================

-- Verify the setup
SELECT 'RLS enabled: ' || relrowsecurity AS rls_status
FROM pg_class
WHERE relname = 'audit_submissions';

SELECT
  'Policy: ' || policyname ||
  ' | Roles: ' || roles::text ||
  ' | Command: ' || cmd AS policy_info
FROM pg_policies
WHERE tablename = 'audit_submissions';
