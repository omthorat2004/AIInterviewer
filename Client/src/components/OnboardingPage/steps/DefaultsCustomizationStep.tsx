import React from 'react';
import { Globe, Clock, Bot, Upload, FileText } from 'lucide-react';
import FormSelect from '../ui/FormSelect';
import FormInput from '../ui/FormInput';
import FormTextarea from '../ui/FormTextarea';
import CheckboxGroup from '../ui/CheckboxGroup';
import FileUpload from '../ui/FileUpload';

interface DefaultsCustomizationStepProps {
  formData: {
    default_timezone: string;
    languages: string[];
    ai_name: string;
    logo_url: string;
    intro_text: string;
  };
  updateFormData: (field: string, value: string | string[]) => void;
  handleCheckboxChange: (field: 'interview_types' | 'languages', value: string) => void;
}

const DefaultsCustomizationStep: React.FC<DefaultsCustomizationStepProps> = ({
  formData,
  updateFormData,
  handleCheckboxChange
}) => {
  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' }
  ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Mandarin', label: 'Mandarin' }
  ];

  const handleFileUpload = (file: File | null) => {
    if (file) {
      // In a real app, you would upload the file and get a URL
      const fakeUrl = URL.createObjectURL(file);
      updateFormData('logo_url', fakeUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Globe className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Defaults & Customization</h2>
        <p className="text-gray-600">Set up your default preferences</p>
      </div>

      <div className="space-y-5">
        <FormSelect
          label="Default Timezone"
          value={formData.default_timezone}
          onChange={(value) => updateFormData('default_timezone', value)}
          options={timezoneOptions}
          placeholder="Select timezone"
          icon={<Clock className="w-4 h-4" />}
          required
        />

        <CheckboxGroup
          label="Supported Languages"
          options={languageOptions}
          selectedValues={formData.languages}
          onChange={(value) => handleCheckboxChange('languages', value)}
          required
        />

        <FormInput
          label="AI Interviewer Name (Optional)"
          value={formData.ai_name}
          onChange={(value) => updateFormData('ai_name', value)}
          placeholder="e.g., Alex, Sarah, or leave blank for default"
          icon={<Bot className="w-4 h-4" />}
        />

        <FileUpload
          label="Company Logo (Optional)"
          onChange={handleFileUpload}
          icon={<Upload className="w-4 h-4" />}
        />

        <FormTextarea
          label="Brief Intro Text (Optional)"
          value={formData.intro_text}
          onChange={(value) => updateFormData('intro_text', value)}
          placeholder="Brief description about your company or interview process..."
          icon={<FileText className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};

export default DefaultsCustomizationStep; 