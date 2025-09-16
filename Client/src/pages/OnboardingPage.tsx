import React, { useState } from "react";
import ProgressBar from "../components/OnboardingPage/ui/ProgressBar";
import NavigationButtons from "../components/OnboardingPage/ui/NavigationButtons";
import CompanyInformationStep from "../components/OnboardingPage/steps/CompanyInformationStep";
import InterviewPreferencesStep from "../components/OnboardingPage/steps/InterviewPreferencesStep";
import DefaultsCustomizationStep from "../components/OnboardingPage/steps/DefaultsCustomizationStep";
import { saveOrganizationInfo } from "../services/onboarding.service";

type SizeOptions = "Small" | "Medium" | "Large";
type IntegrationOptions = "Google Meet" | "Zoom" | "MS Teams";

interface OnboardingFormData {
  name: string;
  industry: string;
  size: SizeOptions;
  hq_location: string;
  interview_types: string[];
  integration_preference: IntegrationOptions;
  default_timezone: string;
  languages: string[];
  ai_name: string;
  logo_url: string;
  intro_text: string;
}


type CompanyFields = "name" | "industry" | "size" | "hq_location";
type DefaultsFields =
  | "default_timezone"
  | "languages"
  | "ai_name"
  | "logo_url"
  | "intro_text";

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

type UpdateFormData = (
  field: keyof OnboardingData,
  value: string | string[]
) => void;

const OnboardingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({
  name: "",
  industry: "",
  size: "Small", 
  hq_location: "",
  interview_types: [],
  integration_preference: "Google Meet", 
  default_timezone: "",
  languages: [],
  ai_name: "",
  logo_url: "",
  intro_text: "",
});


  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData: UpdateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (
    field: "interview_types" | "languages",
    value: string
  ) => {
    const currentValues = formData[field];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    updateFormData(field, updatedValues);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    const payload = {
      name: formData.name,
      size: formData.size,
      industry: formData.industry,
      hqLocation: formData.hq_location,
      primaryInterviewTypes: formData.interview_types,
      integrationPreferences: formData.integration_preference,
      defaultTimezone: formData.default_timezone,
      defaultLanguages: formData.languages,
      aiName: formData.ai_name,
      logoUrl: formData.logo_url,
      introText: formData.intro_text,
    };

    const response = await saveOrganizationInfo(payload);
    console.log("Organization saved:", response.organization);
    alert("Onboarding completed!");
    // Redirect to dashboard or next step
    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Onboarding submit failed:", error);
    alert("Failed to save organization info.");
  } finally {
    setIsSubmitting(false);
  }
};


  const handleSkip = () => {
    console.log("User skipped onboarding");
    alert("Skipping onboarding. Redirecting to dashboard...");
    // Redirect logic here
  };

  const updateCompanyInfo = (field: CompanyFields, value: string) => {
    updateFormData(field, value);
  };

  const updateDefaults = (field: DefaultsFields, value: string | string[]) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CompanyInformationStep
            formData={formData}
            updateFormData={updateCompanyInfo}
          />
        );
      case 1:
        return (
          <InterviewPreferencesStep
            formData={formData}
            updateFormData={updateFormData}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 2:
        return (
          <DefaultsCustomizationStep
            formData={formData}
            updateFormData={updateDefaults}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
          {renderStep()}

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={prevStep}
            onNext={nextStep}
            onSkip={handleSkip}
            onSubmit={handleSubmit}
            isLastStep={currentStep === totalSteps - 1}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Powered by{" "}
            <span className="text-indigo-600 font-medium">CareerBoost AI</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
