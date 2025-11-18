import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/Card';

const About = () => {
  const team = [
    {
      name: "AI Technology",
      role: "GPT-5 Powered",
      description: "Advanced AI analysis using the latest GPT-5 model via PayperQ API"
    },
    {
      name: "Resume Experts",
      role: "HR Professionals",
      description: "Our analysis is based on insights from experienced HR professionals"
    },
    {
      name: "ATS Specialists",
      role: "Technical Experts",
      description: "Deep understanding of Applicant Tracking Systems and optimization"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Upload Resume",
      description: "Simply paste your resume text or upload your document for analysis"
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Our GPT-5 powered system analyzes your resume comprehensively"
    },
    {
      step: "03",
      title: "Get Insights",
      description: "Receive detailed feedback, scores, and actionable recommendations"
    },
    {
      step: "04",
      title: "Optimize & Apply",
      description: "Implement suggestions and apply to jobs with confidence"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About AI Resume Analyzer
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're revolutionizing resume optimization with cutting-edge AI technology, 
              helping job seekers land their dream positions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At AI Resume Analyzer, we believe that everyone deserves a fair chance 
                to showcase their skills and experience. Our mission is to democratize 
                resume optimization by making professional-grade analysis accessible to all.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Powered by GPT-5 technology via PayperQ API, we provide instant, 
                comprehensive resume analysis that helps job seekers understand their 
                strengths, identify areas for improvement, and optimize their resumes 
                for maximum impact.
              </p>
              <Link
                to="/login"
                className="btn-primary text-lg px-8 py-3"
              >
                Try It Now
              </Link>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                    <p className="text-gray-600 text-sm">Get results in seconds</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Accurate Analysis</h3>
                    <p className="text-gray-600 text-sm">Powered by GPT-5 technology</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                    <p className="text-gray-600 text-sm">Your data is always protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process makes resume optimization accessible to everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our analysis is powered by the latest GPT-5 technology through PayperQ API
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <FeatureCard
                key={index}
                icon={
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                }
                title={member.name}
                description={member.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have already optimized their resumes with our AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Get Started Free
            </Link>
            <Link
              to="/"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
