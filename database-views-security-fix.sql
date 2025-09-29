-- AGE Website Database Views Security Fix
-- Run this SQL in your Supabase SQL Editor to secure the views

-- ==============================================
-- 1. SECURE THE VIEWS WITH PROPER RLS
-- ==============================================

-- Drop existing views to recreate with proper security
DROP VIEW IF EXISTS public_submission_stats CASCADE;
DROP VIEW IF EXISTS recent_submissions CASCADE;
DROP VIEW IF EXISTS submission_analytics CASCADE;

-- ==============================================
-- 2. RECREATE VIEWS WITH PROPER SECURITY
-- ==============================================

-- View for public submission statistics (admin only - no sensitive data)
CREATE VIEW public_submission_stats AS
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

-- View for recent submissions (admin only - contains email addresses)
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

-- View for submission analytics (admin only - contains detailed data)
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

-- ==============================================
-- 3. SECURE VIEWS WITH SECURITY DEFINER FUNCTIONS
-- ==============================================

-- Create security definer functions to control access to views
-- This is the proper way to secure views in PostgreSQL

-- Function to get public submission stats (admin only)
CREATE OR REPLACE FUNCTION get_public_submission_stats()
RETURNS TABLE (
  total_submissions BIGINT,
  unique_emails BIGINT,
  avg_score NUMERIC,
  explorer_count BIGINT,
  experimenter_count BIGINT,
  accelerator_count BIGINT,
  submission_date TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  -- Check if user has admin access
  IF auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;
  
  RETURN QUERY
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get recent submissions (admin only)
CREATE OR REPLACE FUNCTION get_recent_submissions()
RETURNS TABLE (
  id UUID,
  email VARCHAR(255),
  score INTEGER,
  band VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE,
  submission_source VARCHAR(50),
  is_processed BOOLEAN
) AS $$
BEGIN
  -- Check if user has admin access
  IF auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;
  
  RETURN QUERY
  SELECT 
    audit_submissions.id,
    audit_submissions.email,
    audit_submissions.score,
    audit_submissions.band,
    audit_submissions.created_at,
    audit_submissions.submission_source,
    audit_submissions.is_processed
  FROM audit_submissions
  WHERE created_at > NOW() - INTERVAL '7 days'
  ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get submission analytics (admin only)
CREATE OR REPLACE FUNCTION get_submission_analytics()
RETURNS TABLE (
  submission_date TIMESTAMP WITH TIME ZONE,
  band VARCHAR(50),
  submission_count BIGINT,
  avg_score NUMERIC,
  avg_strategy_score NUMERIC,
  avg_implementation_score NUMERIC,
  avg_data_score NUMERIC,
  avg_culture_score NUMERIC,
  unique_emails BIGINT
) AS $$
BEGIN
  -- Check if user has admin access
  IF auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;
  
  RETURN QUERY
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================
-- 4. GRANT PROPER PERMISSIONS
-- ==============================================

-- Revoke all existing permissions on views
REVOKE ALL ON public_submission_stats FROM PUBLIC;
REVOKE ALL ON recent_submissions FROM PUBLIC;
REVOKE ALL ON submission_analytics FROM PUBLIC;
REVOKE ALL ON public_submission_stats FROM anon;
REVOKE ALL ON recent_submissions FROM anon;
REVOKE ALL ON submission_analytics FROM anon;
REVOKE ALL ON public_submission_stats FROM authenticated;
REVOKE ALL ON recent_submissions FROM authenticated;
REVOKE ALL ON submission_analytics FROM authenticated;

-- Grant permissions only to service role (admin) for views
GRANT SELECT ON public_submission_stats TO service_role;
GRANT SELECT ON recent_submissions TO service_role;
GRANT SELECT ON submission_analytics TO service_role;

-- Grant execute permissions on security functions to service role only
GRANT EXECUTE ON FUNCTION get_public_submission_stats TO service_role;
GRANT EXECUTE ON FUNCTION get_recent_submissions TO service_role;
GRANT EXECUTE ON FUNCTION get_submission_analytics TO service_role;

-- ==============================================
-- 6. CREATE SECURE PUBLIC STATS VIEW (if needed)
-- ==============================================

-- Create a truly public view with no sensitive data
CREATE VIEW public_anonymous_stats AS
SELECT 
  COUNT(*) as total_submissions,
  ROUND(AVG(score), 2) as avg_score,
  COUNT(*) FILTER (WHERE band = 'Explorer') as explorer_count,
  COUNT(*) FILTER (WHERE band = 'Experimenter') as experimenter_count,
  COUNT(*) FILTER (WHERE band = 'Accelerator') as accelerator_count,
  DATE_TRUNC('day', created_at) as submission_date
FROM audit_submissions
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY submission_date DESC;

-- Grant public access to anonymous stats (no email addresses)
GRANT SELECT ON public_anonymous_stats TO anon;
GRANT SELECT ON public_anonymous_stats TO authenticated;

-- ==============================================
-- 5. VERIFY SECURITY
-- ==============================================

-- Check that views and functions exist
DO $$
BEGIN
  -- Verify views exist
  IF NOT EXISTS (SELECT 1 FROM pg_views WHERE viewname = 'public_submission_stats') THEN
    RAISE EXCEPTION 'public_submission_stats view not found';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_views WHERE viewname = 'recent_submissions') THEN
    RAISE EXCEPTION 'recent_submissions view not found';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_views WHERE viewname = 'submission_analytics') THEN
    RAISE EXCEPTION 'submission_analytics view not found';
  END IF;
  
  -- Verify security functions exist
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_public_submission_stats') THEN
    RAISE EXCEPTION 'get_public_submission_stats function not found';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_recent_submissions') THEN
    RAISE EXCEPTION 'get_recent_submissions function not found';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_submission_analytics') THEN
    RAISE EXCEPTION 'get_submission_analytics function not found';
  END IF;
  
  RAISE NOTICE 'All views and security functions created successfully';
END $$;

-- ==============================================
-- COMPLETION MESSAGE
-- ==============================================

DO $$
BEGIN
  RAISE NOTICE 'Database Views Security Fix completed successfully!';
  RAISE NOTICE 'Security improvements:';
  RAISE NOTICE '- Views are now secured with security definer functions';
  RAISE NOTICE '- Public access removed from sensitive views';
  RAISE NOTICE '- Created secure functions for admin access to analytics';
  RAISE NOTICE '- Created public_anonymous_stats for safe public access';
  RAISE NOTICE '- All sensitive data now requires service_role access';
  RAISE NOTICE '';
  RAISE NOTICE 'Usage:';
  RAISE NOTICE '- Use get_public_submission_stats() for admin stats';
  RAISE NOTICE '- Use get_recent_submissions() for admin recent data';
  RAISE NOTICE '- Use get_submission_analytics() for admin analytics';
  RAISE NOTICE '- Use public_anonymous_stats view for public stats';
END $$;
