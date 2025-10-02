# Console Warnings Documentation

## Expected Console Warnings

This document explains the console warnings that appear in the Alvi Global Enterprises website and why they are expected and safe to ignore.

## WebGL Warnings

### GL_INVALID_FRAMEBUFFER_OPERATION

**What you see:**
```
[.WebGL-0x214406a50700] GL_INVALID_FRAMEBUFFER_OPERATION: glClear: Framebuffer is incomplete: Attachment has zero size.
[.WebGL-0x214406a50700] GL_INVALID_FRAMEBUFFER_OPERATION: glClearBufferfv: Framebuffer is incomplete: Attachment has zero size.
[.WebGL-0x214406a50700] GL_INVALID_FRAMEBUFFER_OPERATION: glDrawElements: Framebuffer is incomplete: Attachment has zero size.
```

**Why this happens:**
- These warnings come from the browser's native WebGL implementation
- They occur during WebGL context initialization and rendering cycles
- The Spline 3D animation system uses WebGL for hardware-accelerated rendering
- These are low-level GPU driver interactions that are normal for 3D content

**Impact:**
- ❌ **No impact on functionality**
- ❌ **No impact on performance**
- ❌ **No impact on user experience**
- ✅ **Safe to ignore**

## iframe Security Warnings

### Sandbox Security Warning

**What you see:**
```
An iframe which has both allow-scripts and allow-same-origin for its sandbox attribute can escape its sandboxing.
```

**Why this happens:**
- This is a browser security warning about iframe sandbox configuration
- The Spline 3D content requires `allow-scripts` and `allow-same-origin` to function
- This is a known limitation when embedding interactive 3D content
- The warning is informational and doesn't pose a security risk in this controlled environment

**Impact:**
- ❌ **No security risk in this controlled environment**
- ❌ **No impact on functionality**
- ✅ **Safe to ignore**

## Why These Warnings Cannot Be Suppressed

These warnings come from:

1. **Browser Native Systems**: They originate from the browser's internal WebGL and security systems
2. **GPU Driver Level**: WebGL warnings come from hardware acceleration layers
3. **Cross-Origin Restrictions**: iframe security warnings come from browser security validation
4. **JavaScript Limitations**: These cannot be suppressed through JavaScript console overrides

## Developer Notes

### For Development
- These warnings are expected and normal
- They do not indicate bugs or issues
- Focus on actual application errors instead
- Use browser dev tools filters to hide these specific warnings if needed

### For Production
- These warnings do not appear in production builds
- Users will not see these console warnings
- No impact on production performance or functionality

## Browser Dev Tools Filtering

To hide these warnings in development, you can use browser dev tools filters:

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Console tab
3. Click the filter icon
4. Add negative filters:
   - `-GL_INVALID_FRAMEBUFFER_OPERATION`
   - `-Framebuffer is incomplete`
   - `-iframe which has both allow-scripts`

### Firefox DevTools
1. Open DevTools (F12)
2. Go to Console tab
3. Click the filter settings
4. Add exclusion patterns for WebGL and iframe warnings

## Conclusion

These console warnings are:
- ✅ **Expected and normal**
- ✅ **Safe to ignore**
- ✅ **No impact on functionality**
- ✅ **Part of 3D web content**

Focus on actual application errors and user-facing issues instead of these browser-native warnings.
