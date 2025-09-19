import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser , isUserLoggedIn } from "../../utilis/auth";
import { submitOrganization } from "./onboarding.service";
import type { OnboardingData } from "./onboarding.service"

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OnboardingData>({
  name: "",
  size: "",
  industry: "",
  hqLocation: "",
  primaryInterviewTypes: [],       
  integrationPreferences: "",
  defaultTimezone: "",
  defaultLanguages: []
});


  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data: OnboardingData = {
        ...formData,
        primaryInterviewTypes: formData.primaryInterviewTypes ? formData.primaryInterviewTypes.join(",").split(",") : [],
        defaultLanguages: formData.defaultLanguages ? formData.defaultLanguages.join(",").split(",") : []
      };
      const response = await submitOrganization(data);
      console.log("Organization saved", response.data);
      alert("Onboarding completed!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const user = getUser();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800">Welcome, {user?.name}</h1>
      <p className="text-center text-gray-600 mb-6">Let's set up your organization to get started</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Organization Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="hqLocation"
          placeholder="Headquarters Location"
          value={formData.hqLocation}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="primaryInterviewTypes"
          placeholder="Interview Types (comma separated)"
          value={formData.primaryInterviewTypes.join(",")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              primaryInterviewTypes: e.target.value.split(",").map((s) => s.trim())
            }))
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="integrationPreferences"
          placeholder="Integration Preference"
          value={formData.integrationPreferences}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="defaultTimezone"
          placeholder="Default Timezone"
          value={formData.defaultTimezone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="defaultLanguages"
          placeholder="Languages (comma separated)"
          value={formData.defaultLanguages.join(",")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              defaultLanguages: e.target.value.split(",").map((s) => s.trim())
            }))
          }
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default OnboardingPage;
