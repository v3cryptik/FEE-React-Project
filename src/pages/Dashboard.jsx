import React, { useState } from 'react';
import Card, { StatCard, AnalysisCard } from '../components/Card';
import FileUpload from '../components/FileUpload';
import { API_BASE_URL } from '../config/api';

const Dashboard = ({ user }) => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadMode, setUploadMode] = useState('text'); // 'text' or 'pdf'
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setError('');
  };

  const handleAnalyze = async () => {
    if (uploadMode === 'text' && !resumeText.trim()) {
      setError('Please enter your resume text');
      return;
    }

    if (uploadMode === 'pdf' && !uploadedFile) {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let response;

      if (uploadMode === 'text') {
        response = await fetch(`${API_BASE_URL}/analyze_resume`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resume_text: resumeText,
          }),
        });
      } else {
        // PDF upload
        const formData = new FormData();
        formData.append('file', uploadedFile);

        response = await fetch(`${API_BASE_URL}/upload_pdf`, {
          method: 'POST',
          body: formData,
        });
      }

      const data = await response.json();

      if (response.ok) {
        setAnalysis(data.analysis);
        if (data.extracted_text) {
          setResumeText(data.extracted_text);
        }
      } else {
        setError(data.detail || 'Analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('Analysis request failed:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      value: analysis?.analysis?.overall_score || '--',
      label: 'Overall Score',
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: analysis?.analysis?.ats_score || '--',
      label: 'ATS Score',
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      value: analysis?.analysis?.word_count || '--',
      label: 'Word Count',
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      value: analysis?.analysis?.sections_found ? 
        Object.values(analysis.analysis.sections_found).filter(Boolean).length : '--',
      label: 'Sections Found',
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600 mt-2">
            Analyze your resume with our AI-powered system to get personalized insights and recommendations.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Your Resume
            </h2>
            
            {/* Upload Mode Toggle */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  onClick={() => {
                    setUploadMode('text');
                    setUploadedFile(null);
                    setError('');
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    uploadMode === 'text'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Text Input
                </button>
                <button
                  onClick={() => {
                    setUploadMode('pdf');
                    setResumeText('');
                    setError('');
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    uploadMode === 'pdf'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  PDF Upload
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {uploadMode === 'text' ? (
                <div>
                  <label htmlFor="resume-text" className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Text
                  </label>
                  <textarea
                    id="resume-text"
                    rows={8}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="input-field resize-none"
                    placeholder="Paste your resume text here for analysis..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {resumeText.length} characters
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload PDF Resume
                  </label>
                  <FileUpload
                    onFileUpload={handleFileUpload}
                    loading={loading}
                    disabled={loading}
                  />
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading || (uploadMode === 'text' ? !resumeText.trim() : !uploadedFile)}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </div>
                ) : (
                  `Analyze ${uploadMode === 'text' ? 'Resume' : 'PDF'}`
                )}
              </button>
            </div>
          </Card>
        </div>


        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </div>

            {/* Analysis Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalysisCard
                title="Strengths"
                score={analysis.analysis?.overall_score || 0}
                details={analysis.analysis?.strengths || []}
              />
              <AnalysisCard
                title="Areas for Improvement"
                score={10 - (analysis.analysis?.overall_score || 0)}
                details={analysis.analysis?.areas_for_improvement || []}
              />
            </div>

            {/* Skills Analysis */}
            {analysis.analysis?.skills_analysis && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Technical Skills</h4>
                    <ul className="space-y-1">
                      {analysis.analysis.skills_analysis.technical_skills?.map((skill, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Soft Skills</h4>
                    <ul className="space-y-1">
                      {analysis.analysis.skills_analysis.soft_skills?.map((skill, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Missing Skills</h4>
                    <ul className="space-y-1">
                      {analysis.analysis.skills_analysis.missing_skills?.map((skill, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}

            {/* Recommendations */}
            {analysis.analysis?.recommendations && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <ul className="space-y-3">
                  {analysis.analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-sm font-medium">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{recommendation}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Experience Assessment */}
            {analysis.analysis?.experience_assessment && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Level</h4>
                    <p className="text-sm text-gray-600">{analysis.analysis.experience_assessment.level}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Relevance</h4>
                    <p className="text-sm text-gray-600">{analysis.analysis.experience_assessment.relevance}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Achievements</h4>
                    <p className="text-sm text-gray-600">{analysis.analysis.experience_assessment.achievements}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
