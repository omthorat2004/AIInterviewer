import { Upload, Brain, Target, Trophy } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Upload Your Resume",
      description:
        "Simply upload your current resume or create one from scratch using our intuitive builder.",
      color: "from-blue-500 to-cyan-500 bg-blue-50 border-blue-200",
    },
    {
      step: 2,
      icon: Brain,
      title: "AI Analysis & Optimization",
      description:
        "Our Gemini AI analyzes your resume, identifies improvement areas, and suggests powerful optimizations.",
      color: "from-purple-500 to-pink-500 bg-purple-50 border-purple-200",
    },
    {
      step: 3,
      icon: Target,
      title: "Get Matched Opportunities",
      description:
        "Receive personalized job recommendations and interview prep tailored to your profile.",
      color: "from-green-500 to-teal-500 bg-green-50 border-green-200",
    },
    {
      step: 4,
      icon: Trophy,
      title: "Land Your Dream Job",
      description:
        "With optimized applications and thorough preparation, secure interviews and offers faster.",
      color: "from-orange-500 to-red-500 bg-orange-50 border-orange-200",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Our streamlined process takes you from application to offer in four
            simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ step, icon, title, description, color }, i) => {
            const StepIcon = icon;
            return (
              <div key={step} className="relative text-center">
                {/* Connection Line */}
                {i < steps.length - 1 && (
                  <div className="absolute top-1/2 left-full hidden w-full h-0.5 -translate-y-1/2 transform bg-gray-200 lg:block" />
                )}

                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-xl font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  {step}
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex p-4 mb-6 rounded-xl bg-gradient-to-r ${color}`}
                >
                  <StepIcon className="w-8 h-8 text-white" />
                </div>

                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {title}
                </h3>
                <p className="text-gray-600">{description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">
              Powered by Google Gemini AI for Maximum Accuracy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
