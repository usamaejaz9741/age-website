# API Documentation

## Overview

The AGE website integrates with several external APIs and services to provide AI-powered functionality and analytics.

## Google Gemini AI API

### Configuration
- **API Key**: Set via `VITE_GEMINI_API_KEY` environment variable
- **Model**: Gemini Pro (gemini-pro)
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`

### Usage
The Gemini API is used to generate personalized AI recommendations based on user assessment data.

### Request Format
```typescript
interface GeminiRequest {
  contents: [{
    parts: [{
      text: string
    }]
  }]
}
```

### Response Format
```typescript
interface GeminiResponse {
  candidates: [{
    content: {
      parts: [{
        text: string
      }]
    },
    finishReason: string,
    index: number,
    safetyRatings: Array<{
      category: string,
      probability: string
    }>
  }],
  promptFeedback: {
    safetyRatings: Array<{
      category: string,
      probability: string
    }>
  }
}
```

## Google Analytics 4 (gtag)

### Configuration
- **Tracking ID**: Configured in HTML head
- **Events Tracked**:
  - Page views
  - Quiz interactions
  - Lead capture
  - UTM parameter attribution

### Event Types
```typescript
// Page view tracking
gtag('event', 'page_view', {
  page_title: string,
  page_location: string,
  ...utmParams
});

// Quiz interaction tracking
gtag('event', 'quiz_start', {
  event_category: 'engagement',
  event_label: 'AI Growth Score Quiz',
  ...utmParams
});

// Lead capture tracking
gtag('event', 'lead_captured', {
  event_category: 'conversion',
  event_label: 'AI Growth Score Email',
  value: number,
  ...utmParams
});
```

## Data Storage

### User Submissions
User assessment data is stored in browser localStorage and optionally sent to server:

```typescript
interface UserSubmission {
  timestamp: string;
  email: string;
  score: number;
  band: string;
  dimensions: {
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
  recommendations: string[];
  utmParams?: { [key: string]: string };
}
```

### Storage Locations
- **Browser Storage**: `localStorage` with key `age_user_submissions`
- **Individual Submissions**: `localStorage` with key `age_submission_{email}_{timestamp}`
- **Server API**: POST to `/api/submissions` (optional)
- **CSV Export**: Downloaded to user's device as `age_submissions_export_{date}.csv`

## Error Handling

### API Errors
- Gemini API errors are caught and logged
- Fallback recommendations are provided if AI generation fails
- User-friendly error messages are displayed

### Network Errors
- Retry logic for failed API calls
- Graceful degradation when services are unavailable
- Offline-friendly error handling

## Rate Limiting

### Gemini API
- Respects Google's rate limits
- Implements exponential backoff for retries
- Caches responses when appropriate

### Analytics
- Batches events to reduce API calls
- Implements sampling for high-traffic scenarios
- Respects user privacy preferences

## Security

### API Keys
- Environment variables for sensitive data
- No hardcoded credentials in source code
- Secure key rotation procedures

### Data Privacy
- GDPR-compliant consent management
- User data encryption in transit
- Secure data storage practices
