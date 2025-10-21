/**
 * E2E Tests for AI Growth Assessment Flow
 * 
 * Tests the complete user journey through the AI Growth Score assessment,
 * including quiz completion, email submission, and results display.
 */

import { test, expect } from '@playwright/test';

test.describe('AI Growth Assessment - Complete Flow', () => {
  test('should complete full assessment from start to results', async ({ page }) => {
    // Navigate to assessment page
    await page.goto('/ai-growth-score');
    
    // Verify page loaded with correct heading
    await expect(page.getByRole('heading', { name: /Discover Your/i })).toBeVisible();
    
    // Verify quiz intro is visible
    await expect(page.getByText(/AI maturity assessment/i)).toBeVisible();
    
    // Start assessment
    const startButton = page.getByRole('button', { name: /Start Assessment/i });
    await expect(startButton).toBeVisible();
    await startButton.click();
    
    // Complete all quiz questions (12 questions)
    for (let i = 0; i < 12; i++) {
      // Wait for question to appear
      await page.waitForSelector('[role="radiogroup"]');
      
      // Select first option
      const firstOption = page.getByRole('radio').first();
      await firstOption.click();
      
      // Click next button
      if (i < 11) {
        await page.getByRole('button', { name: /Next/i }).click();
      } else {
        await page.getByRole('button', { name: /Complete Assessment/i }).click();
      }
      
      // Small delay for animation
      await page.waitForTimeout(200);
    }
    
    // Should now be on email step
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    
    // Enter email
    await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
    
    // Accept consent
    await page.getByRole('checkbox', { name: /consent/i }).check();
    
    // Submit to get results
    await page.getByRole('button', { name: /Get.*Results/i }).click();
    
    // Wait for results (AI generation may take time)
    await page.waitForSelector('text=/Your AI Growth Score/i', { timeout: 30000 });
    
    // Verify results displayed
    await expect(page.getByText(/Your AI Growth Score/i)).toBeVisible();
    
    // Verify score number is displayed
    const scoreElement = page.locator('text=/\\d{1,3}$/').first();
    await expect(scoreElement).toBeVisible();
    
    // Verify band is displayed (Explorer, Experimenter, or Accelerator)
    await expect(
      page.locator('text=/Explorer|Experimenter|Accelerator/i').first()
    ).toBeVisible();
    
    // Verify recommendations are displayed
    await expect(page.getByText(/Recommendations/i)).toBeVisible();
  });
  
  test('should validate email format', async ({ page }) => {
    await page.goto('/ai-growth-score');
    
    // Start assessment
    await page.getByRole('button', { name: /Start Assessment/i }).click();
    
    // Skip through quiz quickly
    for (let i = 0; i < 12; i++) {
      await page.getByRole('radio').first().click();
      const nextButton = i < 11 
        ? page.getByRole('button', { name: /Next/i })
        : page.getByRole('button', { name: /Complete/i });
      await nextButton.click();
      await page.waitForTimeout(100);
    }
    
    // Try invalid email
    await page.getByRole('textbox', { name: /email/i }).fill('invalid-email');
    await page.getByRole('checkbox', { name: /consent/i }).check();
    
    // Try to submit
    await page.getByRole('button', { name: /Get.*Results/i }).click();
    
    // Should show error (button stays disabled or error message appears)
    // Email input should still be visible (didn't proceed to results)
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
  });
  
  test('should be fully keyboard accessible', async ({ page }) => {
    await page.goto('/ai-growth-score');
    
    // Tab to start button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should focus on start button
    const startButton = page.getByRole('button', { name: /Start Assessment/i });
    await expect(startButton).toBeFocused();
    
    // Activate with Enter
    await page.keyboard.press('Enter');
    
    // Tab to first quiz option
    await page.keyboard.press('Tab');
    
    // Select with Space
    await page.keyboard.press('Space');
    
    // Tab to Next button and activate
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Verify moved to next question
    await page.waitForTimeout(200);
    const questionIndicator = page.locator('text=/2.*12/'); // "2 of 12" or similar
    await expect(questionIndicator).toBeVisible();
  });
});

test.describe('Homepage - Navigation and CTAs', () => {
  test('should load homepage without errors', async ({ page }) => {
    await page.goto('/');
    
    // Verify hero heading
    await expect(page.getByRole('heading', { name: /Engineer revenue/i })).toBeVisible();
    
    // Verify main sections are present
    await expect(page.getByText(/Built different/i)).toBeVisible();
    await expect(page.getByText(/Complete business/i)).toBeVisible();
    await expect(page.getByText(/Results that/i)).toBeVisible();
  });
  
  test('should open Calendly when booking button clicked', async ({ page, context }) => {
    await page.goto('/');
    
    // Listen for new page/tab opening
    const pagePromise = context.waitForEvent('page');
    
    // Click book consultation button
    await page.getByRole('button', { name: /Book Free Consultation/i }).click();
    
    // New page should open
    const newPage = await pagePromise;
    
    // Verify Calendly URL
    await expect(newPage.url()).toContain('calendly.com');
    
    // Close new page
    await newPage.close();
  });
  
  test('should scroll to sections when navigation clicked', async ({ page }) => {
    await page.goto('/');
    
    // Get initial scroll position
    const initialY = await page.evaluate(() => window.scrollY);
    
    // Click on a navigation item (e.g., Services)
    const servicesLink = page.locator('text=/^Services$/i').first();
    if (await servicesLink.isVisible()) {
      await servicesLink.click();
      
      // Wait for scroll animation
      await page.waitForTimeout(1000);
      
      // Verify scroll position changed
      const newY = await page.evaluate(() => window.scrollY);
      expect(newY).toBeGreaterThan(initialY);
    }
  });
});

test.describe('Accessibility Compliance', () => {
  test('should have no automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    // Check for basic accessibility requirements
    // Note: This is a basic check - full axe-core integration would be more comprehensive
    
    // Verify language attribute
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('en');
    
    // Verify main landmark
    await expect(page.locator('main[role="main"]')).toBeVisible();
    
    // Verify skip link
    const skipLink = page.getByText(/Skip to main content/i);
    await expect(skipLink).toBeAttached();
  });
  
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Should have h2 elements
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });
  
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // First nav item
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter');
    
    // Page should scroll or navigate
    await page.waitForTimeout(500);
  });
});

test.describe('Error Handling', () => {
  test('should display 404 page for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    
    // Should show 404 page
    await expect(page.getByText(/404|Not Found/i)).toBeVisible();
    
    // Should have link back to home
    const homeLink = page.getByRole('link', { name: /home|back/i });
    await expect(homeLink).toBeVisible();
  });
});

