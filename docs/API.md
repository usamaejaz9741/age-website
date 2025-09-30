# 🔌 API Documentation

## Overview

The Alvi Global Enterprises AI Growth Assessment Platform integrates with several external APIs to provide comprehensive functionality. This document outlines all API integrations, endpoints, and usage patterns.

## Table of Contents

- [Supabase Database API](#supabase-database-api)
- [Google Gemini AI API](#google-gemini-ai-api)
- [Calendly Booking API](#calendly-booking-api)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Security](#security)

---

## Supabase Database API

### Overview
Supabase provides our PostgreSQL database with Row-Level Security (RLS) for secure data storage and retrieval.

### Configuration
```typescript
// Environment variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema

#### `user_submissions` Table
```sql
CREATE TABLE user_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  band TEXT NOT NULL CHECK (band IN ('Explorer', 'Experimenter', 'Accelerator')),
  dimensions JSONB NOT NULL,
  recommendations TEXT[],
  audit_content TEXT,
  quiz_answers JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### API Methods

#### `saveUserSubmission(data: UserSubmission)`
Saves user assessment data to the database.

**Parameters:**
```typescript
interface UserSubmission {
  email: string;
  score: number;
  band: 'Explorer' | 'Experimenter' | 'Accelerator';
  dimensions: {
    strategy: number;
    implementation: number;
    data: number;
    people: number;
  };
  recommendations?: string[];
  auditContent?: string;
  quizAnswers?: { [key: string]: number };
  metadata?: {
    userAgent?: string;
    referrer?: string;
  };
}
```

**Returns:** `Promise<{ success: boolean; id?: string; error?: string }>`

**Example:**
```typescript
import { saveUserSubmission } from '@/lib/database';

const result = await saveUserSubmission({
  email: 'user@example.com',
  score: 75,
  band: 'Accelerator',
  dimensions: {
    strategy: 80,
    implementation: 70,
    data: 75,
    people: 80
  },
  recommendations: ['Optimize AI operations', 'Scale initiatives'],
  auditContent: 'Generated audit content...',
  quizAnswers: { 'q1': 4, 'q2': 3 },
  metadata: {
    userAgent: navigator.userAgent,
    referrer: document.referrer
  }
});
```

#### `getUserSubmissions(email: string)`
Retrieves all submissions for a specific email address.

**Parameters:**
- `email: string` - User's email address

**Returns:** `Promise<UserSubmission[]>`

**Example:**
```typescript
import { getUserSubmissions } from '@/lib/database';

const submissions = await getUserSubmissions('user@example.com');
console.log(`Found ${submissions.length} submissions`);
```

### Error Handling
```typescript
try {
  const result = await saveUserSubmission(data);
  if (!result.success) {
    console.error('Database error:', result.error);
  }
} catch (error) {
  console.error('Network error:', error);
}
```

---

## Google Gemini AI API

### Overview
Google Gemini 2.0 Flash provides AI-powered content generation for personalized recommendations and audit reports.

### Configuration
```typescript
// Environment variable
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### API Client

#### `GeminiAPI` Class
```typescript
import { GeminiAPI } from '@/lib/geminiAPI';

const geminiAPI = new GeminiAPI();
```

#### `generateContent(prompt: string, signal?: AbortSignal)`
Generates AI content based on a text prompt.

**Parameters:**
- `prompt: string` - The text prompt for AI generation
- `signal?: AbortSignal` - Optional cancellation signal

**Returns:** `Promise<string>` - Generated AI response

**Example:**
```typescript
import { GeminiAPI } from '@/lib/geminiAPI';

const geminiAPI = new GeminiAPI();

try {
  const prompt = `
    Generate personalized AI recommendations for a business with:
    - Overall Score: 75%
    - Maturity Band: Accelerator
    - Strategy: 80%, Implementation: 70%, Data: 75%, People: 80%
    
    Provide 5 specific, actionable recommendations.
  `;
  
  const recommendations = await geminiAPI.generateContent(prompt);
  console.log('AI Recommendations:', recommendations);
} catch (error) {
  console.error('AI generation failed:', error.message);
}
```

### Rate Limiting
The API includes built-in rate limiting:
- **Limit**: 10 requests per minute per client
- **Window**: 60 seconds
- **Error**: `Rate limit exceeded` when limit is reached

### Error Codes
```typescript
// Common error scenarios
401 - API authentication failed
429 - Rate limit exceeded
503 - Service temporarily unavailable
500 - Internal server error
```

---

## Calendly Booking API

### Overview
Calendly integration provides seamless professional consultation booking directly from the assessment results.

### Configuration
```typescript
// Environment variable
VITE_CALENDLY_USERNAME=your_calendly_username
```

### API Methods

#### `openCalendlyBooking(prefillData?, utmParams?, source?)`
Opens Calendly booking widget in a new tab.

**Parameters:**
```typescript
interface CalendlyPrefillData {
  name?: string;
  email?: string;
  customAnswers?: { [key: string]: string };
}

interface UTMParams {
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
}

function openCalendlyBooking(
  prefillData?: CalendlyPrefillData,
  utmParams?: UTMParams,
  source?: string
): void
```

**Example:**
```typescript
import { openCalendlyBooking } from '@/lib/calendly';

// Basic booking
openCalendlyBooking();

// With user data prefill
openCalendlyBooking(
  {
    name: 'John Doe',
    email: 'john@example.com',
    customAnswers: {
      'a1': 'AI Growth Assessment Results',
      'a2': 'Accelerator Band - 75% Score'
    }
  },
  {
    utmCampaign: 'ai-assessment',
    utmSource: 'age-website',
    utmMedium: 'assessment-results',
    utmContent: 'accelerator-band'
  },
  'AI Assessment Results'
);
```

### URL Structure
The Calendly widget opens with the following URL structure:
```
https://calendly.com/{username}/{event_type}?
  name={name}&
  email={email}&
  a1={custom_answer_1}&
  utm_campaign={campaign}&
  utm_source={source}&
  utm_medium={medium}&
  utm_content={content}
```

---

## Error Handling

### Standardized Error Response
All API methods return consistent error responses:

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}
```

### Error Types
```typescript
enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTH_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  UNKNOWN = 'UNKNOWN_ERROR'
}
```

### Error Handling Example
```typescript
import { handleError } from '@/lib/error-handler';

try {
  const result = await someAPICall();
  // Handle success
} catch (error) {
  const handledError = handleError(error, {
    context: 'API_CALL',
    fallback: 'Something went wrong. Please try again.',
    showToast: true
  });
  
  console.error('API Error:', handledError);
}
```

---

## Rate Limiting

### Implementation
Rate limiting is implemented using a token bucket algorithm:

```typescript
interface RateLimiter {
  isAllowed(clientId: string): boolean;
  getRemainingRequests(clientId: string): number;
  reset(clientId: string): void;
}
```

### Configuration
```typescript
// Default rate limiting settings
const RATE_LIMITS = {
  API_CALLS: {
    requests: 10,
    window: 60000, // 1 minute
  },
  FORM_SUBMISSIONS: {
    requests: 5,
    window: 300000, // 5 minutes
  }
};
```

### Usage
```typescript
import { apiRateLimiter } from '@/lib/security';

const clientId = 'user@example.com';
if (!apiRateLimiter.isAllowed(clientId)) {
  throw new Error('Rate limit exceeded');
}
```

---

## Security

### Authentication
- **Supabase**: Uses Row-Level Security (RLS) policies
- **Gemini API**: API key authentication via headers
- **Calendly**: Public widget (no authentication required)

### Data Validation
All API inputs are validated and sanitized:

```typescript
import { validateEmail, sanitizeHtml } from '@/lib/security';

// Email validation
const isValidEmail = validateEmail('user@example.com');

// HTML sanitization
const cleanContent = sanitizeHtml('<script>alert("xss")</script>Hello');
```

### CSRF Protection
CSRF tokens are generated and validated for form submissions:

```typescript
import { getCSRFTokenForSubmission } from '@/lib/csrf';

const token = getCSRFTokenForSubmission();
formData.append('csrf_token', token);
```

### Security Headers
Production deployment includes security headers:
```http
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Testing

### API Testing
```typescript
// Example API test
describe('Gemini API', () => {
  it('should generate content successfully', async () => {
    const geminiAPI = new GeminiAPI();
    const result = await geminiAPI.generateContent('Test prompt');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
```

### Mocking
For development and testing, API calls can be mocked:

```typescript
// Mock Gemini API response
jest.mock('@/lib/geminiAPI', () => ({
  GeminiAPI: jest.fn().mockImplementation(() => ({
    generateContent: jest.fn().mockResolvedValue('Mock AI response')
  }))
}));
```

---

## Monitoring

### Error Tracking
- Console logging in development
- Error tracking service integration (Sentry) in production
- Analytics events for API failures

### Performance Monitoring
- API response time tracking
- Rate limit hit monitoring
- Error rate monitoring

### Health Checks
```typescript
// API health check endpoint
const healthCheck = async () => {
  const checks = {
    supabase: await checkSupabaseConnection(),
    gemini: await checkGeminiAPI(),
    calendly: await checkCalendlyAccess()
  };
  
  return {
    status: Object.values(checks).every(Boolean) ? 'healthy' : 'unhealthy',
    checks
  };
};
```

---

## Troubleshooting

### Common Issues

#### 1. Supabase Connection Errors
```typescript
// Check environment variables
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// Test connection
const { data, error } = await supabase.from('user_submissions').select('count');
if (error) console.error('Supabase error:', error);
```

#### 2. Gemini API Errors
```typescript
// Check API key
if (!import.meta.env.VITE_GEMINI_API_KEY) {
  throw new Error('Gemini API key not configured');
}

// Handle rate limiting
try {
  const result = await geminiAPI.generateContent(prompt);
} catch (error) {
  if (error.message.includes('rate limit')) {
    // Show user-friendly message
    showToast('Please wait a moment before trying again');
  }
}
```

#### 3. Calendly Integration Issues
```typescript
// Verify username configuration
const username = import.meta.env.VITE_CALENDLY_USERNAME;
if (!username) {
  console.error('Calendly username not configured');
}

// Test widget URL
const testUrl = `https://calendly.com/${username}`;
console.log('Calendly URL:', testUrl);
```

---

## Support

For API-related issues:
- **Documentation**: [https://docs.alviglobal.com/api](https://docs.alviglobal.com/api)
- **Support**: support@alviglobal.com
- **GitHub Issues**: [https://github.com/alviglobal/age-website/issues](https://github.com/alviglobal/age-website/issues)
