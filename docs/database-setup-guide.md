# Database Setup Guide for AGE Website

This guide will help you set up a database to store audit reports server-side instead of client-side downloads.

## 🎯 Overview

Currently, the AGE website saves audit data to:
- Browser localStorage (client-side)
- Downloads JSON files (client-side)

We'll transition to a proper database solution that stores data server-side.

## 📊 Data Structure

Based on the current implementation, each audit submission contains:

```typescript
interface UserSubmission {
  timestamp: string;           // ISO timestamp
  email: string;              // User email
  score: number;              // Overall AI maturity score (0-100)
  band: string;               // Maturity band (Explorer/Experimenter/Accelerator)
  dimensions: {               // Individual dimension scores
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
  recommendations: string[];   // AI-generated recommendations
  utmParams?: object;         // Marketing attribution
  auditContent?: string;      // Full AI audit report (markdown)
  quizAnswers?: object;       // Individual quiz responses
}
```

## 🗄️ Database Options

### Option 1: PostgreSQL (Recommended)
**Best for**: Production applications, complex queries, data integrity
- ✅ ACID compliance
- ✅ Excellent performance
- ✅ Rich data types (JSON support)
- ✅ Free hosting options (Supabase, Railway, Neon)
- ✅ Great for analytics and reporting

### Option 2: MongoDB
**Best for**: Rapid development, flexible schema
- ✅ Document-based (perfect for our JSON data)
- ✅ Easy to set up
- ✅ Free hosting (MongoDB Atlas)
- ✅ Great for prototyping

### Option 3: SQLite
**Best for**: Simple deployment, single-server setup
- ✅ No server required
- ✅ Perfect for small to medium applications
- ✅ Easy backup and migration
- ✅ Great for development

### Option 4: Supabase (PostgreSQL + Extras)
**Best for**: Full-stack applications with real-time features
- ✅ PostgreSQL database
- ✅ Built-in authentication
- ✅ Real-time subscriptions
- ✅ Auto-generated APIs
- ✅ Free tier available

## 🚀 Recommended Setup: Supabase

I recommend **Supabase** because it provides:
- PostgreSQL database (reliable and scalable)
- Auto-generated REST APIs
- Built-in authentication
- Real-time capabilities
- Free tier (up to 50,000 rows)
- Easy setup and management

## 📋 Implementation Steps

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Choose organization and enter project details:
   - Name: `age-website-db`
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
5. Wait for project to be created (2-3 minutes)

### Step 2: Get Database Credentials
1. Go to Project Settings → Database
2. Copy the following:
   - Project URL
   - API Key (anon/public)
   - Service Role Key (secret)

### Step 3: Create Database Schema
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

-- Create policy for reading submissions (admin only - you'll need to set up auth)
CREATE POLICY "Admin read access" ON audit_submissions
  FOR SELECT USING (auth.role() = 'service_role');
```

### Step 4: Set Up Environment Variables
Create `.env.local` (already exists, add these):

```env
# Existing
VITE_GEMINI_API_KEY=your_gemini_api_key

# New - Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Step 5: Install Dependencies
```bash
npm install @supabase/supabase-js
```

### Step 6: Create Database Client
Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations (if needed)
export const supabaseAdmin = createClient(
  supabaseUrl,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

### Step 7: Update Storage Logic
Replace the current `saveUserData` function in `src/lib/storage.ts` with database calls.


## 🔧 Alternative: Simple Node.js Backend

If you prefer a custom backend instead of Supabase:

### Option A: Express.js + PostgreSQL
```bash
# Create backend directory
mkdir age-website-backend
cd age-website-backend
npm init -y
npm install express pg cors dotenv
npm install -D @types/node @types/express @types/pg typescript ts-node nodemon
```

### Option B: Next.js API Routes
Convert your project to Next.js and use API routes for database operations.

### Option C: Vercel Functions
Use Vercel's serverless functions with a database.

## 📈 Analytics and Reporting

With a database, you can easily create:
- **Dashboard**: Real-time submission metrics
- **Analytics**: Score distributions, popular recommendations
- **Reports**: Weekly/monthly summaries
- **Export**: CSV/Excel exports for analysis
- **API**: REST API for external integrations

## 🔒 Security Considerations

1. **Rate Limiting**: Prevent spam submissions
2. **Input Validation**: Sanitize all user inputs
3. **CORS**: Configure proper CORS policies
4. **Authentication**: Protect admin endpoints
5. **Data Privacy**: Implement GDPR compliance
6. **Backup**: Regular database backups

## 💰 Cost Estimation

### Supabase (Recommended)
- **Free Tier**: 50,000 rows, 500MB storage
- **Pro**: $25/month for 100,000 rows, 8GB storage
- **Perfect for**: Most small to medium applications

### Other Options
- **Railway**: $5/month for PostgreSQL
- **Neon**: Free tier available
- **MongoDB Atlas**: Free tier available
- **PlanetScale**: Free tier available

## 🚀 Next Steps

1. **Choose your database solution** (I recommend Supabase)
2. **Set up the database** following the steps above
3. **Update the storage logic** to use database calls
4. **Test the integration** with a few submissions
5. **Create an admin dashboard** for viewing data
6. **Set up monitoring and backups**

## 📞 Support

If you need help with any of these steps, I can:
- Help you set up the database
- Write the API integration code
- Create the admin dashboard
- Set up monitoring and analytics

Let me know which option you'd like to pursue!
