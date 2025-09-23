/**
 * Gemini AI Integration for AI Growth Audit Generation
 * 
 * This module provides functions to generate comprehensive AI growth audits
 * using Google's Gemini AI model. It creates personalized recommendations
 * and detailed analysis based on user assessment data.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI client with API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// Security: Only log API key status in development, never the actual key
if (import.meta.env.DEV) {
  console.log('Gemini API Key loaded:', apiKey ? 'Yes' : 'No');
  console.log('API Key available:', !!apiKey);
} else {
  // In production, only log availability status
  console.log('Gemini API Key available:', !!apiKey);
}

// Validate API key before initializing
if (!apiKey) {
  throw new Error('Gemini API key is required but not found in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Interface for audit data passed to the AI model
 * Contains all necessary information to generate a comprehensive audit report
 */
export interface AuditData {
  /** Company name for personalization */
  companyName: string;
  /** Industry sector for context-specific recommendations */
  industry: string;
  /** Current AI maturity scores across four dimensions */
  currentState: {
    strategy: number;      // AI strategy maturity (0-100)
    implementation: number; // Technical implementation progress (0-100)
    data: number;          // Data readiness and governance (0-100)
    culture: number;       // Cultural alignment and change readiness (0-100)
  };
  /** Monthly revenue range for ROI calculations */
  monthlyRevenue: string;
  /** Key business goals and objectives */
  goals: string[];
}

/**
 * Generates a comprehensive AI Growth Audit report using Gemini AI
 * 
 * This function creates a detailed, personalized audit report that includes:
 * - Executive summary of current AI maturity
 * - Detailed analysis of strengths and gaps
 * - Actionable recommendations for improvement
 * - Implementation roadmap with timelines
 * - Expected ROI and business impact
 * 
 * @param data - Audit data containing company info and assessment results
 * @returns Promise<string> - Markdown-formatted audit report
 * @throws Error if AI generation fails
 */
export async function generateAIAudit(data: AuditData): Promise<string> {
  try {
    // Input validation and sanitization
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid audit data provided');
    }

    // Validate required fields
    if (!data.companyName || typeof data.companyName !== 'string' || data.companyName.length > 100) {
      throw new Error('Invalid company name');
    }

    if (!data.industry || typeof data.industry !== 'string' || data.industry.length > 50) {
      throw new Error('Invalid industry');
    }

    if (!data.currentState || typeof data.currentState !== 'object') {
      throw new Error('Invalid current state data');
    }

    // Validate scores are within expected range
    const scores = Object.values(data.currentState);
    if (scores.some(score => typeof score !== 'number' || score < 0 || score > 100)) {
      throw new Error('Invalid score values');
    }

    // Sanitize string inputs
    const sanitizedData = {
      ...data,
      companyName: data.companyName.trim().substring(0, 100),
      industry: data.industry.trim().substring(0, 50),
      monthlyRevenue: data.monthlyRevenue?.trim().substring(0, 50) || '',
      goals: data.goals?.map(goal => goal.trim().substring(0, 200)).filter(Boolean) || []
    };

    console.log('=== GEMINI API CALL STARTED ===');
    console.log('API Key available:', !!import.meta.env.VITE_GEMINI_API_KEY);
    console.log('Audit data validated and sanitized');
    
    // Initialize Gemini 2.0 Flash model for content generation
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    console.log('Model initialized successfully');

    // Construct comprehensive prompt for audit generation
    const prompt = `
      Generate a detailed AI Growth Audit report for ${sanitizedData.companyName} in the ${sanitizedData.industry} industry.
      
      Current State Assessment:
      - AI Strategy Maturity: ${sanitizedData.currentState.strategy}/100
      - Implementation Progress: ${sanitizedData.currentState.implementation}/100
      - Data Readiness: ${sanitizedData.currentState.data}/100
      - Cultural Alignment: ${sanitizedData.currentState.culture}/100
      
      Business Context:
      - Monthly Revenue: ${sanitizedData.monthlyRevenue}
      - Key Goals: ${sanitizedData.goals.join(', ')}
      
      Please provide a comprehensive audit report with the following sections:
      1. Executive Summary (2-3 paragraphs)
      2. Detailed Analysis of Current State (strengths and gaps)
      3. Key Opportunities and Strategic Priorities
      4. Actionable Recommendations (prioritized by impact)
      5. Implementation Roadmap (90-day, 6-month, 12-month phases)
      6. Expected ROI and Business Impact
      7. Risk Assessment and Mitigation Strategies
      
      Format the response in markdown with clear sections, bullet points, and actionable insights.
      Make it professional, data-driven, and tailored to the ${sanitizedData.industry} industry.
    `;

    // Generate audit content using Gemini AI
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('Received response from Gemini API');
    const response = await result.response;
    const text = response.text();
    console.log('Generated audit content length:', text.length);
    console.log('=== GEMINI API CALL COMPLETED ===');
    
    return text;
  } catch (error) {
    console.error('Error generating AI audit:', error);
    throw new Error('Failed to generate AI audit report. Please try again later.');
  }
}

/**
 * Logs the audit content for manual email sending
 * 
 * Since emails will be sent manually, this function logs the audit content
 * and saves it for later use. The audit content is also saved with the user data.
 * 
 * @param email - User's email address
 * @param auditContent - Generated audit report content
 * @returns Promise<void>
 */
export async function sendAuditEmail(email: string, auditContent: string): Promise<void> {
  // Log the audit content for manual email sending
  console.log('=== AUDIT CONTENT FOR MANUAL EMAIL ===');
  console.log('Email:', email);
  console.log('Audit Content:');
  console.log(auditContent);
  console.log('=====================================');
  
  // Save audit content to localStorage for easy access
  const auditKey = `age_audit_${email}_${new Date().toISOString().replace(/[:.]/g, '-')}`;
  localStorage.setItem(auditKey, auditContent);
  
  // Also save to a general audits key for easy retrieval
  const existingAudits = localStorage.getItem('age_audits') || '[]';
  const audits = JSON.parse(existingAudits);
  audits.push({
    email,
    timestamp: new Date().toISOString(),
    content: auditContent
  });
  localStorage.setItem('age_audits', JSON.stringify(audits));
}