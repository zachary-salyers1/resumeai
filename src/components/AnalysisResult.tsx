import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

export const AnalysisResult = () => {
  const analysisResult = useResumeStore((state) => state.analysisResult);

  if (!analysisResult) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Analysis Results</h2>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-purple-600">{analysisResult.score}%</span>
          <span className="text-sm text-gray-500 ml-2">Match Score</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="flex items-center text-green-600 font-medium mb-2">
            <CheckCircle className="w-5 h-5 mr-2" />
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysisResult.matchedKeywords.map((keyword, index) => (
              <span
                key={`matched-${keyword}-${index}`}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center text-red-600 font-medium mb-2">
            <XCircle className="w-5 h-5 mr-2" />
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysisResult.missingKeywords.map((keyword, index) => (
              <span
                key={`missing-${keyword}-${index}`}
                className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center text-amber-600 font-medium mb-3">
            <Lightbulb className="w-5 h-5 mr-2" />
            Improvement Suggestions
          </h3>
          <div className="space-y-3">
            {analysisResult.suggestions.map((suggestion, index) => (
              <div
                key={`suggestion-${index}`}
                className="p-3 bg-amber-50 rounded-lg border border-amber-100"
              >
                <p className="text-amber-800 text-sm">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
          <h3 className="flex items-center text-purple-700 font-medium mb-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            ATS Optimization Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-purple-800">
            <li>Use standard section headings (e.g., "Experience," "Education," "Skills")</li>
            <li>Avoid using tables, columns, or complex formatting</li>
            <li>Use common fonts like Arial, Calibri, or Times New Roman</li>
            <li>Include a clear, professional summary at the top</li>
            <li>Spell out acronyms at least once</li>
          </ul>
        </div>
      </div>
    </div>
  );
};