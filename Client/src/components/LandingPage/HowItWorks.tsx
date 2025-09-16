import { Upload, Brain, Target, Trophy } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Upload Your Resume",
      description: "Simply upload your current resume or create one from scratch using our intuitive builder.",
      color: "blue"
    },
    {
      step: 2,
      icon: Brain,
      title: "AI Analysis & Optimization",
      description: "Our Gemini AI analyzes your resume, identifies improvement areas, and suggests powerful optimizations.",
      color: "purple"
    },
    {
      step: 3,
      icon: Target,
      title: "Get Matched Opportunities",
      description: "Receive personalized job recommendations and interview preparation materials tailored to your profile.",
      color: "green"
    },
    {
      step: 4,
      icon: Trophy,
      title: "Land Your Dream Job",
      description: "With optimized applications and thorough preparation, secure interviews and offers faster than ever.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500 to-cyan-500 border-blue-200 bg-blue-50",
      purple: "from-purple-500 to-pink-500 border-purple-200 bg-purple-50",
      green: "from-green-500 to-teal-500 border-green-200 bg-green-50",
      orange: "from-orange-500 to-red-500 border-orange-200 bg-orange-50"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process takes you from application to offer in four simple steps.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-200 rounded-full"></div>
                  </div>
                )}

                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-full mb-6 shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${getColorClasses(step.color)} mb-6`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg px-6 py-3">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Powered by Google Gemini AI for Maximum Accuracy</span>
          </div>
        </div>
      </div>
    </section>
  );
};