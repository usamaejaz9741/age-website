# Enhanced Template Components Guide

This guide provides comprehensive documentation for the enhanced PageTemplate and SectionTemplate components, which form the foundation of consistent page structure across the Alvi Global Enterprises website.

## Overview

The template system provides:
- **Consistent Structure**: Uniform layout patterns across all pages
- **Enhanced SEO**: Comprehensive meta tags, structured data, and social media optimization
- **Accessibility**: Full WCAG compliance with proper ARIA attributes
- **Performance**: Optimized animations, lazy loading, and intersection observers
- **Developer Experience**: TypeScript support, comprehensive props, and clear documentation

## PageTemplate Component

The `PageTemplate` component provides the overall page structure with enhanced features for SEO, accessibility, and user experience.

### Basic Usage

```tsx
import PageTemplate from "@/components/PageTemplate";

const MyPage = () => {
  return (
    <PageTemplate 
      pageTitle="My Page"
      pageDescription="Description of my page"
    >
      {/* Page content */}
    </PageTemplate>
  );
};
```

### Enhanced Usage with SEO

```tsx
import PageTemplate from "@/components/PageTemplate";

const MyPage = () => {
  return (
    <PageTemplate 
      pageTitle="AI Growth Assessment"
      pageDescription="Discover your AI maturity level with our comprehensive assessment"
      pageKeywords="AI assessment, growth score, business transformation"
      canonicalUrl="https://alviglobal.com/ai-growth-score"
      ogImage="https://alviglobal.com/og-image.jpg"
      twitterCard="summary_large_image"
      structuredData={{
        "@type": "Service",
        "provider": {
          "@type": "Organization",
          "name": "Alvi Global Enterprises"
        }
      }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "AI Assessment", current: true }
      ]}
      showBreadcrumbs={true}
    >
      {/* Page content */}
    </PageTemplate>
  );
};
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Main content to be rendered |
| `pageTitle` | `string` | - | Page title for SEO and accessibility |
| `pageDescription` | `string` | - | Page description for SEO |
| `pageKeywords` | `string` | - | Page keywords for SEO |
| `canonicalUrl` | `string` | - | Canonical URL for SEO |
| `ogImage` | `string` | - | Open Graph image URL |
| `twitterCard` | `'summary' \| 'summary_large_image' \| 'app' \| 'player'` | `'summary_large_image'` | Twitter card type |
| `className` | `string` | `""` | Additional CSS classes |
| `showHeader` | `boolean` | `true` | Whether to show the header |
| `showFooter` | `boolean` | `true` | Whether to show the footer |
| `background` | `'default' \| 'gradient' \| 'muted' \| 'transparent'` | `'default'` | Custom background variant |
| `showBreadcrumbs` | `boolean` | `false` | Whether to show breadcrumb navigation |
| `breadcrumbs` | `Array<{label: string, href?: string, current?: boolean}>` | `[]` | Breadcrumb items |
| `isLoading` | `boolean` | `false` | Loading state |
| `hasError` | `boolean` | `false` | Error state |
| `errorMessage` | `string` | `"An error occurred..."` | Error message |
| `errorComponent` | `ReactNode` | - | Custom error component |
| `structuredData` | `Record<string, any>` | - | Structured data for SEO |
| `customMeta` | `Array<{name?: string, property?: string, content: string}>` | `[]` | Custom meta tags |
| `pageType` | `'WebPage' \| 'Article' \| 'Product' \| 'Organization' \| 'Service'` | `'WebPage'` | Page type for structured data |
| `author` | `string` | - | Author information |
| `publishedDate` | `string` | - | Publication date |
| `modifiedDate` | `string` | - | Last modified date |

## SectionTemplate Component

The `SectionTemplate` component provides consistent structure for content sections with advanced features for animations, accessibility, and visual enhancement.

### Basic Usage

```tsx
import SectionTemplate from "@/components/SectionTemplate";

const MySection = () => {
  return (
    <SectionTemplate 
      id="my-section"
      variant="gradient"
      padding="lg"
      maxWidth="7xl"
      align="center"
    >
      {/* Section content */}
    </SectionTemplate>
  );
};
```

### Enhanced Usage with Animations

```tsx
import SectionTemplate from "@/components/SectionTemplate";

const MySection = () => {
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
      description="Main hero content for the page"
      showDivider={true}
      dividerVariant="gradient"
      backgroundPattern={true}
      patternType="dots"
      overlay={true}
      overlayOpacity={0.05}
      scrollSpy={true}
    >
      {/* Section content */}
    </SectionTemplate>
  );
};
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to be rendered within the section |
| `id` | `string` | - | Optional section ID for navigation |
| `variant` | `'default' \| 'muted' \| 'gradient' \| 'transparent' \| 'card' \| 'hero' \| 'accent'` | `'default'` | Section background variant |
| `padding` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'none'` | `'lg'` | Section padding size |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl' \| 'full'` | `'7xl'` | Maximum width constraint |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'center'` | Text alignment |
| `className` | `string` | `""` | Additional CSS classes |
| `animate` | `boolean` | `false` | Whether to add animation classes |
| `animationDelay` | `number` | `0` | Animation delay in seconds |
| `animationType` | `'fade-in' \| 'slide-up' \| 'scale-in' \| 'slide-left' \| 'slide-right'` | `'fade-in'` | Animation type |
| `useIntersectionObserver` | `boolean` | `true` | Whether to use intersection observer for animations |
| `title` | `string` | - | Section title for accessibility |
| `description` | `string` | - | Section description for accessibility |
| `showDivider` | `boolean` | `false` | Whether to show section divider |
| `dividerVariant` | `'line' \| 'dots' \| 'gradient' \| 'none'` | `'line'` | Divider variant |
| `backgroundPattern` | `boolean` | `false` | Whether to add background pattern |
| `patternType` | `'dots' \| 'grid' \| 'waves' \| 'circles'` | `'dots'` | Pattern type |
| `overlay` | `boolean` | `false` | Whether to add overlay |
| `overlayOpacity` | `number` | `0.1` | Overlay opacity |
| `containerQueries` | `boolean` | `false` | Whether to add container queries support |
| `isLoading` | `boolean` | `false` | Loading state |
| `skeletonComponent` | `ReactNode` | - | Skeleton component for loading state |
| `focusTrap` | `boolean` | `false` | Whether to add focus trap |
| `ariaLabel` | `string` | - | Custom ARIA label |
| `ariaDescribedBy` | `string` | - | Custom ARIA described by |
| `scrollSpy` | `boolean` | `false` | Whether to add scroll spy |
| `scrollSpyOffset` | `number` | `0` | Scroll spy offset |

## Common Patterns

### Hero Section

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

### Content Section

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
>
  <h2>Our Features</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {/* Feature cards */}
  </div>
</SectionTemplate>
```

### Loading State

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

## Best Practices

### 1. Consistent Structure
- Always use `PageTemplate` for new pages
- Use `SectionTemplate` for content sections
- Follow the established padding and spacing patterns

### 2. SEO Optimization
- Provide meaningful `pageTitle` and `pageDescription`
- Use `canonicalUrl` for duplicate content
- Add `structuredData` for rich snippets
- Include `ogImage` for social media sharing

### 3. Accessibility
- Provide `title` and `description` for sections
- Use proper heading hierarchy
- Ensure keyboard navigation works
- Test with screen readers

### 4. Performance
- Use `useIntersectionObserver={true}` for animations
- Implement loading states for dynamic content
- Optimize images and assets
- Use appropriate animation delays

### 5. Visual Design
- Choose appropriate background variants
- Use background patterns sparingly
- Maintain consistent spacing
- Test on different screen sizes

## Migration Guide

### From Basic Templates

If you're migrating from basic templates, update your imports and add enhanced props:

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

## Troubleshooting

### Common Issues

1. **Animations not working**: Ensure `useIntersectionObserver={true}` and proper `animationType`
2. **SEO tags not appearing**: Check that `HelmetProvider` is set up in App.tsx
3. **Background patterns not visible**: Verify pattern classes are in CSS and opacity is appropriate
4. **Scroll spy not working**: Ensure sections have unique `id` attributes

### Performance Tips

1. Use `useIntersectionObserver={false}` for above-the-fold content
2. Implement proper loading states
3. Optimize animation delays for better perceived performance
4. Use `containerQueries={true}` for responsive components

## Examples

See the following files for complete examples:
- `src/pages/Index.tsx` - Homepage implementation
- `src/pages/ai-growth-score.tsx` - Assessment page implementation
- `src/components/README.md` - Quick reference guide
