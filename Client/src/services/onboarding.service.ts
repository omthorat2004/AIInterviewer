import api from './api';

// Data types
export interface OnboardingData {
  name: string;
  size: 'Small' | 'Medium' | 'Large';
  industry: string;
  hqLocation: string;
  primaryInterviewTypes: string[];
  integrationPreferences: 'Google Meet' | 'Zoom' | 'MS Teams';
  defaultTimezone: string;
  defaultLanguages: string[];
  aiName?: string;
  logoUrl?: string;
  introText?: string;
}

export interface OnboardingResponse {
  message: string;
  organization: {
    _id: string;
    userId: string;
    name: string;
    size: string;
    industry: string;
    hqLocation: string;
    primaryInterviewTypes: string[];
    integrationPreferences: string;
    defaultTimezone: string;
    defaultLanguages: string[];
    aiName?: string;
    logoUrl?: string;
    introText?: string;
  };
}

// API function
export const saveOrganizationInfo = async (formData: OnboardingData): Promise<OnboardingResponse> => {
  try {
    const response = await api.post<OnboardingResponse>('/api/onboarding/org', formData);
    return response.data;
  } catch (error) {
    console.error('Onboarding API error:', error);
    throw error;
  }
};
