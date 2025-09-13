import React from "react";
import { ArrowRight, Sparkles, Clock, Shield } from "lucide-react";

export default function FinalCTA() {
  const trust = [
    { icon: Clock, text: "Setup in 60 seconds" },
    { icon: Shield, text: "Bank-level security" },
    { icon: Sparkles, text: "No credit card required" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden text-center text-white">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-sm font-medium">
          <Sparkles className="w-4 h-4" /> Limited Time: Free Premium Trial
        </span>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Boost Your Career Today
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          Don’t let another opportunity pass you by. Join thousands of
          professionals who’ve transformed their careers with AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg flex items-center gap-2 hover:scale-105 shadow transition">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 rounded-lg border-2 border-white/30 hover:border-white hover:bg-white/10 font-semibold text-lg backdrop-blur-sm">
            Schedule Demo
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {trust.map(({ icon, text }, i) => {
            const TrustIcon = icon;
            return (
              <div
                key={i}
                className="flex items-center justify-center gap-2 text-white/80"
              >
                <TrustIcon className="w-5 h-5" />
                <span className="text-sm">{text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
