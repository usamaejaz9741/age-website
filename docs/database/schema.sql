-- AGE Website Database Schema
-- This file contains the table definitions, indexes, and triggers.

-- ==============================================
-- 1. CREATE AUDIT SUBMISSIONS TABLE
-- ==============================================

-- Drop table if exists (for clean setup)
-- DROP TABLE IF EXISTS audit_submissions CASCADE;

-- Create audit_submissions table
CREATE TABLE IF NOT EXISTS audit_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- User information
  email VARCHAR(255) NOT NULL,
  
  -- Assessment results
  score INTEGER NOT NULL,
  band VARCHAR(50) NOT NULL,
  
  -- Dimension scores
  strategy_score INTEGER NOT NULL,
  implementation_score INTEGER NOT NULL,
  data_score INTEGER NOT NULL,
  culture_score INTEGER NOT NULL,
  
  -- AI-generated content
  recommendations TEXT[] NOT NULL,
  audit_content TEXT,
  
  -- Marketing and tracking
  utm_params JSONB,
  quiz_answers JSONB,
  
  -- Metadata
  user_agent TEXT,
  referrer TEXT,
  ip_address INET,
  
  -- Additional fields
  submission_source VARCHAR(50) DEFAULT 'website',
  is_processed BOOLEAN DEFAULT FALSE,
  processing_notes TEXT,
  
  -- Data retention
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '2 years')
);

-- ==============================================
-- 2. CREATE PERFORMANCE INDEXES
-- ==============================================

CREATE INDEX IF NOT EXISTS idx_audit_submissions_email ON audit_submissions(email);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_created_at ON audit_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_score ON audit_submissions(score);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_band ON audit_submissions(band);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_updated_at ON audit_submissions(updated_at);

-- Composite indexes
CREATE INDEX IF NOT EXISTS idx_audit_submissions_email_created ON audit_submissions(email, created_at DESC);

-- JSONB indexes
CREATE INDEX IF NOT EXISTS idx_audit_submissions_utm_params ON audit_submissions USING GIN (utm_params);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_quiz_answers ON audit_submissions USING GIN (quiz_answers);

-- ==============================================
-- 3. CREATE TRIGGERS
-- ==============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updating updated_at
DROP TRIGGER IF EXISTS update_audit_submissions_updated_at ON audit_submissions;
CREATE TRIGGER update_audit_submissions_updated_at 
  BEFORE UPDATE ON audit_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- 4. CLEANUP FUNCTION
-- ==============================================

CREATE OR REPLACE FUNCTION cleanup_expired_submissions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM audit_submissions 
  WHERE expires_at < NOW() 
  AND created_at < NOW() - INTERVAL '2 years';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$ language 'plpgsql';
