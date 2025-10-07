/**
 * @fileoverview AI Growth Quiz Questions and Configuration
 * 
 * Centralized quiz question definitions with dimension mappings to ensure consistency
 * across the application. This serves as the single source of truth for quiz content,
 * preventing misalignment between question content and dimension scoring.
 * 
 * The quiz assesses AI maturity across four critical dimensions:
 * - **Strategy**: Strategic alignment and executive support (questions 1-3)
 * - **Implementation**: Technical capabilities and delivery maturity (questions 4-6)
 * - **Data**: Data management, quality, and governance (questions 7-9)
 * - **Culture**: Organizational readiness and ethical frameworks (questions 10-12)
 * 
 * @module constants/quiz-questions
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 📊 12 comprehensive questions across 4 AI maturity dimensions
 * - ⚖️ Balanced assessment with 3 questions per dimension
 * - 🎯 4-point scoring scale (0-3) for granular evaluation
 * - ✅ Built-in validation functions to ensure quiz integrity
 * - 🔍 Dimension-based query functions for analysis
 * - 📐 Mathematical scoring framework (max 36 points, normalized to 100)
 */

/**
 * Type definition for AI maturity dimensions
 * 
 * These four dimensions represent the key areas of AI maturity that organizations
 * must develop to successfully adopt and scale AI initiatives.
 */
export type QuizDimension = 'strategy' | 'implementation' | 'data' | 'culture';

/**
 * Interface for quiz question structure with dimension mapping
 * 
 * Each question includes:
 * - Unique identifier for tracking
 * - Dimension association for scoring
 * - Question text for display
 * - Four options scored 0-3 (worst to best)
 * 
 * @interface QuizQuestion
 */
export interface QuizQuestion {
  /** Unique question identifier (q1-q12) */
  id: string;
  
  /** AI maturity dimension this question assesses */
  dimension: QuizDimension;
  
  /** Question text displayed to user */
  question: string;
  
  /** Four answer options with progressive scoring (0=worst, 3=best) */
  options: {
    /** Option text displayed to user */
    text: string;
    /** Score value (0-3) indicating maturity level */
    score: number;
  }[];
}

/**
 * Comprehensive AI Growth Quiz Questions
 * 
 * **Assessment Structure:**
 * - Total: 12 questions
 * - Per Dimension: 3 questions each
 * - Scoring: 0-3 points per question
 * - Maximum Score: 36 points (normalized to 100%)
 * 
 * **Dimension Breakdown:**
 * - **Strategy** (q1-q3): Strategic planning, executive support, business alignment
 * - **Implementation** (q4-q6): Technical capabilities, delivery methodology, AI deployment
 * - **Data** (q7-q9): Data quality, governance, analytics and measurement
 * - **Culture** (q10-q12): AI literacy, change readiness, ethical frameworks
 * 
 * **Scoring Guide:**
 * - 0 points: No maturity / Not started
 * - 1 point: Initial stages / Ad-hoc approach
 * - 2 points: Developing capabilities / Documented processes
 * - 3 points: Advanced maturity / Best practices
 * 
 * @constant
 */
export const quizQuestions: QuizQuestion[] = [
  // ============================================================================
  // STRATEGY DIMENSION (q1-q3)
  // Assesses strategic planning, executive support, and business alignment
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
  // Assesses technical capabilities, delivery maturity, and AI deployment
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
  // Assesses data quality, governance, analytics, and measurement capabilities
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
  // Assesses organizational readiness, AI literacy, and ethical frameworks
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
 * Performs comprehensive validation to ensure quiz integrity:
 * - Verifies total question count (should be 12)
 * - Checks dimension balance (3 questions per dimension)
 * - Validates each question has exactly 4 options
 * - Confirms option scores follow 0-3 progression
 * 
 * @returns Validation result with any issues found
 * 
 * @example
 * ```typescript
 * const validation = validateQuizStructure();
 * if (!validation.valid) {
 *   console.error('Quiz validation failed:', validation.errors);
 * }
 * ```
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
    
    // Validate option scores are 0-3 in order
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
 * Get all questions for a specific dimension
 * 
 * Useful for dimension-specific analysis and reporting
 * 
 * @param dimension - The dimension to filter by
 * @returns Array of questions for that dimension
 * 
 * @example
 * ```typescript
 * const strategyQuestions = getQuestionsByDimension('strategy');
 * console.log(`Strategy dimension has ${strategyQuestions.length} questions`);
 * ```
 */
export function getQuestionsByDimension(dimension: QuizDimension): QuizQuestion[] {
  return quizQuestions.filter(q => q.dimension === dimension);
}

/**
 * Get the dimension for a specific question ID
 * 
 * Used for scoring and analysis to map answers back to dimensions
 * 
 * @param questionId - The question ID to look up (e.g., 'q1', 'q2')
 * @returns The dimension for that question, or null if not found
 * 
 * @example
 * ```typescript
 * const dimension = getDimensionForQuestion('q1');
 * // Returns: 'strategy'
 * ```
 */
export function getDimensionForQuestion(questionId: string): QuizDimension | null {
  const question = quizQuestions.find(q => q.id === questionId);
  return question ? question.dimension : null;
}
