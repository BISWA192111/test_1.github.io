import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Alert = ({ type = 'info', title, message, onClose }) => {
  const bgColors = {
    info: 'bg-blue-900 border-blue-700',
    success: 'bg-green-900 border-green-700',
    warning: 'bg-yellow-900 border-yellow-700',
    error: 'bg-red-900 border-red-700',
  };

  const iconColors = {
    info: 'text-blue-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
  };

  const icons = {
    info: AlertCircle,
    success: CheckCircle,
    warning: AlertCircle,
    error: AlertCircle,
  };

  const Icon = icons[type];

  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${bgColors[type]} border rounded-lg p-4 flex items-start gap-3`}
    >
      <Icon className={`${iconColors[type]} flex-shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        {title && <h4 className="font-semibold text-white">{title}</h4>}
        <p className="text-sm text-gray-200">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-200 text-xl"
      >
        ×
      </button>
    </motion.div>
  );
};

const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div className="w-full h-full border-2 border-transparent border-t-blue-400 rounded-full"></div>
    </div>
  );
};

const LoadingState = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Spinner size="lg" />
    <p className="text-gray-400 mt-4">{message}</p>
  </div>
);

const EmptyState = ({ icon: Icon, title, message, action }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Icon className="text-gray-600 mb-4" size={48} />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-6">{message}</p>
    {action && action}
  </div>
);

export { Alert, Spinner, LoadingState, EmptyState };
