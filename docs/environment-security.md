# Environment Variables Security Guide

## 🔒 Critical Security Rules

### ❌ NEVER DO THESE
- **NEVER commit `.env` files to version control**
- **NEVER share API keys in chat, email, or documentation**
- **NEVER hardcode secrets in source code**
- **NEVER use production keys in development**
- **NEVER log API keys to console in production**

### ✅ ALWAYS DO THESE
- **ALWAYS use environment variables for secrets**
- **ALWAYS use different keys for different environments**
- **ALWAYS rotate API keys regularly**
- **ALWAYS use secure deployment platforms**
- **ALWAYS validate environment variables on startup**

## 📁 Environment File Structure

### Development Environment
```
.env.local          # Local development (gitignored)
.env.development    # Development environment (gitignored)
```

### Production Environment
```
Vercel Environment Variables  # Production deployment
```

### Template File
```
env.template        # Safe to commit (no real values)
```

## 🛡️ Security Best Practices

### 1. File Permissions
```bash
# Set restrictive permissions on environment files
chmod 600 .env.local
chmod 600 .env.development
```

### 2. Environment Variable Naming
```bash
# Use VITE_ prefix for client-side variables
VITE_GEMINI_API_KEY=your_key_here

# Use standard names for server-side variables
NODE_ENV=development
DATABASE_URL=your_db_url
```

### 3. Validation on Startup
```typescript
// Always validate required environment variables
const requiredEnvVars = [
  'VITE_GEMINI_API_KEY',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
```

## 🔧 Setup Instructions

### Step 1: Create Local Environment File
```bash
# Copy the template
cp env.template .env.local

# Edit with your actual values
nano .env.local
```

### Step 2: Add Your API Keys
```bash
# .env.local
VITE_GEMINI_API_KEY=AIzaSyYourActualKeyHere
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJYourActualKeyHere
VITE_GA_TRACKING_ID=G-YourTrackingID
NODE_ENV=development
```

### Step 3: Verify Git Ignore
```bash
# Check that .env.local is ignored
git status
# Should NOT show .env.local in untracked files
```

### Step 4: Test Environment Variables
```bash
# Start development server
npm run dev

# Check console for environment variable validation
```

## 🚀 Production Deployment

### Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each environment variable:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GA_TRACKING_ID`
   - `NODE_ENV`

### Environment-Specific Values
```bash
# Development
VITE_GEMINI_API_KEY=dev_key_here
VITE_SUPABASE_URL=https://dev-project.supabase.co

# Production
VITE_GEMINI_API_KEY=prod_key_here
VITE_SUPABASE_URL=https://prod-project.supabase.co
```

## 🔍 Security Checklist

### Pre-Deployment
- [ ] All environment variables are in `.gitignore`
- [ ] No `.env` files are tracked by git
- [ ] Production environment variables are set in Vercel
- [ ] Different API keys for development and production
- [ ] Environment variables are validated on startup

### Regular Maintenance
- [ ] Rotate API keys quarterly
- [ ] Review environment variable access
- [ ] Audit who has access to production keys
- [ ] Monitor for exposed secrets in logs
- [ ] Update environment variable documentation

## 🚨 Incident Response

### If API Keys Are Exposed
1. **Immediately rotate the exposed keys**
2. **Check git history for when they were committed**
3. **Remove from git history if possible**
4. **Notify team members**
5. **Update all environments with new keys**
6. **Review access logs for unauthorized usage**

### Emergency Key Rotation
```bash
# 1. Generate new API keys
# 2. Update Vercel environment variables
# 3. Update local .env.local files
# 4. Redeploy application
# 5. Verify functionality
```

## 📊 Environment Variable Security

### Client-Side Variables (VITE_ prefix)
- **Visible to users** in browser
- **Use for non-sensitive configuration**
- **Examples**: API endpoints, feature flags

### Server-Side Variables
- **Not visible to users**
- **Use for sensitive data**
- **Examples**: Database passwords, private API keys

### Validation Functions
```typescript
// Validate environment variables
export function validateEnvironment() {
  const required = {
    VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY
  };

  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return true;
}
```

## 🔐 Advanced Security

### Environment Variable Encryption
```typescript
// For highly sensitive data, consider encryption
import CryptoJS from 'crypto-js';

function decryptEnvVar(encryptedValue: string, key: string): string {
  return CryptoJS.AES.decrypt(encryptedValue, key).toString(CryptoJS.enc.Utf8);
}
```

### Runtime Validation
```typescript
// Validate environment variables at runtime
export function getSecureEnvVar(key: string): string {
  const value = import.meta.env[key];
  
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  
  // Additional validation based on key type
  if (key.includes('URL') && !value.startsWith('https://')) {
    throw new Error(`Environment variable ${key} must use HTTPS`);
  }
  
  return value;
}
```

## 📞 Support

For environment variable security questions:
- **Email**: security@alviglobal.com
- **Documentation**: This file and `docs/security.md`
- **Emergency**: Follow incident response procedures

---

**Remember**: Environment variables are the first line of defense for your application's security. Treat them with the same care as you would treat passwords or credit card information.
