import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: string;
  icon?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  accept = "image/*",
  maxSize = "2MB",
  icon
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon && <span className="inline-block mr-1">{icon}</span>}
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors duration-200">
        <input
          type="file"
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to {maxSize}</p>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;