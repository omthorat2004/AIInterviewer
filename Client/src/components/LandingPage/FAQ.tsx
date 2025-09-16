import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI resume optimization work?",
      answer: "Our Gemini-powered AI analyzes your resume against industry best practices and job requirements. It identifies weak points, suggests improvements, and optimizes keyword usage to increase ATS compatibility and recruiter appeal."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use enterprise-grade encryption and never share your personal information with third parties. Your data is stored securely and you maintain full control over your information at all times."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties or fees. You'll continue to have access to your plan features until the end of your current billing period."
    },
    {
      question: "How accurate is the job matching feature?",
      answer: "Our AI job matching has a 94% relevancy rate based on user feedback. It considers your skills, experience, career goals, salary expectations, and location preferences to find the most suitable opportunities."
    },
    {
      question: "Do you offer support for career changers?",
      answer: "Yes! Our Premium plan includes specialized career transition planning, skill gap analysis, and 1-on-1 coaching to help you successfully pivot to a new industry or role."
    },
    {
      question: "How often are job opportunities updated?",
      answer: "We refresh our job database every hour, pulling from thousands of sources including company career pages, job boards, and our partner network to ensure you see the latest opportunities."
    },
    {
      question: "What makes your AI different from other tools?",
      answer: "We use Google's latest Gemini AI model, which provides more nuanced understanding of career contexts, industry trends, and personalized recommendations compared to generic AI tools."
    },
    {
      question: "Is there a mobile app?",
      answer: "Currently, we offer a fully responsive web application that works seamlessly on all devices. A dedicated mobile app is in development and will be available soon."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about our AI-powered career tools.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4 transition-colors duration-200">
            Contact our support team
          </button>
        </div>
      </div>
    </section>
  );
};