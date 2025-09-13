import React from "react";
import { ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";

export default function Hero() {
  const stats = [
    {
      icon: Target,
      value: "85%",
      label: "Higher Interview Rate",
      color: "text-blue-600",
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: "Faster Job Placement",
      color: "text-green-600",
    },
    {
      icon: Sparkles,
      value: "50K+",
      label: "Success Stories",
      color: "text-purple-600",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
          <Sparkles className="w-4 h-4" /> Powered by Google Gemini AI
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl mx-auto mb-6 text-5xl font-bold leading-tight md:text-7xl">
          Land Your Dream Job with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Career Tools
          </span>
        </h1>

        <p className="max-w-3xl mx-auto mb-12 text-xl text-gray-600 md:text-2xl">
          Transform your career with intelligent resume optimization,
          personalized job matching, and AI-driven interview preparation.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 mb-16 sm:flex-row">
          <button className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-transform transform rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105">
            Boost My Career <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 text-lg font-semibold text-gray-700 transition-colors border-2 border-gray-300 rounded-lg hover:text-blue-600 hover:border-blue-500">
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid max-w-2xl gap-8 mx-auto md:grid-cols-3">
          {stats.map(({ icon, value, label, color }) => {
            const StatIcon = icon;
            return (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <StatIcon className={`w-6 h-6 mr-2 ${color}`} />
                  <span className="text-3xl font-bold">{value}</span>
                </div>
                <p className="text-gray-600">{label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-xl animate-pulse top-1/4 left-1/4 mix-blend-multiply" />
        <div className="absolute w-64 h-64 bg-purple-200 rounded-full opacity-30 blur-xl animate-pulse top-3/4 right-1/4 mix-blend-multiply animation-delay-2000" />
      </div>
    </section>
  );
}
