import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  required?: boolean;
  columns?: number;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  required = false,
  columns = 2
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className={`grid grid-cols-${columns} gap-3`}>
        {options.map((option) => (
          <label 
            key={option.value} 
            className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;