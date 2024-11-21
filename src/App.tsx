import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { JobDescription } from './components/JobDescription';
import { Analysis } from './components/Analysis';
import { ResumeVersions } from './components/ResumeVersions';
import { Auth } from './components/Auth';
import { Toaster } from 'react-hot-toast';
import { useResumeStore } from './store/useResumeStore';
import { useAuthStore } from './store/useAuthStore';
import { supabase } from './lib/supabase';

function App() {
  const { user } = useAuthStore();

  useEffect(() => {
    // Set up auth listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      useAuthStore.setState({ user: session?.user ?? null, loading: false });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.setState({ user: session?.user ?? null, loading: false });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
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

        {!user ? (
          <div className="max-w-md mx-auto">
            <Auth />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <UploadZone />
              <JobDescription />
            </div>
            <div className="space-y-8">
              <Analysis />
              <ResumeVersions />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;