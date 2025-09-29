-- AGE Website Database Schema - FINAL FIXED VERSION
-- Run this SQL in your Supabase SQL Editor
-- This version fixes all index and policy issues

-- ==============================================
-- 1. CREATE AUDIT SUBMISSIONS TABLE
-- ==============================================

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS audit_submissions CASCADE;

-- Create audit_submissions table with enhanced constraints
CREATE TABLE audit_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- User information with enhanced validation
  email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  
  -- Assessment results with enhanced validation
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  band VARCHAR(50) NOT NULL CHECK (band IN ('Explorer', 'Experimenter', 'Accelerator')),
  
  -- Dimension scores with enhanced validation
  strategy_score INTEGER NOT NULL CHECK (strategy_score >= 0 AND strategy_score <= 100),
  implementation_score INTEGER NOT NULL CHECK (implementation_score >= 0 AND implementation_score <= 100),
  data_score INTEGER NOT NULL CHECK (data_score >= 0 AND data_score <= 100),
  culture_score INTEGER NOT NULL CHECK (culture_score >= 0 AND culture_score <= 100),
  
  -- AI-generated content with validation
  recommendations TEXT[] NOT NULL CHECK (array_length(recommendations, 1) > 0),
  audit_content TEXT CHECK (length(audit_content) <= 50000), -- Limit content size
  
  -- Marketing and tracking with validation
  utm_params JSONB CHECK (jsonb_typeof(utm_params) = 'object'),
  quiz_answers JSONB CHECK (jsonb_typeof(quiz_answers) = 'object'),
  
  -- Metadata with validation
  user_agent TEXT CHECK (length(user_agent) <= 1000),
  referrer TEXT CHECK (length(referrer) <= 2000),
  ip_address INET,
  
  -- Additional fields for better data management
  submission_source VARCHAR(50) DEFAULT 'website' CHECK (submission_source IN ('website', 'api', 'admin')),
  is_processed BOOLEAN DEFAULT FALSE,
  processing_notes TEXT,
  
  -- Data retention and cleanup
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '2 years'),
  
  -- Constraints for data integrity
  CONSTRAINT valid_score_consistency CHECK (
    score = ROUND((strategy_score + implementation_score + data_score + culture_score) / 4.0)
  ),
  CONSTRAINT valid_band_score_consistency CHECK (
    (band = 'Explorer' AND score < 40) OR
    (band = 'Experimenter' AND score >= 40 AND score < 70) OR
    (band = 'Accelerator' AND score >= 70)
  )
);

-- ==============================================
-- 2. CREATE PERFORMANCE INDEXES
-- ==============================================

-- Basic indexes
CREATE INDEX idx_audit_submissions_email ON audit_submissions(email);
CREATE INDEX idx_audit_submissions_created_at ON audit_submissions(created_at);
CREATE INDEX idx_audit_submissions_score ON audit_submissions(score);
CREATE INDEX idx_audit_submissions_band ON audit_submissions(band);
CREATE INDEX idx_audit_submissions_updated_at ON audit_submissions(updated_at);

-- Composite indexes for common query patterns
CREATE INDEX idx_audit_submissions_email_created ON audit_submissions(email, created_at DESC);
CREATE INDEX idx_audit_submissions_band_score ON audit_submissions(band, score DESC);
CREATE INDEX idx_audit_submissions_created_band ON audit_submissions(created_at DESC, band);
CREATE INDEX idx_audit_submissions_source_created ON audit_submissions(submission_source, created_at DESC);

-- Partial indexes for better performance (NO dynamic functions)
CREATE INDEX idx_audit_submissions_high_scores ON audit_submissions(score DESC, created_at DESC) 
  WHERE score >= 80;
CREATE INDEX idx_audit_submissions_unprocessed ON audit_submissions(created_at DESC) 
  WHERE is_processed = FALSE;

-- JSONB indexes for efficient querying
CREATE INDEX idx_audit_submissions_utm_params ON audit_submissions USING GIN (utm_params);
CREATE INDEX idx_audit_submissions_quiz_answers ON audit_submissions USING GIN (quiz_answers);

-- Text search indexes
CREATE INDEX idx_audit_submissions_audit_content_search ON audit_submissions 
  USING GIN (to_tsvector('english', audit_content));

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
CREATE TRIGGER update_audit_submissions_updated_at 
  BEFORE UPDATE ON audit_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- 4. CREATE CLEANUP FUNCTION
-- ==============================================

-- Function to clean up expired records
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

-- ==============================================
-- 5. ENABLE ROW LEVEL SECURITY
-- ==============================================

-- Enable RLS on main table
ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 6. CREATE SECURE RLS POLICIES
-- ==============================================

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow public insert" ON audit_submissions;
DROP POLICY IF EXISTS "Admin read access" ON audit_submissions;
DROP POLICY IF EXISTS "Admin update access" ON audit_submissions;
DROP POLICY IF EXISTS "Admin delete access" ON audit_submissions;
DROP POLICY IF EXISTS "Allow public read" ON audit_submissions;
DROP POLICY IF EXISTS "Anonymous insert only" ON audit_submissions;
DROP POLICY IF EXISTS "Authenticated insert only" ON audit_submissions;

-- Policy for public inserts (form submissions) - SIMPLIFIED
CREATE POLICY "Allow public insert" ON audit_submissions
  FOR INSERT 
  WITH CHECK (
    -- Basic validation only - complex validation moved to application layer
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND score >= 0 AND score <= 100
    AND band IN ('Explorer', 'Experimenter', 'Accelerator')
    AND recommendations IS NOT NULL
    AND array_length(recommendations, 1) > 0
  );

-- Policy for admin reads (service role only)
CREATE POLICY "Admin read access" ON audit_submissions
  FOR SELECT 
  USING (auth.role() = 'service_role');

-- Policy for admin updates (service role only) - SIMPLIFIED
CREATE POLICY "Admin update access" ON audit_submissions
  FOR UPDATE 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Policy for admin deletes (service role only)
CREATE POLICY "Admin delete access" ON audit_submissions
  FOR DELETE 
  USING (auth.role() = 'service_role');

-- ==============================================
-- 7. CREATE VIEWS FOR ANALYTICS
-- ==============================================

-- View for submission analytics
CREATE VIEW submission_analytics AS
SELECT 
  DATE_TRUNC('day', created_at) as submission_date,
  band,
  COUNT(*) as submission_count,
  AVG(score) as avg_score,
  AVG(strategy_score) as avg_strategy_score,
  AVG(implementation_score) as avg_implementation_score,
  AVG(data_score) as avg_data_score,
  AVG(culture_score) as avg_culture_score,
  COUNT(DISTINCT email) as unique_emails
FROM audit_submissions
WHERE created_at > NOW() - INTERVAL '90 days'
GROUP BY DATE_TRUNC('day', created_at), band
ORDER BY submission_date DESC, band;

-- View for recent submissions
CREATE VIEW recent_submissions AS
SELECT 
  id,
  email,
  score,
  band,
  created_at,
  submission_source,
  is_processed
FROM audit_submissions
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- ==============================================
-- 8. CREATE FUNCTIONS FOR COMMON OPERATIONS
-- ==============================================

-- Function to get submission statistics
CREATE OR REPLACE FUNCTION get_submission_stats(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
  total_submissions BIGINT,
  unique_emails BIGINT,
  avg_score NUMERIC,
  explorer_count BIGINT,
  experimenter_count BIGINT,
  accelerator_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_submissions,
    COUNT(DISTINCT email) as unique_emails,
    ROUND(AVG(score), 2) as avg_score,
    COUNT(*) FILTER (WHERE band = 'Explorer') as explorer_count,
    COUNT(*) FILTER (WHERE band = 'Experimenter') as experimenter_count,
    COUNT(*) FILTER (WHERE band = 'Accelerator') as accelerator_count
  FROM audit_submissions
  WHERE created_at > NOW() - (days_back || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

-- Function to mark submission as processed
CREATE OR REPLACE FUNCTION mark_submission_processed(
  submission_id UUID,
  notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE audit_submissions 
  SET 
    is_processed = TRUE,
    processing_notes = notes,
    updated_at = NOW()
  WHERE id = submission_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- ==============================================
-- 9. GRANT PERMISSIONS
-- ==============================================

-- Grant permissions to authenticated users for inserts
GRANT INSERT ON audit_submissions TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant permissions to service role for all operations
GRANT ALL ON audit_submissions TO service_role;
GRANT ALL ON submission_analytics TO service_role;
GRANT ALL ON recent_submissions TO service_role;
GRANT EXECUTE ON FUNCTION get_submission_stats TO service_role;
GRANT EXECUTE ON FUNCTION mark_submission_processed TO service_role;
GRANT EXECUTE ON FUNCTION cleanup_expired_submissions TO service_role;

-- ==============================================
-- COMPLETION MESSAGE
-- ==============================================

-- Display completion message
DO $$
BEGIN
  RAISE NOTICE 'AGE Website Database Schema created successfully!';
  RAISE NOTICE 'Features included:';
  RAISE NOTICE '- Enhanced security with proper RLS policies';
  RAISE NOTICE '- Performance optimization with strategic indexes';
  RAISE NOTICE '- Data integrity with comprehensive constraints';
  RAISE NOTICE '- Simplified policies to avoid NEW reference issues';
  RAISE NOTICE '- Analytics views and functions';
  RAISE NOTICE '- Automatic cleanup of expired data';
END $$;





