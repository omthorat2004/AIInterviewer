import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';  

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSkip?: () => void;
  onSubmit?: () => void;
  isLastStep: boolean;
  isSubmitting: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  onPrevious,
  onNext,
  onSkip,
  onSubmit,
  isLastStep,
  isSubmitting,
}) => {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
          currentStep === 0
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <div className="flex space-x-3">
        {onSkip && (
          <button
            onClick={onSkip}
            className="px-6 py-3 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            Skip for Now
          </button>
        )}
        
        {isLastStep ? (
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting && <LoadingSpinner size="sm" className="border-t-white" />}
            <span>{isSubmitting ? 'Saving...' : 'Continue to Dashboard'}</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
