# Calendly Integration Guide

This document explains how Calendly is integrated into the AGE Website for booking AI Growth Consultations.

## 🎯 Overview

The AGE Website now uses Calendly for all consultation bookings, providing a seamless scheduling experience for users. The integration includes:

- **New Tab Opening**: All booking buttons open Calendly in a new tab
- **UTM Tracking**: Detailed analytics for marketing attribution
- **Pre-fill Data**: Automatic email pre-filling for better UX
- **Event Tracking**: Google Analytics integration for conversion tracking

## 🔗 Calendly Configuration

### Base URL
```
https://calendly.com/age-meetings/ai-growth-consultation
```

### Default UTM Parameters
- `utm_source`: age-website
- `utm_medium`: web
- `utm_campaign`: ai-growth-consultation

## 📁 Files Created/Modified

### New Files
1. **`src/lib/calendly.ts`** - Calendly utility functions and configuration
2. **`docs/calendly-integration.md`** - This documentation file

### Modified Files
1. **`src/components/GrowthAuditModal.tsx`** - Updated to use Calendly new tab
2. **`src/components/AIGrowthResults.tsx`** - Updated booking button to use Calendly
3. **`src/components/Header.tsx`** - Updated header CTA buttons
4. **`src/components/Hero.tsx`** - Updated hero section button text

## 🛠️ Implementation Details

### Calendly Utility Functions

#### `openCalendlyBooking(prefill?, utm?, eventLabel?)`
Opens Calendly in a new tab with optional pre-fill data and UTM tracking.

```typescript
openCalendlyBooking(
  {
    email: 'user@example.com'
  },
  {
    utmCampaign: 'ai-growth-score-results',
    utmSource: 'age-website',
    utmMedium: 'assessment'
  },
  'AI Growth Score Results'
);
```

#### `generateCalendlyUrl(prefill?, utm?)`
Generates a complete Calendly URL with parameters.

### UTM Tracking by Location

| Location | Campaign | Source | Medium | Content |
|----------|----------|--------|--------|---------|
| Header CTA | header-cta | age-website | header | book-consultation |
| Hero Section | growth-audit-modal | age-website | modal | hero-cta |
| AI Results | ai-growth-score-results | age-website | assessment | score-{score}-band-{band} |

### Pre-fill Data

The integration automatically pre-fills user email when available:
- **AI Growth Results**: Uses the email from the assessment
- **Other locations**: No pre-fill (user enters manually)

## 📊 Analytics Integration

### Google Analytics Events

The integration tracks the following events:

1. **`calendly_popup_opened`**
   - Category: engagement
   - Label: Location-specific (e.g., "AI Growth Score Results")
   - Value: 1

2. **`calendly_new_tab_opened`**
   - Category: engagement
   - Label: Location-specific
   - Value: 1

### Event Parameters
- `event_category`: engagement
- `event_label`: Specific to the location/context
- `value`: 1 (for conversion tracking)

## 🎨 UI/UX Improvements

### Button Updates
- **Text**: Changed from "Book Growth Audit" to "Book Free Consultation"
- **Icons**: Added Calendar and ExternalLink icons for clarity
- **Styling**: Consistent with existing design system

### Modal Updates
- **Simplified**: Removed complex form, now shows Calendly popup
- **Content**: Updated to focus on AI Growth Consultation
- **Benefits**: Clear value proposition for the consultation

## 🔧 Technical Implementation

### Script Loading
The Calendly script is loaded dynamically when needed:
```javascript
const script = document.createElement('script');
script.src = 'https://assets.calendly.com/assets/external/widget.js';
script.async = true;
document.head.appendChild(script);
```

### TypeScript Support
Global types are declared for Calendly:
```typescript
declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: any) => void;
      initInlineWidget: (options: any) => void;
    };
  }
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Header CTA opens Calendly popup
- [ ] Hero section button opens modal, then Calendly popup
- [ ] AI Results page button opens Calendly popup
- [ ] UTM parameters are correctly passed
- [ ] Email pre-fill works on AI Results page
- [ ] Google Analytics events are fired
- [ ] Mobile responsiveness works correctly

### Test URLs
- Header CTA: Check UTM parameters include `utm_campaign=header-cta`
- Hero Modal: Check UTM parameters include `utm_campaign=growth-audit-modal`
- AI Results: Check UTM parameters include `utm_campaign=ai-growth-score-results`

## 🚀 Deployment

### Environment Variables
No additional environment variables are required for Calendly integration.

### Build Process
The integration is included in the standard build process:
```bash
npm run build
```

### Verification
After deployment, verify:
1. Calendly popup opens correctly
2. UTM parameters are tracked in Calendly dashboard
3. Google Analytics events are recorded
4. Mobile experience works properly

## 📈 Monitoring

### Calendly Dashboard
Monitor booking conversions in your Calendly dashboard:
- Total bookings by source
- UTM parameter performance
- Conversion rates by campaign

### Google Analytics
Track engagement metrics:
- `calendly_popup_opened` events
- Conversion funnel from page views to bookings
- Performance by UTM campaign

## 🔄 Future Enhancements

### Potential Improvements
1. **Inline Widget**: Add option for embedded Calendly widget
2. **Custom Styling**: Match Calendly styling to brand colors
3. **Advanced Pre-fill**: Include more user data (company, role, etc.)
4. **A/B Testing**: Test different CTA text and placement
5. **Retargeting**: Add Facebook Pixel events for retargeting

### Integration Options
- **CRM Integration**: Connect Calendly to your CRM system
- **Email Automation**: Set up follow-up email sequences
- **Calendar Sync**: Ensure availability is always up-to-date

## 📞 Support

For issues with the Calendly integration:
1. Check browser console for JavaScript errors
2. Verify Calendly URL is correct
3. Test UTM parameters in Calendly dashboard
4. Check Google Analytics for event tracking

## 📝 Changelog

### v1.0.0 (Current)
- ✅ Initial Calendly integration
- ✅ Popup widget implementation
- ✅ UTM tracking setup
- ✅ Google Analytics integration
- ✅ Email pre-fill functionality
- ✅ Mobile-responsive design
- ✅ TypeScript support
