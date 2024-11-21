import React from 'react';
import { Search } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { ResumeAnalyzer } from '../lib/agents/resumeAnalyzer';
import toast from 'react-hot-toast';

export const JobDescription = () => {
  const { jobDescription, setJobDescription, resumeText, setAnalysisResult } = useResumeStore();
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const analyzer = React.useMemo(() => new ResumeAnalyzer(), []);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzer.analyze(resumeText, jobDescription);
      setAnalysisResult(result);
      toast.success('Analysis completed successfully!');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Search className="w-5 h-5 mr-2 text-purple-600" />
        Job Description Analysis
      </h2>
      <textarea
        className="w-full h-48 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        placeholder="Paste the job description here..."
        value={jobDescription || ''}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button
        className={`
          mt-4 w-full bg-purple-600 text-white py-2 rounded-md
          hover:bg-purple-700 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center
        `}
        onClick={handleAnalyze}
        disabled={!resumeText || !jobDescription || isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Description'
        )}
      </button>
    </div>
  );
};