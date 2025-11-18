import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Resume Analyzer
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Powered by GPT-5 via PayperQ API, our AI Resume Analyzer helps you optimize your resume 
              for better job opportunities and career growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Features
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">AI-Powered Analysis</li>
              <li className="text-gray-600 text-sm">ATS Optimization</li>
              <li className="text-gray-600 text-sm">Skills Assessment</li>
              <li className="text-gray-600 text-sm">Improvement Tips</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 AI Resume Analyzer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <span className="sr-only">Privacy Policy</span>
                <span className="text-sm">Privacy</span>
              </button>
              <button
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <span className="sr-only">Terms of Service</span>
                <span className="text-sm">Terms</span>
              </button>
              <button
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <span className="sr-only">Contact</span>
                <span className="text-sm">Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
