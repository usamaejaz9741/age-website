-- Fix database policies for AGE Website
-- Run this SQL in your Supabase SQL Editor

-- First, let's check if the table exists and see current policies
SELECT * FROM information_schema.tables WHERE table_name = 'audit_submissions';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON audit_submissions;
DROP POLICY IF EXISTS "Admin read access" ON audit_submissions;
DROP POLICY IF EXISTS "Admin update access" ON audit_submissions;
DROP POLICY IF EXISTS "Admin delete access" ON audit_submissions;

-- Disable RLS temporarily to test
ALTER TABLE audit_submissions DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows public inserts (for submissions)
CREATE POLICY "Allow public insert" ON audit_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Create a policy that allows public reads (for testing)
CREATE POLICY "Allow public read" ON audit_submissions
  FOR SELECT 
  USING (true);

-- Test the policies
SELECT * FROM audit_submissions LIMIT 1;
