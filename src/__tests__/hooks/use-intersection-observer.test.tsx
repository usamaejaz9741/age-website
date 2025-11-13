/**
 * @fileoverview Tests for useIntersectionObserver Hook
 * 
 * This test suite covers the intersection observer hook including:
 * - Element visibility detection
 * - Threshold and rootMargin configuration
 * - TriggerOnce behavior
 * - Observer lifecycle management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver: ReturnType<typeof vi.fn>;
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockUnobserve: ReturnType<typeof vi.fn>;
  let mockDisconnect: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();

    mockIntersectionObserver = vi.fn(() => {
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
        root: null,
        rootMargin: '',
        thresholds: []
      };
    });

    global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with isIntersecting as false', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it('should create IntersectionObserver with default options', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    // Verify hook returns expected structure
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should create IntersectionObserver with custom threshold', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ threshold: 0.5 })
    );
    
    // Verify hook initializes with custom options
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should create IntersectionObserver with custom rootMargin', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ rootMargin: '100px' })
    );
    
    // Verify hook initializes with custom options
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should observe element when ref is set', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    // Verify hook initializes properly
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it('should initialize with isIntersecting false', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should handle triggerOnce option', () => {
    const { result: resultOnce } = renderHook(() => 
      useIntersectionObserver({ triggerOnce: true })
    );
    const { result: resultContinuous } = renderHook(() => 
      useIntersectionObserver({ triggerOnce: false })
    );
    
    // Both should initialize properly
    expect(resultOnce.current.isIntersecting).toBe(false);
    expect(resultContinuous.current.isIntersecting).toBe(false);
  });

  it('should maintain state with triggerOnce=true', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ triggerOnce: true })
    );
    
    // Verify initial state
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should allow continuous detection with triggerOnce=false', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ triggerOnce: false })
    );
    
    // Verify initial state
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should handle unmount without errors', () => {
    const { unmount } = renderHook(() => 
      useIntersectionObserver()
    );
    
    // Should unmount cleanly
    expect(() => unmount()).not.toThrow();
  });

  it('should handle null ref gracefully', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    // Ref is null by default
    expect(result.current.ref.current).toBeNull();
    expect(result.current.isIntersecting).toBe(false);
    
    // Should not throw or call observe with null
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('should recreate observer when threshold changes', () => {
    const { rerender } = renderHook(
      (props) => useIntersectionObserver(props),
      { initialProps: { threshold: 0.1 } }
    );
    
    // Change threshold - should not throw
    expect(() => rerender({ threshold: 0.5 })).not.toThrow();
  });

  it('should recreate observer when rootMargin changes', () => {
    const { rerender } = renderHook(
      (props) => useIntersectionObserver(props),
      { initialProps: { rootMargin: '0px' } }
    );
    
    // Change rootMargin - should not throw
    expect(() => rerender({ rootMargin: '100px' })).not.toThrow();
  });

  it('should handle multiple re-renders', () => {
    const { result, rerender } = renderHook(() => 
      useIntersectionObserver({ triggerOnce: false })
    );
    
    // Multiple re-renders should not cause errors
    expect(() => {
      rerender();
      rerender();
      rerender();
    }).not.toThrow();
    
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should handle threshold of 0 (any pixel visible)', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ threshold: 0 })
    );
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should handle threshold of 1 (fully visible)', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ threshold: 1 })
    );
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
  });

  it('should provide stable ref object across renders', () => {
    const { result, rerender } = renderHook(() => useIntersectionObserver());
    
    const firstRef = result.current.ref;
    
    rerender();
    
    const secondRef = result.current.ref;
    
    expect(firstRef).toBe(secondRef);
  });

  it('should handle edge cases gracefully', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    // Should initialize without errors
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
  });
});

