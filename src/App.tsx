import React from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { JobDescription } from './components/JobDescription';
import { AnalysisResult } from './components/AnalysisResult';
import { Toaster } from 'react-hot-toast';
import { useResumeStore } from './store/useResumeStore';

function App() {
  const analysisResult = useResumeStore((state) => state.analysisResult);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Optimize Your Resume with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and job description to get personalized suggestions
            and improve your chances of landing your dream job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
              <UploadZone />
            </div>
            {analysisResult && <AnalysisResult />}
          </div>
          
          <JobDescription />
        </div>
      </main>

      <footer className="mt-16 bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ResumeAI</h3>
              <p className="text-gray-400">
                Empowering job seekers with AI-powered resume optimization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Resume Analysis</li>
                <li>ATS Optimization</li>
                <li>Multiple Versions</li>
                <li>Custom Templates</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;