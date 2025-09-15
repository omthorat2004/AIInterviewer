import { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' }
  ];

  const handleSignIn = () => {
    window.location.href = '/login';  // Redirect to login page
  };

  const handleGetStarted = () => {
    window.location.href = '/signup';  // Redirect to signup page
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CareerBoost AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleSignIn}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Sign In
            </button>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">
                <button
                  onClick={handleSignIn}
                  className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-lg transition-colors duration-200 text-left"
                >
                  Sign In
                </button>

                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
