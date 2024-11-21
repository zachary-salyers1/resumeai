import React, { useEffect, useState } from 'react';
import { FilePlus, Save, Trash2 } from 'lucide-react';
import { supabase, type ResumeVersion } from '../lib/supabase';
import { useResumeStore } from '../store/useResumeStore';
import toast from 'react-hot-toast';

export const ResumeVersions = () => {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const { resumeContent, jobDescription, analysisResult } = useResumeStore();

  useEffect(() => {
    loadVersions();
  }, []);

  const loadVersions = async () => {
    try {
      const { data, error } = await supabase
        .from('resume_versions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Error loading resume versions:', error);
      toast.error('Failed to load resume versions');
    } finally {
      setLoading(false);
    }
  };

  const saveVersion = async () => {
    if (!resumeContent || !jobDescription) {
      toast.error('Please upload a resume and add a job description first');
      return;
    }

    try {
      const newVersion = {
        title: `Resume Version ${versions.length + 1}`,
        content: resumeContent,
        job_description: jobDescription,
        score: analysisResult?.score || 0,
      };

      const { error } = await supabase
        .from('resume_versions')
        .insert([newVersion]);

      if (error) throw error;

      toast.success('Resume version saved successfully');
      loadVersions();
    } catch (error) {
      console.error('Error saving resume version:', error);
      toast.error('Failed to save resume version');
    }
  };

  const deleteVersion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resume_versions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Resume version deleted successfully');
      loadVersions();
    } catch (error) {
      console.error('Error deleting resume version:', error);
      toast.error('Failed to delete resume version');
    }
  };

  const loadVersion = (version: ResumeVersion) => {
    useResumeStore.setState({
      resumeContent: version.content,
      jobDescription: version.job_description,
      analysisResult: {
        score: version.score,
        matchedKeywords: [],
        missingKeywords: [],
        suggestions: [],
      },
    });
    toast.success('Resume version loaded');
  };

  if (loading) {
    return <div className="text-center">Loading versions...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Resume Versions</h2>
        <button
          onClick={saveVersion}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Current Version
        </button>
      </div>

      {versions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FilePlus className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No saved versions yet. Save your first version!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {versions.map((version) => (
            <div
              key={version.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <h3 className="font-medium">{version.title}</h3>
                <p className="text-sm text-gray-500">
                  Score: {version.score}% • {new Date(version.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => loadVersion(version)}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                >
                  Load
                </button>
                <button
                  onClick={() => deleteVersion(version.id)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
