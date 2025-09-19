import axiosInstance from "../../api/axiosInstance";

export interface OnboardingData {
  name: string;
  size: string;
  industry: string;
  hqLocation: string;
  primaryInterviewTypes: string[];
  integrationPreferences: string;
  defaultTimezone: string;
  defaultLanguages: string[];
}

export const submitOrganization = (data: OnboardingData) => {
  return axiosInstance.post("/org", data);
};