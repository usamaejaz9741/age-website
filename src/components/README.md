# Enhanced Template Components

This directory contains enhanced reusable template components that ensure consistency, accessibility, and performance across all pages.

## PageTemplate

The enhanced page wrapper that provides comprehensive structure with SEO optimization, accessibility features, and enhanced functionality.

### Basic Usage
```tsx
import PageTemplate from "@/components/PageTemplate";

const YourPage = () => {
  return (
    <PageTemplate 
      pageTitle="Your Page Title"
      pageDescription="Page description for SEO"
    >
      {/* Your page content */}
    </PageTemplate>
  );
};
```

### Enhanced Usage with SEO
```tsx
import PageTemplate from "@/components/PageTemplate";

const YourPage = () => {
  return (
    <PageTemplate 
      pageTitle="AI Growth Assessment"
      pageDescription="Discover your AI maturity level"
      pageKeywords="AI assessment, growth score, business transformation"
      canonicalUrl="https://alviglobal.com/ai-growth-score"
      ogImage="https://alviglobal.com/og-image.jpg"
      structuredData={{
        "@type": "Service",
        "provider": "Alvi Global Enterprises"
      }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "AI Assessment", current: true }
      ]}
      showBreadcrumbs={true}
    >
      {/* Your page content */}
    </PageTemplate>
  );
};
```

### Enhanced Features
- **SEO Optimization**: Meta tags, structured data, Open Graph, Twitter Cards
- **Accessibility**: Skip navigation, ARIA labels, semantic HTML
- **Breadcrumb Navigation**: Automatic breadcrumb generation
- **Loading States**: Built-in loading and error states
- **Background Variants**: Multiple background options
- **Performance**: Optimized rendering and animations

## SectionTemplate

The enhanced section component that provides advanced structure with animations, accessibility, and visual enhancements.

### Basic Usage
```tsx
import SectionTemplate from "@/components/SectionTemplate";

const YourSection = () => {
  return (
    <SectionTemplate 
      variant="gradient" 
      padding="lg" 
      maxWidth="7xl" 
      align="center"
    >
      {/* Your section content */}
    </SectionTemplate>
  );
};
```

### Enhanced Usage with Animations
```tsx
import SectionTemplate from "@/components/SectionTemplate";

const YourSection = () => {
  return (
    <SectionTemplate 
      id="hero-section"
      variant="hero"
      padding="xl"
      maxWidth="7xl"
      align="center"
      animate={true}
      animationType="fade-in"
      animationDelay={0.2}
      useIntersectionObserver={true}
      title="Hero Section"
      description="Main hero content"
      showDivider={true}
      dividerVariant="gradient"
      backgroundPattern={true}
      patternType="dots"
      overlay={true}
      overlayOpacity={0.05}
      scrollSpy={true}
    >
      {/* Your section content */}
    </SectionTemplate>
  );
};
```

### Enhanced Variants
- `default`: Standard background
- `muted`: Subtle background with muted colors
- `gradient`: Gradient background for visual impact
- `transparent`: No background
- `card`: Card-style background
- `hero`: Hero section background
- `accent`: Accent color background

### Enhanced Padding Options
- `xs`: py-8 (32px)
- `sm`: py-12 (48px)
- `md`: py-16 (64px)
- `lg`: py-24 (96px) - **Recommended**
- `xl`: py-32 (128px)
- `2xl`: py-40 (160px)
- `none`: py-0

### Animation Options
- `animate`: Enable animations
- `animationType`: 'fade-in', 'slide-up', 'scale-in', 'slide-left', 'slide-right'
- `animationDelay`: Delay in seconds
- `useIntersectionObserver`: Performance-optimized animations

### Visual Enhancements
- `showDivider`: Section dividers
- `dividerVariant`: 'line', 'dots', 'gradient', 'none'
- `backgroundPattern`: Background patterns
- `patternType`: 'dots', 'grid', 'waves', 'circles'
- `overlay`: Overlay effects
- `scrollSpy`: Scroll spy functionality

## Best Practices

1. **Always use PageTemplate** for new pages with proper SEO props
2. **Use SectionTemplate** for content sections with appropriate variants
3. **Provide comprehensive SEO data** (title, description, keywords, canonical URL)
4. **Use intersection observer** for performance-optimized animations
5. **Implement loading states** for dynamic content
6. **Follow accessibility guidelines** with proper ARIA labels
7. **Test on different screen sizes** to ensure responsiveness
8. **Use background patterns sparingly** for visual hierarchy
9. **Optimize animation delays** for better perceived performance

## Enhanced Examples

### Hero Section with Animations
```tsx
<SectionTemplate 
  id="hero"
  variant="hero"
  padding="xl"
  maxWidth="7xl"
  align="center"
  animate={true}
  animationType="fade-in"
  backgroundPattern={true}
  patternType="dots"
>
  <h1>Welcome to Our Platform</h1>
  <p>Transform your business with AI-powered solutions</p>
</SectionTemplate>
```

### Content Section with Scroll Spy
```tsx
<SectionTemplate 
  id="features"
  variant="default"
  padding="lg"
  maxWidth="6xl"
  align="center"
  animate={true}
  animationType="slide-up"
  useIntersectionObserver={true}
  showDivider={true}
  dividerVariant="line"
  scrollSpy={true}
>
  <h2>Our Features</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {/* Feature cards */}
  </div>
</SectionTemplate>
```

### Enhanced Landing Page
```tsx
<PageTemplate 
  pageTitle="Home - Alvi Global Enterprises" 
  pageDescription="AI-powered business ecosystems for emerging markets"
  canonicalUrl="https://alviglobal.com"
  ogImage="https://alviglobal.com/og-home.jpg"
  structuredData={{
    "@type": "WebPage",
    "name": "Home - Alvi Global Enterprises"
  }}
>
  <SectionTemplate 
    id="hero"
    variant="hero" 
    padding="xl" 
    maxWidth="7xl" 
    align="center"
    animate={true}
    animationType="fade-in"
    backgroundPattern={true}
    patternType="dots"
  >
    <Hero />
  </SectionTemplate>
  
  <SectionTemplate 
    id="services"
    variant="default" 
    padding="lg" 
    maxWidth="6xl" 
    align="center"
    animate={true}
    animationType="slide-up"
    useIntersectionObserver={true}
    showDivider={true}
  >
    <Services />
  </SectionTemplate>
</PageTemplate>
```

### Loading State Example
```tsx
<SectionTemplate 
  isLoading={true}
  skeletonComponent={
    <div className="space-y-4">
      <div className="h-8 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
    </div>
  }
>
  {/* Content will be replaced by skeleton */}
</SectionTemplate>
```

## Migration Guide

### From Basic Templates

Update your existing templates by adding enhanced props:

```tsx
// Before
<PageTemplate pageTitle="My Page">
  <SectionTemplate variant="gradient" padding="lg">
    Content
  </SectionTemplate>
</PageTemplate>

// After
<PageTemplate 
  pageTitle="My Page"
  pageDescription="Description"
  showBreadcrumbs={true}
  breadcrumbs={breadcrumbData}
>
  <SectionTemplate 
    variant="gradient" 
    padding="lg"
    animate={true}
    animationType="fade-in"
    useIntersectionObserver={true}
  >
    Content
  </SectionTemplate>
</PageTemplate>
```

## Performance Tips

1. Use `useIntersectionObserver={false}` for above-the-fold content
2. Implement proper loading states with skeleton components
3. Optimize animation delays for better perceived performance
4. Use `containerQueries={true}` for responsive components
5. Test animations on lower-end devices

For complete documentation, see `docs/template-guide.md`.

These enhanced templates ensure consistent, accessible, performant, and maintainable pages across the entire website.
