import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const Analysis = () => {
  const analysisResult = useResumeStore((state) => state.analysisResult);

  if (!analysisResult) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        <div className="text-gray-500 text-center py-8">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No analysis results yet. Upload a resume and job description to get started.</p>
        </div>
      </div>
    );
  }

  const { score, matchPercentage, summary, missingKeywords, suggestions } = analysisResult;

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const ScoreIcon = score >= 8 ? CheckCircle : score >= 6 ? AlertTriangle : XCircle;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="space-y-6">
        {/* Score and Match Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <ScoreIcon className={`w-6 h-6 ${getScoreColor(score)} mr-2`} />
              <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                {score}/10
              </span>
            </div>
            <p className="text-sm text-gray-600">Match Score</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold ${getMatchColor(matchPercentage)} mb-2`}>
              {matchPercentage}%
            </div>
            <p className="text-sm text-gray-600">Keyword Match</p>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="font-semibold mb-2">Summary</h3>
          <p className="text-gray-700">{summary}</p>
        </div>

        {/* Missing Keywords */}
        {missingKeywords.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Missing Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Suggestions</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
