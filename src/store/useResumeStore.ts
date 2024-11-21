import { create } from 'zustand';

interface ResumeState {
  resumeText: string | null;
  jobDescription: string | null;
  analysisResult: AnalysisResult | null;
  setResumeText: (text: string) => void;
  setJobDescription: (text: string) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  reset: () => void;
}

interface AnalysisResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumeText: null,
  jobDescription: null,
  analysisResult: null,
  setResumeText: (text) => set({ resumeText: text }),
  setJobDescription: (text) => set({ jobDescription: text }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  reset: () => set({ resumeText: null, jobDescription: null, analysisResult: null }),
}));