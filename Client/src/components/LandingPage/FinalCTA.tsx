import { ArrowRight, Sparkles, Clock, Shield } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Limited Time: Free Premium Trial
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Boost Your Career Today
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't let another opportunity pass you by. Join thousands of professionals who have transformed their careers with AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
              Schedule Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Setup in 60 seconds</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Bank-level security</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};