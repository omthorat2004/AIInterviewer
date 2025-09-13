import React, { useState } from "react";
import { Brain, Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const nav = ["Features", "How It Works", "Pricing", "FAQ"];

  const Link = ({ name }) => (
    <a
      href={`#${name.toLowerCase().replace(/\s+/g, "-")}`}
      className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
      onClick={() => setOpen(false)}
    >
      {name}
    </a>
  );

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">CareerBoost AI</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {nav.map((name) => (
            <Link key={name} name={name} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-4">
          <button className="text-gray-600 hover:text-blue-600">Sign In</button>
          <button className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden py-4 border-t">
          <nav className="flex flex-col gap-3">
            {nav.map((name) => (
              <Link key={name} name={name} />
            ))}
            <button className="text-gray-600 hover:text-blue-600 text-left px-3 py-2">
              Sign In
            </button>
            <button className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
