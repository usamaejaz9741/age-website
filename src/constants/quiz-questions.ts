/**
 * @fileoverview AI Growth Quiz Questions and Configuration
 * 
 * Centralized quiz question definitions with dimension mappings to ensure consistency
 * across the application. This prevents misalignment between question content and
 * dimension scoring.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

export type QuizDimension = 'strategy' | 'implementation' | 'data' | 'culture';

/**
 * Interface for quiz question structure with dimension mapping
 */
export interface QuizQuestion {
  id: string;
  dimension: QuizDimension;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

/**
 * Comprehensive AI Growth Quiz Questions
 * 
 * Organized by dimension to ensure balanced assessment:
 * - Strategy (q1-q3): 3 questions about AI strategy and alignment
 * - Implementation (q4-q6): 3 questions about execution and capabilities
 * - Data (q7-q9): 3 questions about data management and analytics
 * - Culture (q10-q12): 3 questions about organizational readiness
 * 
 * Each question has 4 options scored 0-3, allowing granular assessment.
 */
export const quizQuestions: QuizQuestion[] = [
  // ============================================================================
  // STRATEGY DIMENSION (q1-q3)
  // ============================================================================
  {
    id: 'q1',
    dimension: 'strategy',
    question: 'How clearly defined is your organization\'s AI strategy?',
    options: [
      { text: 'No formal AI strategy exists', score: 0 },
      { text: 'AI initiatives are ad-hoc with some planning', score: 1 },
      { text: 'We have a documented AI strategy with clear objectives', score: 2 },
      { text: 'AI strategy is integrated into overall business strategy with metrics', score: 3 }
    ]
  },
  {
    id: 'q2',
    dimension: 'strategy',
    question: 'What level of executive support exists for AI initiatives?',
    options: [
      { text: 'Limited or no executive engagement', score: 0 },
      { text: 'Some interest but no dedicated resources', score: 1 },
      { text: 'Strong support with allocated budget', score: 2 },
      { text: 'AI is a CEO/board-level priority with dedicated leadership', score: 3 }
    ]
  },
  {
    id: 'q3',
    dimension: 'strategy',
    question: 'How well do your AI initiatives align with business outcomes?',
    options: [
      { text: 'AI projects are mainly experimental with unclear ROI', score: 0 },
      { text: 'Some alignment but limited measurement', score: 1 },
      { text: 'Most AI projects target specific business metrics', score: 2 },
      { text: 'All AI initiatives directly tie to revenue/cost reduction goals', score: 3 }
    ]
  },

  // ============================================================================
  // IMPLEMENTATION DIMENSION (q4-q6)
  // ============================================================================
  {
    id: 'q4',
    dimension: 'implementation',
    question: 'What is your current AI implementation maturity?',
    options: [
      { text: 'No AI tools or systems in production', score: 0 },
      { text: 'Testing AI tools or running small pilots', score: 1 },
      { text: 'Several AI solutions deployed in specific functions', score: 2 },
      { text: 'AI integrated across multiple business processes', score: 3 }
    ]
  },
  {
    id: 'q5',
    dimension: 'implementation',
    question: 'How would you rate your team\'s AI/ML technical capabilities?',
    options: [
      { text: 'Limited technical AI expertise internally', score: 0 },
      { text: 'Some technical skills but rely heavily on vendors', score: 1 },
      { text: 'Solid internal capabilities with external support', score: 2 },
      { text: 'Strong in-house AI/ML team with proven delivery', score: 3 }
    ]
  },
  {
    id: 'q6',
    dimension: 'implementation',
    question: 'How robust is your AI project delivery methodology?',
    options: [
      { text: 'No standardized AI development process', score: 0 },
      { text: 'Some processes but inconsistently applied', score: 1 },
      { text: 'Established methodology with documentation', score: 2 },
      { text: 'Mature agile/MLOps practices with continuous improvement', score: 3 }
    ]
  },

  // ============================================================================
  // DATA DIMENSION (q7-q9)
  // ============================================================================
  {
    id: 'q7',
    dimension: 'data',
    question: 'How would you describe your organization\'s data quality and availability?',
    options: [
      { text: 'Data is siloed, incomplete, or difficult to access', score: 0 },
      { text: 'Data exists but requires significant cleaning', score: 1 },
      { text: 'Most data is accessible and reasonably clean', score: 2 },
      { text: 'High-quality data infrastructure with strong governance', score: 3 }
    ]
  },
  {
    id: 'q8',
    dimension: 'data',
    question: 'What level of data governance and management is in place?',
    options: [
      { text: 'No formal data governance framework', score: 0 },
      { text: 'Basic data policies with limited enforcement', score: 1 },
      { text: 'Documented data governance with assigned ownership', score: 2 },
      { text: 'Comprehensive data management with privacy and security controls', score: 3 }
    ]
  },
  {
    id: 'q9',
    dimension: 'data',
    question: 'How do you measure AI model performance and business impact?',
    options: [
      { text: 'No systematic measurement of AI outcomes', score: 0 },
      { text: 'Basic tracking but limited business metrics', score: 1 },
      { text: 'Regular performance monitoring with some business KPIs', score: 2 },
      { text: 'Comprehensive analytics linking AI performance to business value', score: 3 }
    ]
  },

  // ============================================================================
  // CULTURE DIMENSION (q10-q12)
  // ============================================================================
  {
    id: 'q10',
    dimension: 'culture',
    question: 'What is the level of AI literacy across your organization?',
    options: [
      { text: 'Very limited understanding of AI capabilities', score: 0 },
      { text: 'Some awareness but significant knowledge gaps', score: 1 },
      { text: 'Good understanding among key stakeholders', score: 2 },
      { text: 'Widespread AI literacy with ongoing training programs', score: 3 }
    ]
  },
  {
    id: 'q11',
    dimension: 'culture',
    question: 'How prepared is your organization to embrace AI-driven change?',
    options: [
      { text: 'Significant resistance to AI adoption', score: 0 },
      { text: 'Some openness but concerns about disruption', score: 1 },
      { text: 'Generally supportive with active change management', score: 2 },
      { text: 'Innovation-driven culture actively embracing AI transformation', score: 3 }
    ]
  },
  {
    id: 'q12',
    dimension: 'culture',
    question: 'What frameworks do you have for AI ethics and governance?',
    options: [
      { text: 'No formal AI ethics or governance guidelines', score: 0 },
      { text: 'Awareness of ethical concerns but limited policies', score: 1 },
      { text: 'Documented AI ethics principles with oversight', score: 2 },
      { text: 'Comprehensive responsible AI framework with active monitoring', score: 3 }
    ]
  },
];

/**
 * Validates quiz question structure and dimension balance
 * 
 * @returns validation result with any issues found
 */
export function validateQuizStructure(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check that we have exactly 12 questions
  if (quizQuestions.length !== 12) {
    errors.push(`Expected 12 questions, found ${quizQuestions.length}`);
  }
  
  // Check dimension balance (3 questions per dimension)
  const dimensionCounts: Record<QuizDimension, number> = {
    strategy: 0,
    implementation: 0,
    data: 0,
    culture: 0
  };
  
  quizQuestions.forEach((q) => {
    dimensionCounts[q.dimension]++;
    
    // Validate each question has 4 options
    if (q.options.length !== 4) {
      errors.push(`Question ${q.id} should have 4 options, found ${q.options.length}`);
    }
    
    // Validate option scores are 0-3
    q.options.forEach((opt, idx) => {
      if (opt.score !== idx) {
        errors.push(`Question ${q.id} option ${idx} has incorrect score ${opt.score}, expected ${idx}`);
      }
    });
  });
  
  // Check each dimension has exactly 3 questions
  Object.entries(dimensionCounts).forEach(([dimension, count]) => {
    if (count !== 3) {
      errors.push(`Dimension '${dimension}' should have 3 questions, found ${count}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get questions by dimension
 */
export function getQuestionsByDimension(dimension: QuizDimension): QuizQuestion[] {
  return quizQuestions.filter(q => q.dimension === dimension);
}

/**
 * Get dimension for a question ID
 */
export function getDimensionForQuestion(questionId: string): QuizDimension | null {
  const question = quizQuestions.find(q => q.id === questionId);
  return question ? question.dimension : null;
}



