import { FileEdit, Search, Map, MessageSquare, BarChart3, ArrowRight } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: FileEdit,
      title: "AI Resume Optimization",
      description: "Transform your resume with AI-powered suggestions that increase ATS compatibility by 90% and highlight your strongest qualifications.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "Smart Job Matching",
      description: "Find perfectly matched opportunities based on your skills, experience, and career goals. No more endless scrolling through irrelevant listings.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Map,
      title: "Career Path Exploration",
      description: "Discover new career opportunities and get personalized roadmaps showing exactly which skills to develop for your dream role.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: MessageSquare,
      title: "Mock Interview Generator",
      description: "Practice with AI-generated interview questions specific to your target role. Get real-time feedback to improve your confidence.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Skill Gap Analysis",
      description: "Identify exactly which skills you need to develop and get personalized learning recommendations to bridge any gaps.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Career Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to accelerate your career growth, powered by advanced AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Explore All Features
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};