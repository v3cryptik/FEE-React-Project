import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'p-6',
  shadow = 'shadow-sm',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-lg hover:border-gray-300' : '';
  const combinedClasses = `${baseClasses} ${shadow} ${padding} ${hoverClasses} ${className}`;

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

// Specialized Card Components
export const FeatureCard = ({ icon, title, description, className = '' }) => {
  return (
    <Card hover className={`text-center ${className}`}>
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Card>
  );
};

export const StatCard = ({ value, label, icon, trend, className = '' }) => {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '↗' : '↘'} {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export const AnalysisCard = ({ title, score, details, className = '' }) => {
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(score)}`}>
          {score}/10
        </div>
      </div>
      <div className="space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-600">{detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Card;
