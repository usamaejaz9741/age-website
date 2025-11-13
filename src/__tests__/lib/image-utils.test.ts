/**
 * @fileoverview Tests for Image Utilities
 * 
 * This test suite covers image optimization and loading utilities including:
 * - Image loading attribute optimization
 * - Image error handling with fallbacks
 * - Different image type configurations
 */

import { describe, it, expect, vi } from 'vitest';
import { getOptimizedImageAttrs, handleImageError } from '@/lib/image-utils';

describe('Image Utilities', () => {
  describe('getOptimizedImageAttrs', () => {
    it('should return eager loading for hero images', () => {
      const attrs = getOptimizedImageAttrs('hero');
      
      expect(attrs.loading).toBe('eager');
      expect(attrs.decoding).toBe('sync');
      expect(attrs.fetchpriority).toBe('high');
    });

    it('should return eager loading for logo images', () => {
      const attrs = getOptimizedImageAttrs('logo');
      
      expect(attrs.loading).toBe('eager');
      expect(attrs.decoding).toBe('sync');
      expect(attrs.fetchpriority).toBe('high');
    });

    it('should return lazy loading for background images', () => {
      const attrs = getOptimizedImageAttrs('background');
      
      expect(attrs.loading).toBe('lazy');
      expect(attrs.decoding).toBe('async');
      expect(attrs.fetchpriority).toBe('low');
    });

    it('should return eager loading for icon images', () => {
      const attrs = getOptimizedImageAttrs('icon');
      
      expect(attrs.loading).toBe('eager');
      expect(attrs.decoding).toBe('sync');
      expect(attrs.fetchpriority).toBe('high');
    });

    it('should return lazy loading for thumbnail images', () => {
      const attrs = getOptimizedImageAttrs('thumbnail');
      
      expect(attrs.loading).toBe('lazy');
      expect(attrs.decoding).toBe('async');
      expect(attrs.fetchpriority).toBe('low');
    });

    it('should return lazy loading for unknown image types (default)', () => {
      const attrs = getOptimizedImageAttrs('unknown');
      
      expect(attrs.loading).toBe('lazy');
      expect(attrs.decoding).toBe('async');
      expect(attrs.fetchpriority).toBe('low');
    });

    it('should return lazy loading for empty string', () => {
      const attrs = getOptimizedImageAttrs('');
      
      expect(attrs.loading).toBe('lazy');
      expect(attrs.decoding).toBe('async');
      expect(attrs.fetchpriority).toBe('low');
    });

    it('should handle case sensitivity', () => {
      const attrsUpper = getOptimizedImageAttrs('HERO');
      const attrsLower = getOptimizedImageAttrs('hero');
      
      // Should be case sensitive and HERO falls to default
      expect(attrsUpper.loading).toBe('lazy');
      expect(attrsLower.loading).toBe('eager');
    });
  });

  describe('handleImageError', () => {
    it('should set fallback source when provided', () => {
      const mockImg = {
        src: 'https://example.com/image.jpg',
        currentTarget: null as unknown as HTMLImageElement
      };
      
      const event = {
        currentTarget: mockImg
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;
      
      const fallbackSrc = 'https://example.com/fallback.jpg';
      
      handleImageError(event, fallbackSrc);
      
      expect(mockImg.src).toBe(fallbackSrc);
    });

    it('should not set fallback if already using fallback source', () => {
      const fallbackSrc = 'https://example.com/fallback.jpg';
      const mockImg = {
        src: fallbackSrc,
        currentTarget: null as unknown as HTMLImageElement
      };
      
      const event = {
        currentTarget: mockImg
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;
      
      handleImageError(event, fallbackSrc);
      
      // Should not change src when already on fallback
      expect(mockImg.src).toBe(fallbackSrc);
    });

    it('should handle error without fallback source', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const mockImg = {
        src: originalSrc,
        currentTarget: null as unknown as HTMLImageElement
      };
      
      const event = {
        currentTarget: mockImg
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;
      
      handleImageError(event);
      
      // Should not change src when no fallback provided
      expect(mockImg.src).toBe(originalSrc);
    });

    it('should not set fallback when empty fallback string is provided', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const mockImg = {
        src: originalSrc,
        currentTarget: null as unknown as HTMLImageElement
      };
      
      const event = {
        currentTarget: mockImg
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;
      
      handleImageError(event, '');
      
      // Should not change src when fallback is empty (falsy check in handleImageError)
      expect(mockImg.src).toBe(originalSrc);
    });

    it('should log warning in development mode', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Temporarily set DEV mode
      const originalDev = import.meta.env.DEV;
      (import.meta.env as { DEV: boolean }).DEV = true;
      
      const mockImg = {
        src: 'https://example.com/image.jpg',
        currentTarget: null as unknown as HTMLImageElement
      };
      
      const event = {
        currentTarget: mockImg
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;
      
      handleImageError(event);
      
      expect(consoleWarnSpy).toHaveBeenCalledWith('Image failed to load:', mockImg.src);
      
      // Restore
      consoleWarnSpy.mockRestore();
      (import.meta.env as { DEV: boolean }).DEV = originalDev;
    });

    it('should handle relative fallback URLs', () => {
      const mockImg = {
        src: 'https://example.com/image.jpg',
        currentTarget: null as unknown as HTMLImageElement
      };
      
      const event = {
        currentTarget: mockImg
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;
      
      const fallbackSrc = '/placeholder.svg';
      
      handleImageError(event, fallbackSrc);
      
      expect(mockImg.src).toBe(fallbackSrc);
    });

    it('should handle data URLs as fallback', () => {
      const mockImg = {
        src: 'https://example.com/image.jpg',
        currentTarget: null as unknown as HTMLImageElement
      };
      
      const event = {
        currentTarget: mockImg
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;
      
      const fallbackSrc = 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=';
      
      handleImageError(event, fallbackSrc);
      
      expect(mockImg.src).toBe(fallbackSrc);
    });

    it('should handle multiple consecutive errors', () => {
      const mockImg = {
        src: 'https://example.com/image.jpg',
        currentTarget: null as unknown as HTMLImageElement
      };
      
      const event = {
        currentTarget: mockImg
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;
      
      const fallbackSrc = 'https://example.com/fallback.jpg';
      
      // First error
      handleImageError(event, fallbackSrc);
      expect(mockImg.src).toBe(fallbackSrc);
      
      // Second error (already on fallback)
      handleImageError(event, fallbackSrc);
      expect(mockImg.src).toBe(fallbackSrc);
    });
  });

  describe('Integration scenarios', () => {
    it('should provide appropriate settings for above-the-fold content', () => {
      const heroAttrs = getOptimizedImageAttrs('hero');
      const logoAttrs = getOptimizedImageAttrs('logo');
      
      // Above-the-fold content should load eagerly
      expect(heroAttrs.loading).toBe('eager');
      expect(logoAttrs.loading).toBe('eager');
      
      // And have high priority
      expect(heroAttrs.fetchpriority).toBe('high');
      expect(logoAttrs.fetchpriority).toBe('high');
    });

    it('should provide appropriate settings for below-the-fold content', () => {
      const thumbnailAttrs = getOptimizedImageAttrs('thumbnail');
      const backgroundAttrs = getOptimizedImageAttrs('background');
      
      // Below-the-fold content should load lazily
      expect(thumbnailAttrs.loading).toBe('lazy');
      expect(backgroundAttrs.loading).toBe('lazy');
      
      // And have low priority
      expect(thumbnailAttrs.fetchpriority).toBe('low');
      expect(backgroundAttrs.fetchpriority).toBe('low');
    });

    it('should optimize for perceived performance', () => {
      // Critical images load sync
      const heroAttrs = getOptimizedImageAttrs('hero');
      expect(heroAttrs.decoding).toBe('sync');
      
      // Non-critical images load async
      const thumbnailAttrs = getOptimizedImageAttrs('thumbnail');
      expect(thumbnailAttrs.decoding).toBe('async');
    });
  });
});

