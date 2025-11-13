/**
 * @fileoverview Gemini API Client for AI Content Generation
 * 
 * TypeScript wrapper for Google's Gemini AI API, providing secure and efficient
 * access to AI-powered content generation for the AI Growth Score assessment.
 * 
 * @module geminiAPI
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 🤖 Integration with Google's Gemini 2.0 Flash model
 * - 🔒 Secure API key management and validation
 * - 📊 Comprehensive error handling with specific status codes
 * - 🎯 Optimized for AI Growth Score assessment content
 * - ⚡ Efficient request/response handling
 * - 🛡️ Input validation and sanitization
 * - 📝 Detailed error logging for debugging
 */

import { GeminiRequest, GeminiResponse } from '../types/gemini';
import { apiRateLimiter } from './security';

/**
 * Client class for interacting with Google's Gemini AI API
 * 
 * Provides secure and efficient methods for generating AI content using the
 * Gemini 2.0 Flash model. Handles authentication, request formatting, and
 * comprehensive error handling with specific status code responses.
 * 
 * @class GeminiAPI
 * @example
 * ```typescript
 * const geminiAPI = new GeminiAPI();
 * const response = await geminiAPI.generateContent('Generate AI recommendations');
 * ```
 */
export class GeminiAPI {
  /** API key for authenticating with Gemini API */
  private readonly apiKey: string;
  
  /** Base URL for Gemini API endpoints */
  private readonly baseUrl: string;

  /**
   * Initializes the Gemini API client
   * 
   * @note If API key is not found, methods will fail gracefully with helpful error messages
   */
  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey && import.meta.env.DEV) {
      console.warn('Gemini API key not found in environment variables. AI features will be disabled. Add VITE_GEMINI_API_KEY to .env.local to enable AI-powered recommendations.');
    }
    
    this.apiKey = apiKey || '';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  }

  /**
   * Generates AI content using the Gemini 2.0 Flash model
   * 
   * This method is used to generate personalized recommendations and insights
   * based on user assessment data. It's optimized for the AI Growth Score
   * assessment use case.
   * 
   * @param prompt - The text prompt to send to the AI model
   * @param signal - Optional AbortSignal for request cancellation
   * @returns Promise<string> - The generated AI response text
   * @throws Error if API request fails or response is invalid
   */
  async generateContent(prompt: string, signal?: AbortSignal): Promise<string> {
    // Check if API key is configured
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured. AI-powered recommendations are currently unavailable. Please add VITE_GEMINI_API_KEY to your environment variables to enable this feature.');
    }
    
    // Check rate limiting before making API call
    const clientId = 'anonymous'; // In a real app, use user ID or IP
    if (!apiRateLimiter.isAllowed(clientId)) {
      const remaining = apiRateLimiter.getRemainingRequests(clientId);
      throw new Error(`Rate limit exceeded. Please wait before making another request. Remaining requests: ${remaining}`);
    }

    // Format request according to Gemini API specification
    const request: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    try {
      // Make API request to Gemini 2.0 Flash model
      const response = await fetch(
        `${this.baseUrl}/models/gemini-2.0-flash:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': this.apiKey
          },
          body: JSON.stringify(request),
          signal // Add AbortSignal for cancellation support
        }
      );

      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        
        // Handle specific error codes
        if (response.status === 503) {
          throw new Error('AI service is temporarily unavailable. Please try again in a few moments.');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please wait a moment before trying again.');
        } else if (response.status === 401) {
          throw new Error('API authentication failed. Please check your API key.');
        } else {
          throw new Error(`AI service error: ${response.status} ${response.statusText}`);
        }
      }

      // Parse and validate response
      const data = (await response.json()) as GeminiResponse;
      
      // Extract generated text from response with comprehensive validation
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API: missing candidates or content');
      }
      
      const content = data.candidates[0].content;
      
      // Validate parts array exists and has elements
      if (!content.parts || !Array.isArray(content.parts) || content.parts.length === 0) {
        throw new Error('Invalid response format from Gemini API: missing or empty parts array');
      }
      
      // Validate first part has text property
      const firstPart = content.parts[0];
      if (!firstPart || typeof firstPart.text !== 'string') {
        throw new Error('Invalid response format from Gemini API: missing text in response');
      }
      
      return firstPart.text;
    } catch (error) {
      // Enhanced error handling with specific error types
      if (error instanceof Error) {
        // Check for specific error types
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          throw new Error('API authentication failed. Please check your API key.');
        } else if (error.message.includes('429') || error.message.includes('rate limit')) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
          throw new Error('AI service is temporarily unavailable. Please try again later.');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          throw new Error('Network error. Please check your connection and try again.');
        } else {
          throw new Error(`Failed to generate AI content: ${error.message}`);
        }
      } else {
        throw new Error('Unknown error occurred while calling Gemini API');
      }
    }
  }
}