import { create } from 'zustand';
import { AnalysisResult } from '../lib/ai/resumeAiAnalyzer';

interface ResumeState {
  resumeText: string | null;
  jobDescription: string | null;
  analysisResult: AnalysisResult | null;
  setResumeText: (text: string) => void;
  setJobDescription: (text: string) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  reset: () => void;
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