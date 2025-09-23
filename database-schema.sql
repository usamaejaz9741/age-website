-- AGE Website Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create audit_submissions table
CREATE TABLE audit_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- User information
  email VARCHAR(255) NOT NULL,
  
  -- Assessment results
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  band VARCHAR(50) NOT NULL,
  
  -- Dimension scores
  strategy_score INTEGER NOT NULL CHECK (strategy_score >= 0 AND strategy_score <= 100),
  implementation_score INTEGER NOT NULL CHECK (implementation_score >= 0 AND implementation_score <= 100),
  data_score INTEGER NOT NULL CHECK (data_score >= 0 AND data_score <= 100),
  culture_score INTEGER NOT NULL CHECK (culture_score >= 0 AND culture_score <= 100),
  
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
  
  -- Constraints
  CONSTRAINT valid_band CHECK (band IN ('Explorer', 'Experimenter', 'Accelerator'))
);

-- Create indexes for performance
CREATE INDEX idx_audit_submissions_email ON audit_submissions(email);
CREATE INDEX idx_audit_submissions_created_at ON audit_submissions(created_at);
CREATE INDEX idx_audit_submissions_score ON audit_submissions(score);
CREATE INDEX idx_audit_submissions_band ON audit_submissions(band);

-- Enable Row Level Security (RLS)
ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting submissions (public access)
CREATE POLICY "Allow public insert" ON audit_submissions
  FOR INSERT WITH CHECK (true);

-- Create policy for reading submissions (admin only)
CREATE POLICY "Admin read access" ON audit_submissions
  FOR SELECT USING (auth.role() = 'service_role');

-- Create policy for updating submissions (admin only)
CREATE POLICY "Admin update access" ON audit_submissions
  FOR UPDATE USING (auth.role() = 'service_role');

-- Create policy for deleting submissions (admin only)
CREATE POLICY "Admin delete access" ON audit_submissions
  FOR DELETE USING (auth.role() = 'service_role');
