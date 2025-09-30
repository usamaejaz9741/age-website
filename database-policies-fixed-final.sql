-- AGE Website Database Policies - FINAL FIXED VERSION
-- Run this SQL in your Supabase SQL Editor
-- This version fixes all NEW reference issues in RLS policies

-- ==============================================
-- 1. CLEANUP EXISTING POLICIES
-- ==============================================

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow public insert" ON audit_submissions;
DROP POLICY IF EXISTS "Admin read access" ON audit_submissions;
DROP POLICY IF EXISTS "Admin update access" ON audit_submissions;
DROP POLICY IF EXISTS "Admin delete access" ON audit_submissions;
DROP POLICY IF EXISTS "Allow public read" ON audit_submissions;
DROP POLICY IF EXISTS "Anonymous insert only" ON audit_submissions;
DROP POLICY IF EXISTS "Authenticated insert only" ON audit_submissions;

-- ==============================================
-- 2. DISABLE RLS TEMPORARILY
-- ==============================================

-- Disable RLS to allow policy recreation
ALTER TABLE audit_submissions DISABLE ROW LEVEL SECURITY;

-- ==============================================
-- 3. RE-ENABLE RLS
-- ==============================================

-- Re-enable RLS
ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 4. CREATE SECURE RLS POLICIES (FIXED)
-- ==============================================

-- Policy for public inserts with basic validation (NO NEW references)
CREATE POLICY "Allow public insert" ON audit_submissions
  FOR INSERT 
  WITH CHECK (
    -- Basic email validation
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    -- Basic score validation
    AND score >= 0 AND score <= 100
    -- Basic band validation
    AND band IN ('Explorer', 'Experimenter', 'Accelerator')
    -- Basic recommendations validation
    AND recommendations IS NOT NULL
    AND array_length(recommendations, 1) > 0
  );

-- Policy for admin reads (service role only)
CREATE POLICY "Admin read access" ON audit_submissions
  FOR SELECT 
  USING (auth.role() = 'service_role');

-- Policy for admin updates (service role only) - NO NEW references
CREATE POLICY "Admin update access" ON audit_submissions
  FOR UPDATE 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Policy for admin deletes (service role only)
CREATE POLICY "Admin delete access" ON audit_submissions
  FOR DELETE 
  USING (auth.role() = 'service_role');

-- ==============================================
-- 5. CREATE ADDITIONAL SECURITY POLICIES
-- ==============================================

-- Policy for anonymous users to insert only
CREATE POLICY "Anonymous insert only" ON audit_submissions
  FOR INSERT 
  TO anon
  WITH CHECK (
    -- Same basic validation as public insert
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND score >= 0 AND score <= 100
    AND band IN ('Explorer', 'Experimenter', 'Accelerator')
    AND recommendations IS NOT NULL
    AND array_length(recommendations, 1) > 0
  );

-- Policy for authenticated users to insert only
CREATE POLICY "Authenticated insert only" ON audit_submissions
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    -- Same basic validation as public insert
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND score >= 0 AND score <= 100
    AND band IN ('Explorer', 'Experimenter', 'Accelerator')
    AND recommendations IS NOT NULL
    AND array_length(recommendations, 1) > 0
  );

-- ==============================================
-- 6. CREATE ROW LEVEL SECURITY FUNCTIONS
-- ==============================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.role() = 'service_role';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check rate limit for email (simplified)
CREATE OR REPLACE FUNCTION check_rate_limit(email_param TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  submission_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO submission_count
  FROM audit_submissions
  WHERE email = email_param
  AND created_at > NOW() - INTERVAL '1 hour';
  
  RETURN submission_count < 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate submission data (for application use)
CREATE OR REPLACE FUNCTION validate_submission(
  email_param TEXT,
  score_param INTEGER,
  band_param TEXT,
  strategy_score_param INTEGER,
  implementation_score_param INTEGER,
  data_score_param INTEGER,
  culture_score_param INTEGER,
  recommendations_param TEXT[]
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check email format
  IF email_param !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN FALSE;
  END IF;
  
  -- Check score consistency
  IF score_param != ROUND((strategy_score_param + implementation_score_param + data_score_param + culture_score_param) / 4.0) THEN
    RETURN FALSE;
  END IF;
  
  -- Check band consistency
  IF NOT (
    (band_param = 'Explorer' AND score_param < 40) OR
    (band_param = 'Experimenter' AND score_param >= 40 AND score_param < 70) OR
    (band_param = 'Accelerator' AND score_param >= 70)
  ) THEN
    RETURN FALSE;
  END IF;
  
  -- Check recommendations
  IF recommendations_param IS NULL OR array_length(recommendations_param, 1) = 0 THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================
-- 7. CREATE SECURITY VIEWS
-- ==============================================

-- View for public submission statistics (no sensitive data)
CREATE OR REPLACE VIEW public_submission_stats AS
SELECT 
  COUNT(*) as total_submissions,
  COUNT(DISTINCT email) as unique_emails,
  ROUND(AVG(score), 2) as avg_score,
  COUNT(*) FILTER (WHERE band = 'Explorer') as explorer_count,
  COUNT(*) FILTER (WHERE band = 'Experimenter') as experimenter_count,
  COUNT(*) FILTER (WHERE band = 'Accelerator') as accelerator_count,
  DATE_TRUNC('day', created_at) as submission_date
FROM audit_submissions
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY submission_date DESC;

-- Grant access to public stats view
GRANT SELECT ON public_submission_stats TO anon;
GRANT SELECT ON public_submission_stats TO authenticated;

-- ==============================================
-- 8. CREATE SECURITY FUNCTIONS FOR API
-- ==============================================

-- Function to safely insert submission (for API use)
CREATE OR REPLACE FUNCTION safe_insert_submission(
  email_param TEXT,
  score_param INTEGER,
  band_param TEXT,
  strategy_score_param INTEGER,
  implementation_score_param INTEGER,
  data_score_param INTEGER,
  culture_score_param INTEGER,
  recommendations_param TEXT[],
  audit_content_param TEXT DEFAULT NULL,
  utm_params_param JSONB DEFAULT NULL,
  quiz_answers_param JSONB DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL,
  referrer_param TEXT DEFAULT NULL,
  ip_address_param INET DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  submission_id UUID;
BEGIN
  -- Validate input using our validation function
  IF NOT validate_submission(
    email_param, score_param, band_param,
    strategy_score_param, implementation_score_param,
    data_score_param, culture_score_param,
    recommendations_param
  ) THEN
    RAISE EXCEPTION 'Invalid submission data';
  END IF;
  
  -- Check rate limit
  IF NOT check_rate_limit(email_param) THEN
    RAISE EXCEPTION 'Rate limit exceeded for email: %', email_param;
  END IF;
  
  -- Insert submission
  INSERT INTO audit_submissions (
    email, score, band,
    strategy_score, implementation_score, data_score, culture_score,
    recommendations, audit_content, utm_params, quiz_answers,
    user_agent, referrer, ip_address
  ) VALUES (
    email_param, score_param, band_param,
    strategy_score_param, implementation_score_param, data_score_param, culture_score_param,
    recommendations_param, audit_content_param, utm_params_param, quiz_answers_param,
    user_agent_param, referrer_param, ip_address_param
  ) RETURNING id INTO submission_id;
  
  RETURN submission_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION safe_insert_submission TO authenticated;
GRANT EXECUTE ON FUNCTION safe_insert_submission TO anon;

-- ==============================================
-- 9. CREATE MONITORING FUNCTIONS
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to service role only
GRANT EXECUTE ON FUNCTION get_submission_stats TO service_role;

-- ==============================================
-- 10. FINAL SECURITY CHECKS
-- ==============================================

-- Verify RLS is enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class 
    WHERE relname = 'audit_submissions' 
    AND relrowsecurity = true
  ) THEN
    RAISE EXCEPTION 'Row Level Security is not enabled on audit_submissions table';
  END IF;
  
  RAISE NOTICE 'Row Level Security verification passed';
END $$;

-- ==============================================
-- COMPLETION MESSAGE
-- ==============================================

DO $$
BEGIN
  RAISE NOTICE 'AGE Website Database Policies created successfully!';
  RAISE NOTICE 'Security features:';
  RAISE NOTICE '- Basic input validation in RLS policies';
  RAISE NOTICE '- Admin-only access to sensitive data';
  RAISE NOTICE '- Public access only for form submissions';
  RAISE NOTICE '- Data integrity constraints';
  RAISE NOTICE '- Security monitoring functions';
  RAISE NOTICE '- NO NEW references in policies (fixed)';
END $$;







