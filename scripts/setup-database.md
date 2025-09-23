# Database Setup Instructions

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Choose organization and enter project details:
   - Name: `age-website-db`
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
5. Wait for project to be created (2-3 minutes)

## Step 2: Get Database Credentials

1. Go to Project Settings → Database
2. Copy the following values:
   - Project URL
   - API Key (anon/public)
   - Service Role Key (secret)

## Step 3: Update Environment Variables

Add these to your `.env.local` file:

```env
# Existing
VITE_GEMINI_API_KEY=AIzaSyBJUIIknaCyS_gzrc6I2htz8Dghdav7dT0

# New - Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Step 4: Create Database Schema

Run this SQL in the Supabase SQL Editor:

```sql
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
  
  -- Indexes for performance
  CONSTRAINT valid_band CHECK (band IN ('Explorer', 'Experimenter', 'Accelerator'))
);

-- Create indexes for common queries
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
```

## Step 5: Test the Setup

1. Start the development server: `npm run dev`
2. Go to `/ai-growth-score` and complete a test submission
3. Check the browser console for database save confirmation
4. Verify data in Supabase dashboard


## Troubleshooting

### Database Connection Issues
- Check that all environment variables are set correctly
- Verify the Supabase project is active
- Check the browser console for error messages


### Submissions Not Saving
- Check browser console for error messages
- Verify the insert policy allows public access
- Make sure the table structure matches the code

## Security Notes

1. **Use environment variables** for all sensitive data
2. **Enable RLS** on all tables
3. **Regular backups** of your database
4. **Monitor access** through Supabase dashboard

## Next Steps

1. Set up proper authentication (Supabase Auth)
2. Add rate limiting to prevent spam
3. Create automated backups
4. Set up monitoring and alerts
