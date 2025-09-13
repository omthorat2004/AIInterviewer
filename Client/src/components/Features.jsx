import React from "react";
import { FileEdit, Search, Map, MessageSquare, BarChart3, ArrowRight } from "lucide-react";

export default function Features() {
  const items = [
    { icon: FileEdit, title: "AI Resume Optimization", desc: "AI-powered suggestions to boost ATS compatibility & highlight your best skills.", gradient: "from-blue-500 to-cyan-500" },
    { icon: Search, title: "Smart Job Matching", desc: "Find jobs that perfectly match your skills, experience & goals.", gradient: "from-purple-500 to-pink-500" },
    { icon: Map, title: "Career Path Exploration", desc: "Personalized roadmaps to discover new roles & the skills needed.", gradient: "from-green-500 to-teal-500" },
    { icon: MessageSquare, title: "Mock Interview Generator", desc: "Practice with AI interview questions + real-time feedback.", gradient: "from-orange-500 to-red-500" },
    { icon: BarChart3, title: "Skill Gap Analysis", desc: "See which skills you lack & get personalized learning recs.", gradient: "from-indigo-500 to-purple-500" }
  ];

  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Powerful Features for{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Career Success</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Everything you need to accelerate your career growth, powered by advanced AI.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map(({ icon, title, desc, gradient }, i) => {
          const Icon = icon;
          return (
            <div key={i} className="bg-white p-8 rounded-2xl shadow hover:-translate-y-2 transition">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-6`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          );
        })}
      </div>

      <button className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg flex items-center gap-2 mx-auto hover:scale-105 transition shadow">
        Explore All Features <ArrowRight className="w-5 h-5" />
      </button>
    </section>
  );
}
