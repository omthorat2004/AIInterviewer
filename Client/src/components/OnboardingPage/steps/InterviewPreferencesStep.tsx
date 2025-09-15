import React from 'react';
import { Users } from 'lucide-react';
import CheckboxGroup from '../ui/CheckboxGroup';
import RadioGroup from '../ui/RadioGroup';

interface OnboardingData {
  name: string;
  industry: string;
  size: string;
  hq_location: string;
  interview_types: string[];
  integration_preference: string;
  default_timezone: string;
  languages: string[];
  ai_name: string;
  logo_url: string;
  intro_text: string;
}

type UpdateFormData = (field: keyof OnboardingData, value: string | string[]) => void;

interface InterviewPreferencesStepProps {
  formData: Pick<OnboardingData, 'interview_types' | 'integration_preference'>;
  updateFormData: UpdateFormData;
  handleCheckboxChange: (field: 'interview_types' | 'languages', value: string) => void;
}

const InterviewPreferencesStep: React.FC<InterviewPreferencesStepProps> = ({
  formData,
  updateFormData,
  handleCheckboxChange
}) => {
  const interviewTypeOptions = [
    { value: 'HR', label: 'HR' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Mock', label: 'Mock' },
    { value: 'Live-Normal', label: 'Live-Normal' }
  ];

  const integrationOptions = [
    { value: 'Google Meet', label: 'Google Meet' },
    { value: 'Zoom', label: 'Zoom' },
    { value: 'MS Teams', label: 'MS Teams' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Preferences</h2>
        <p className="text-gray-600">Configure your interview settings</p>
      </div>

      <div className="space-y-6">
        <CheckboxGroup
          label="Primary Interview Types"
          options={interviewTypeOptions}
          selectedValues={formData.interview_types}
          onChange={(value) => handleCheckboxChange('interview_types', value)}
          required
        />

        <RadioGroup
          label="Integration Preference"
          name="integration"
          options={integrationOptions}
          selectedValue={formData.integration_preference}
          onChange={(value) => updateFormData('integration_preference', value)}
          required
        />
      </div>
    </div>
  );
};

export default InterviewPreferencesStep;
