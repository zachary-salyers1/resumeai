export interface AnalysisResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface KeywordCategory {
  technical: string[];
  soft: string[];
  domain: string[];
  certifications: string[];
}