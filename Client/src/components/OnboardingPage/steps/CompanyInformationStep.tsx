import React from 'react';
import { Building2 } from 'lucide-react';
import FormInput from '../ui/FormInput';
import FormSelect from '../ui/FormSelect';

interface CompanyInformationStepProps {
  formData: {
    name: string;
    industry: string;
    size: string;
    hq_location: string;
  };
  updateFormData: (field: string, value: string) => void;
}

const CompanyInformationStep: React.FC<CompanyInformationStepProps> = ({
  formData,
  updateFormData
}) => {
  const companySizeOptions = [
    { value: 'Small', label: 'Small (1-50 employees)' },
    { value: 'Medium', label: 'Medium (51-500 employees)' },
    { value: 'Large', label: 'Large (500+ employees)' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h2>
        <p className="text-gray-600">Tell us about your organization</p>
      </div>

      <div className="space-y-5">
        <FormInput
          label="Company Name"
          value={formData.name}
          onChange={(value) => updateFormData('name', value)}
          placeholder="Enter your company name"
          required
        />

        <FormSelect
          label="Company Size"
          value={formData.size}
          onChange={(value) => updateFormData('size', value)}
          options={companySizeOptions}
          placeholder="Select company size"
          required
        />

        <FormInput
          label="Industry"
          value={formData.industry}
          onChange={(value) => updateFormData('industry', value)}
          placeholder="e.g., Technology, Healthcare, Finance"
          required
        />

        <FormInput
          label="HQ Location"
          value={formData.hq_location}
          onChange={(value) => updateFormData('hq_location', value)}
          placeholder="e.g., San Francisco, CA"
          required
        />
      </div>
    </div>
  );
};

export default CompanyInformationStep;