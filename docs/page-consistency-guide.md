# Page Consistency Guide

This guide ensures all pages in the Alvi Global Enterprises website maintain consistent structure, styling, and user experience patterns.

## Page Structure Template

All pages should follow this consistent structure using the `PageTemplate` component:

```tsx
import PageTemplate from "@/components/PageTemplate";
import SectionTemplate from "@/components/SectionTemplate";

const YourPage = () => {
  return (
    <PageTemplate 
      pageTitle="Your Page Title"
      pageDescription="Brief description for SEO and accessibility"
    >
      <SectionTemplate variant="gradient" padding="lg" maxWidth="7xl" align="center">
        {/* Your content here */}
      </SectionTemplate>
      
      <SectionTemplate variant="default" padding="lg" maxWidth="6xl" align="left">
        {/* More content */}
      </SectionTemplate>
    </PageTemplate>
  );
};
```

## PageTemplate Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Main content to be rendered |
| `pageTitle` | `string` | - | Page title for SEO and accessibility |
| `pageDescription` | `string` | - | Page description for SEO |
| `className` | `string` | `""` | Additional CSS classes |
| `showHeader` | `boolean` | `true` | Whether to show the header |
| `showFooter` | `boolean` | `true` | Whether to show the footer |

## SectionTemplate Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to be rendered within the section |
| `id` | `string` | - | Section ID for navigation |
| `variant` | `'default' \| 'muted' \| 'gradient' \| 'transparent'` | `'default'` | Section background variant |
| `padding` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'none'` | `'lg'` | Section padding size |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl' \| 'full'` | `'7xl'` | Maximum width constraint |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Text alignment |
| `className` | `string` | `""` | Additional CSS classes |
| `animate` | `boolean` | `false` | Whether to add animation classes |
| `animationDelay` | `number` | `0` | Animation delay in seconds |

## Design System Consistency

### Spacing Scale
- **Section Padding**: Use `py-24` (lg) as the standard, with `py-16` (md) for smaller sections
- **Content Padding**: Use `px-6` for mobile, responsive padding handled by templates
- **Element Spacing**: Use design system spacing variables (`--space-*`)

### Typography Scale
- **Page Titles**: Use `text-4xl md:text-5xl lg:text-6xl` for main headings
- **Section Headings**: Use `text-3xl md:text-4xl` for section titles
- **Body Text**: Use `text-lg` for main content, `text-base` for secondary content
- **Line Heights**: Use `leading-tight` for headings, `leading-relaxed` for body text

### Color System
- **Backgrounds**: Use `bg-background` for main backgrounds, `bg-muted/30` for sections
- **Text Colors**: Use `text-foreground` for primary text, `text-muted-foreground` for secondary
- **Accent Colors**: Use `text-primary` for brand highlights, `bg-primary/10` for backgrounds

### Animation Patterns
- **Fade In**: Use `animate-fade-in` for content that appears on load
- **Slide Up**: Use `animate-slide-up` for content that slides in from bottom
- **Staggered**: Use `animationDelay` for sequential animations

## Accessibility Standards

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Include `role` attributes where appropriate
- Use `aria-label` and `aria-labelledby` for complex elements

### Navigation
- Include skip navigation links
- Ensure proper focus management
- Use semantic navigation elements

### Screen Readers
- Provide descriptive alt text for images
- Use `sr-only` for screen reader only content
- Include proper ARIA attributes

## SEO Best Practices

### Meta Information
- Always provide `pageTitle` and `pageDescription`
- Use descriptive, keyword-rich titles
- Keep descriptions under 160 characters

### Structured Data
- Include proper heading hierarchy
- Use semantic HTML elements
- Provide clear content structure

## Performance Considerations

### Loading
- Use lazy loading for images and components
- Implement proper loading states
- Optimize bundle size with code splitting

### Animations
- Use CSS transforms for smooth animations
- Implement `prefers-reduced-motion` support
- Avoid layout-shifting animations

## Examples

### Landing Page Structure
```tsx
<PageTemplate pageTitle="Home - Alvi Global Enterprises" pageDescription="...">
  <Hero />
  <ProofBar />
  <ValuePillars />
  <ServicesGrid />
  <CaseStudies />
  <HowWeWork />
  <Industries />
  <ContentTeaser />
</PageTemplate>
```

### Assessment Page Structure
```tsx
<PageTemplate pageTitle="AI Growth Score Assessment" pageDescription="...">
  <SectionTemplate variant="gradient" padding="lg" maxWidth="7xl" align="center">
    {/* Hero content */}
  </SectionTemplate>
  
  <SectionTemplate variant="default" padding="lg" maxWidth="md" align="center">
    {/* Form content */}
  </SectionTemplate>
</PageTemplate>
```

### Content Page Structure
```tsx
<PageTemplate pageTitle="About Us" pageDescription="...">
  <SectionTemplate variant="gradient" padding="lg" maxWidth="6xl" align="center">
    {/* Introduction */}
  </SectionTemplate>
  
  <SectionTemplate variant="default" padding="lg" maxWidth="5xl" align="left">
    {/* Main content */}
  </SectionTemplate>
</PageTemplate>
```

## Checklist for New Pages

- [ ] Use `PageTemplate` component
- [ ] Provide `pageTitle` and `pageDescription`
- [ ] Use `SectionTemplate` for content sections
- [ ] Follow typography scale
- [ ] Implement proper spacing
- [ ] Include accessibility attributes
- [ ] Test responsive design
- [ ] Verify SEO optimization
- [ ] Check performance impact
- [ ] Validate semantic HTML

## Common Patterns

### Hero Sections
- Use `variant="gradient"` for visual impact
- Include compelling headline and CTA
- Use `maxWidth="7xl"` for full-width content

### Content Sections
- Use `variant="default"` for standard content
- Use `maxWidth="6xl"` for readable content width
- Include proper heading hierarchy

### Form Sections
- Use `variant="default"` with centered alignment
- Use `maxWidth="md"` for form containers
- Include proper form validation and accessibility

### Call-to-Action Sections
- Use `variant="muted"` for subtle emphasis
- Center content with compelling messaging
- Include clear action buttons

This guide ensures consistent, accessible, and performant pages across the entire website.
