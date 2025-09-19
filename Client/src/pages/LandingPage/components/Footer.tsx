import React from "react";

import { FaBrain, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { Link } from "react-router-dom";

interface Sections {

  [key: string]: { name: string; path: string }[];
}

const Footer: React.FC = () => {

  const sections: Sections = {

    Product: [

      { name: "Features", path: "/features" },

      { name: "Pricing", path: "/pricing" },

      { name: "How It Works", path: "/how-it-works" },

      { name: "API Docs", path: "/api-docs" }

    ],

    Company: [

      { name: "About", path: "/about" },

      { name: "Blog", path: "/blog" },

      { name: "Careers", path: "/careers" },

      { name: "Contact", path: "/contact" }
    ],

    Support: [

      { name: "Help Center", path: "/help" },

      { name: "Privacy Policy", path: "/privacy" },

      { name: "Terms of Service", path: "/terms" },

      { name: "Status", path: "/status" }
    ],
  };

  return (

    <footer className="bg-gray-900 text-white">

      <div className="container mx-auto px-4 py-16 grid gap-8 lg:grid-cols-5">

        {/* Brand */}

        <div className="lg:col-span-2">

          <div className="flex items-center gap-2 mb-4">

            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">

              <FaBrain className="w-6 h-6 text-white" />

            </div>

            <span className="text-xl font-bold">CareerBoost AI</span>

          </div>

          <p className="text-gray-300 mb-6">

            Empowering careers with AI tools for resume optimization, job
            matching & interviews.

          </p>

          <div className="flex gap-4">

            {
              [FaTwitter, FaLinkedin, FaEnvelope].map((Icon, item) => (

                <Link

                  key={item}

                  to="/"

                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                >

                  <Icon className="w-5 h-5 text-white" />

                </Link>

              ))
            }

          </div>

        </div>

        {/* Links */}

        {
          Object.entries(sections).map(([title, items]) => (

            <div key={title}>

              <h3 className="font-semibold mb-4">{title}</h3>

              <ul className="space-y-2">

                {
                  items.map(({ name, path }) => (

                    <li key={name}>

                      <Link to={path} className="text-gray-300 hover:text-white">

                        {name}

                      </Link>

                    </li>

                  ))
                }

              </ul>

            </div>

          ))
        }

      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">

        © 2025 CareerBoost AI. All rights reserved. Powered by Google Gemini AI.

      </div>

    </footer>
  );
};

export default Footer;