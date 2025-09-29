/**
 * Tests for OptimizedImage component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import OptimizedImage from '@/components/OptimizedImage';

// Mock the image utilities
vi.mock('@/lib/image-utils', () => ({
  getOptimizedImageAttrs: vi.fn(() => ({
    loading: 'lazy',
    decoding: 'async',
    fetchpriority: 'low'
  })),
  handleImageError: vi.fn()
}));

describe('OptimizedImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render image with correct src and alt', () => {
    render(
      <OptimizedImage 
        src="/test-image.jpg" 
        alt="Test image" 
        type="thumbnail" 
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should apply correct loading attributes based on type', async () => {
    const { getOptimizedImageAttrs } = vi.mocked(await import('@/lib/image-utils'));
    
    render(
      <OptimizedImage 
        src="/test-image.jpg" 
        alt="Test image" 
        type="hero" 
      />
    );

    expect(getOptimizedImageAttrs).toHaveBeenCalledWith('hero');
  });

  it('should show loading skeleton initially', () => {
    render(
      <OptimizedImage 
        src="/test-image.jpg" 
        alt="Test image" 
        type="thumbnail" 
      />
    );

    // The skeleton should be visible initially
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('should handle image load event', async () => {
    render(
      <OptimizedImage 
        src="/test-image.jpg" 
        alt="Test image" 
        type="thumbnail" 
      />
    );

    const image = screen.getByAltText('Test image');
    
    // Simulate image load
    fireEvent.load(image);

    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
    });
  });

  it('should handle image error with fallback', async () => {
    render(
      <OptimizedImage 
        src="/invalid-image.jpg" 
        alt="Test image" 
        type="thumbnail"
        fallbackSrc="/fallback.jpg"
      />
    );

    const image = screen.getByAltText('Test image');
    
    // Simulate image error
    fireEvent.error(image);

    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/fallback.jpg');
    });
  });

  it('should show error indicator when fallback also fails', async () => {
    render(
      <OptimizedImage 
        src="/invalid-image.jpg" 
        alt="Test image" 
        type="thumbnail"
        fallbackSrc="/invalid-fallback.jpg"
      />
    );

    const image = screen.getByAltText('Test image');
    
    // Simulate first error
    fireEvent.error(image);
    
    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/invalid-fallback.jpg');
    });

    // Simulate fallback error
    fireEvent.error(image);

    await waitFor(() => {
      const errorIndicator = document.querySelector('[aria-label="Image failed to load"]');
      expect(errorIndicator).toBeInTheDocument();
    });
  });

  it('should apply custom className', () => {
    render(
      <OptimizedImage 
        src="/test-image.jpg" 
        alt="Test image" 
        type="thumbnail"
        className="custom-class"
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveClass('custom-class');
  });

  it('should use custom loading strategy when provided', () => {
    const customStrategy = {
      loading: 'eager' as const,
      decoding: 'sync' as const,
      fetchpriority: 'high' as const
    };

    render(
      <OptimizedImage 
        src="/test-image.jpg" 
        alt="Test image" 
        type="thumbnail"
        loadingStrategy={customStrategy}
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('decoding', 'sync');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('should not show skeleton when showSkeleton is false', () => {
    render(
      <OptimizedImage 
        src="/test-image.jpg" 
        alt="Test image" 
        type="thumbnail"
        showSkeleton={false}
      />
    );

    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).not.toBeInTheDocument();
  });

  it('should apply custom skeleton className', () => {
    render(
      <OptimizedImage 
        src="/test-image.jpg" 
        alt="Test image" 
        type="thumbnail"
        skeletonClassName="custom-skeleton"
      />
    );

    const skeleton = document.querySelector('.custom-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('should forward ref correctly', () => {
    const ref = vi.fn();
    
    render(
      <OptimizedImage 
        ref={ref}
        src="/test-image.jpg" 
        alt="Test image" 
        type="thumbnail"
      />
    );

    expect(ref).toHaveBeenCalled();
  });
});
