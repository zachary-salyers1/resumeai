import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Upload, Loader2 } from 'lucide-react';
import { ResumeAiAnalyzer } from '../lib/ai/resumeAiAnalyzer';

export function JobDescription() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const analyzer = new ResumeAiAnalyzer();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const analyzeResume = async (pdfText: string) => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzer.analyzeResume(pdfText, jobDescription);
      setAnalysis(result);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('http://localhost:3001/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to parse PDF');
      }

      const { text } = await response.json();
      await analyzeResume(text);
    } catch (error) {
      console.error('PDF parsing failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to parse PDF');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (acceptedFiles.length > 0) {
      await handleFileUpload(acceptedFiles[0]);
    } else {
      toast.error('Please upload a resume PDF');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Resume Analyzer</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-40 p-3 border rounded-lg"
            placeholder="Paste the job description here..."
          />
        </div>

        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">Drop your resume PDF here or click to browse</p>
          {acceptedFiles.length > 0 && (
            <p className="mt-2 text-sm text-green-600">
              Selected: {acceptedFiles[0].name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </span>
          ) : (
            'Analyze Resume'
          )}
        </button>
      </form>

      {analysis && (
        <div className="mt-8 space-y-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Overall Score</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {analysis.overallScore}/100
                </div>
              </div>

              <div>
                <h3 className="font-medium">Summary</h3>
                <p className="text-gray-700">{analysis.summary}</p>
              </div>

              <div>
                <h3 className="font-medium">Strengths</h3>
                <ul className="list-disc pl-5">
                  {analysis.strengths.map((strength: string, i: number) => (
                    <li key={i} className="text-green-600">{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Areas for Improvement</h3>
                <ul className="list-disc pl-5">
                  {analysis.weaknesses.map((weakness: string, i: number) => (
                    <li key={i} className="text-red-600">{weakness}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Skills Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Technical Skills</h4>
                    <ul className="list-disc pl-5">
                      {analysis.skillsAnalysis.technicalSkills.map((skill: string, i: number) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Soft Skills</h4>
                    <ul className="list-disc pl-5">
                      {analysis.skillsAnalysis.softSkills.map((skill: string, i: number) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Missing Critical Skills</h3>
                <ul className="list-disc pl-5">
                  {analysis.skillsAnalysis.missingCriticalSkills.map((skill: string, i: number) => (
                    <li key={i} className="text-orange-600">{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Suggestions for Improvement</h3>
                <ul className="list-disc pl-5">
                  {analysis.suggestions.map((suggestion: string, i: number) => (
                    <li key={i} className="text-blue-600">{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}