import React from 'react';
import { FileText, Upload, Settings } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8" />
            <span className="text-xl font-bold">ResumeAI</span>
          </div>
          
          <nav className="flex space-x-4">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
              <Upload className="w-5 h-5" />
              <span>Upload</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};