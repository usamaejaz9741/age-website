/**
 * Gemini API Client for AI Content Generation
 * 
 * This class provides a TypeScript wrapper for Google's Gemini AI API,
 * specifically designed for generating AI-powered recommendations and content
 * for the AI Growth Score assessment.
 */

import { GeminiContent, GeminiRequest, GeminiResponse } from '../types/gemini';

/**
 * Client class for interacting with Google's Gemini AI API
 * 
 * Provides methods for generating AI content using the Gemini 2.0 Flash model.
 * Handles authentication, request formatting, and error handling.
 */
export class GeminiAPI {
  /** API key for authenticating with Gemini API */
  private readonly apiKey: string;
  
  /** Base URL for Gemini API endpoints */
  private readonly baseUrl: string;

  /**
   * Initializes the Gemini API client
   * 
   * @throws Error if API key is not found in environment variables
   */
  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    
    if (!apiKey) {
      throw new Error('Gemini API key not found in environment variables. Make sure VITE_GEMINI_API_KEY is set in .env.local');
    }
    this.apiKey = apiKey;
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
   * @returns Promise<string> - The generated AI response text
   * @throws Error if API request fails or response is invalid
   */
  async generateContent(prompt: string): Promise<string> {
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
          body: JSON.stringify(request)
        }
      );

      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Parse and validate response
      const data = (await response.json()) as GeminiResponse;
      
      // Extract generated text from response
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      // Error calling Gemini API
      
      // Re-throw with more context for debugging
      if (error instanceof Error) {
        throw new Error(`Failed to generate AI content: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while calling Gemini API');
      }
    }
  }
}