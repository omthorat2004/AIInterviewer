import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, isUserLoggedIn } from "../../utilis/auth";
import { submitOrganization } from "./onboarding.service";
import type { OnboardingData } from "./onboarding.service";

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
    defaultLanguages: [],
  });

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data: OnboardingData = {
        ...formData,
        // No need to split/join arrays for multi-select
      };
      const response = await submitOrganization(data);
      console.log("Organization saved", response.data);
      alert("Onboarding completed!");
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as {
          response?: { data?: unknown };
          message?: string;
        };
        console.error("Error:", err.response?.data || err.message);
      } else {
        console.error("Error:", String(error));
      }
    }
  };

  const user = getUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-sans">
      <div className="bg-white/90 shadow-2xl backdrop-blur-lg rounded-xl p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome, {user?.name}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Let’s set up your organization to get started 🚀
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Organization Name */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">
              Organization Name*
            </span>
            <input
              name="name"
              placeholder="OpenAI, Microsoft, Google"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          {/* Organization Size */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">Size</span>
            <input
              name="size"
              placeholder="50-100 employees"
              value={formData.size}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          {/* Industry */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">Industry</span>
            <input
              name="industry"
              placeholder="Technology, Finance"
              value={formData.industry}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          {/* HQ Location */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">
              Headquarters Location
            </span>
            <input
              name="hqLocation"
              placeholder="San Francisco, USA"
              value={formData.hqLocation}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          {/* Primary Interview Types */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">
              Primary Interview Types
            </span>
            <div className="border rounded-lg px-3 py-2 flex flex-wrap gap-2 bg-white">
              {["HR", "Technical", "Mock", "Live-normal"].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={type}
                    checked={formData.primaryInterviewTypes.includes(type)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData((prev) => ({
                        ...prev,
                        primaryInterviewTypes: checked
                          ? [...prev.primaryInterviewTypes, type]
                          : prev.primaryInterviewTypes.filter(
                              (t) => t !== type
                            ),
                      }));
                    }}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </label>

          {/* Integration Preferences */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">
              Integration Preferences
            </span>
            <select
              name="integrationPreferences"
              value={formData.integrationPreferences}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select integration</option>
              <option value="Slack">Slack</option>
              <option value="Google">Google</option>
              <option value="Jira">Jira</option>
              <option value="Trello">Trello</option>
              <option value="Asana">Asana</option>
            </select>
          </label>

          {/* Timezone */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">
              Default Timezone*
            </span>
            <select
              name="defaultTimezone"
              value={formData.defaultTimezone}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select timezone</option>
              <option value="UTC">UTC</option>
              <option value="PST">PST (Pacific)</option>
              <option value="EST">EST (Eastern)</option>
              <option value="CET">CET (Central Europe)</option>
              <option value="IST">IST (India)</option>
            </select>
          </label>

          {/* Default Languages */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">
              Default Languages
            </span>
            <input
              name="defaultLanguages"
              placeholder="English, Spanish, Hindi"
              value={formData.defaultLanguages.join(",")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  defaultLanguages: e.target.value
                    .split(",")
                    .map((s) => s.trim()),
                }))
              }
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
