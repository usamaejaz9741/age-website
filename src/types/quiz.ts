// Interfaces for quiz functionality
export interface QuizAnswers {
  [questionId: string]: number;
}

export interface QuizResults {
  score: number;
  band: 'Explorer' | 'Experimenter' | 'Accelerator';
  breakdown: {
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
}