export interface AgentState {
  jobDescription: string;
  resumeText: string;
  skills: string[];
  requirements: string[];
  analysis: {
    matchedSkills: string[];
    missingSkills: string[];
    suggestions: string[];
    score: number;
  };
  context: {
    industryTrends?: string[];
    marketDemand?: string[];
    competitorSkills?: string[];
  };
}

export interface AnalysisResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}