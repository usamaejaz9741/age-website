/**
 * @fileoverview TypeScript Type Definitions for Google Gemini AI API
 * 
 * Comprehensive type definitions for Google's Gemini AI API, ensuring type safety
 * and IntelliSense support throughout the application when interacting with AI services.
 * 
 * @module types/gemini
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 🎯 Complete type coverage for Gemini API requests and responses
 * - 🔒 Type safety for AI content generation operations
 * - 📝 Comprehensive JSDoc documentation for all interfaces
 * - 🛡️ Safety rating and content validation types
 * - ⚡ Optimized for TypeScript IntelliSense and autocompletion
 */

/**
 * Represents the content structure for Gemini API requests and responses
 * Contains an array of text parts that make up the content
 */
export interface GeminiContent {
  /** Array of content parts, each containing text */
  parts: {
    /** The actual text content */
    text: string;
  }[];
}

/**
 * Request structure for sending content to the Gemini API
 * Used when making generateContent API calls
 */
export interface GeminiRequest {
  /** Array of content objects to send to the AI model */
  contents: GeminiContent[];
}

/**
 * Response structure from the Gemini API
 * Contains the generated content along with metadata about the generation process
 */
export interface GeminiResponse {
  /** Array of generated content candidates */
  candidates: {
    /** The generated content */
    content: GeminiContent;
    /** Reason why the generation finished (e.g., "STOP", "MAX_TOKENS") */
    finishReason: string;
    /** Index of this candidate in the response */
    index: number;
    /** Safety ratings for the generated content */
    safetyRatings: {
      /** Category of safety concern (e.g., "HARM_CATEGORY_HARASSMENT") */
      category: string;
      /** Probability level (e.g., "NEGLIGIBLE", "LOW", "MEDIUM", "HIGH") */
      probability: string;
    }[];
  }[];
  /** Feedback about the input prompt */
  promptFeedback: {
    /** Safety ratings for the input prompt */
    safetyRatings: {
      /** Category of safety concern */
      category: string;
      /** Probability level */
      probability: string;
    }[];
  };
}