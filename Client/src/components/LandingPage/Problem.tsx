import { AlertTriangle, FileX, Clock, TrendingDown } from 'lucide-react';

export const Problem = () => {
  const problems = [
    {
      icon: FileX,
      title: "Ineffective Resumes",
      description: "Your resume gets lost in ATS systems and fails to showcase your true potential to recruiters."
    },
    {
      icon: Clock,
      title: "Endless Job Searching",
      description: "Hours spent browsing job boards with little to no responses, leading to frustration and burnout."
    },
    {
      icon: TrendingDown,
      title: "Poor Interview Performance",
      description: "Lack of preparation and practice results in missed opportunities and rejected applications."
    },
    {
      icon: AlertTriangle,
      title: "Skill Gap Uncertainty",
      description: "Not knowing what skills to develop or how to position yourself in today's competitive market."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Job Search Struggle is{' '}
            <span className="text-red-600">Real</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Millions of qualified professionals are stuck in an endless cycle of applications, 
            rejections, and missed opportunities. Sound familiar?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-red-500"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4 mx-auto">
                <problem.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                {problem.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-medium text-gray-700">
            It's time to break the cycle and take control of your career.
          </p>
        </div>
      </div>
    </section>
  );
};