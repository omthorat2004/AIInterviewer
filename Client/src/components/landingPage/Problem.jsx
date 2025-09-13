import { AlertTriangle, FileX, Clock, TrendingDown } from "lucide-react";

export const Problem = () => {
  const problems = [
    {
      icon: FileX,
      title: "Ineffective Resumes",
      desc: "Your resume gets lost in ATS systems and fails to showcase your true potential.",
    },
    {
      icon: Clock,
      title: "Endless Job Searching",
      desc: "Hours spent on job boards with little to no responses, leading to burnout.",
    },
    {
      icon: TrendingDown,
      title: "Poor Interview Performance",
      desc: "Lack of preparation results in missed opportunities and rejections.",
    },
    {
      icon: AlertTriangle,
      title: "Skill Gap Uncertainty",
      desc: "Not knowing what skills to build or how to position yourself in the market.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-12 px-6">
        <h2 className="text-4xl font-bold text-gray-900">
          The Job Search Struggle is <span className="text-red-600">Real</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Millions of professionals are stuck in a cycle of applications,
          rejections, and missed chances. Sound familiar?
        </p>
      </div>

      <div className="grid gap-6 max-w-6xl mx-auto px-6 md:grid-cols-2 lg:grid-cols-4">
        {problems.map(({ icon, title, desc }, i) => {
          const ProblemIcon = icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2 border-l-4 border-red-500"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4 mx-auto">
                <ProblemIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {title}
              </h3>
              <p className="text-gray-600 text-center mt-2">{desc}</p>
            </div>
          );
        })}
      </div>

      <p className="text-center mt-12 text-lg text-gray-700 font-medium">
        It's time to break the cycle and take control of your career.
      </p>
    </section>
  );
};
