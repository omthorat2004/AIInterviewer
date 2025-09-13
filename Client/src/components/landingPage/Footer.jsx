import React from "react";
import { Brain, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const sections = {
    Product: ["Features", "Pricing", "How It Works", "API Docs"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Support: ["Help Center", "Privacy Policy", "Terms of Service", "Status"],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 grid gap-8 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <Brain className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">CareerBoost AI</span>
          </div>
          <p className="text-gray-300 mb-6">
            Empowering careers with AI tools for resume optimization, job matching & interviews.
          </p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(sections).map(([title, items]) => (
          <div key={title}>
            <h3 className="font-semibold mb-4">{title}</h3>
            <ul className="space-y-2">
              {items.map((name) => (
                <li key={name}>
                  <a href="#" className="text-gray-300 hover:text-white">{name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        © 2025 CareerBoost AI. All rights reserved. Powered by Google Gemini AI.
      </div>
    </footer>
  );
}
