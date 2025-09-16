import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  message, 
  onClose, 
  className = '' 
}) => {
  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3 ${className}`}>
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-green-700">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-green-400 hover:text-green-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;