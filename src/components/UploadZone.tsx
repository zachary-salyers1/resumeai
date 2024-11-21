import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResumeStore } from '../store/useResumeStore';

export const UploadZone = () => {
  const setResumeText = useResumeStore((state) => state.setResumeText);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const text = await readFileContent(file);
      setResumeText(text);
      toast.success('Resume uploaded successfully!');
    } catch (error) {
      toast.error('Error reading file. Please try again.');
    }
  }, [setResumeText]);

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8
        ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}
        transition-colors duration-200 cursor-pointer
        hover:border-purple-500 hover:bg-purple-50
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-center">
        <Upload className={`w-12 h-12 mb-4 ${isDragActive ? 'text-purple-500' : 'text-gray-400'}`} />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supports PDF, DOC, DOCX, and TXT files
        </p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Browse Files
        </button>
      </div>
    </div>
  );
};